import axios from 'axios';

const getContacts = async (id: string): Promise<User | null> => {
  const host = process.env.CONTACTS_SERVICE_HOST || 'localhost';
  const port = process.env.CONTACTS_SERVICE_PORT || '8080';
  const path = `api/v1/person/${id}`;
  const url = `http://${host}:${port}/${path}`;

  try {
    const response = await axios.get<User>(url);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export { getContacts };
