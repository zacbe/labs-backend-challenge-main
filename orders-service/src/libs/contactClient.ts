import fetch from 'node-fetch';

const getContacts = async (id: string): Promise<User | null> => {
  const host = process.env.CONTACTS_SERVICE_HOST || 'localhost';
  const port = process.env.CONTACTS_SERVICE_PORT || '8080';
  const path = `api/v1/person/${id}`;
  const baseUrl = `http://${host}:${port}`;

  try {
    const response = await fetch(`${baseUrl}/${path}`);
    const status = response.status;
    console.log(`Status code: ${status}`);

    if (!response.ok) {
      const errorResponse: any = await response.json();
      const message = errorResponse.message || 'Error fetching contacts';
      console.error(message);
      return null;
    }
    const data = await response.json();
    return data as User;
  } catch (e: any) {
    throw new Error(e);
  }
};

export { getContacts };
