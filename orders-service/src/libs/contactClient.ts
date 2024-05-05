import axios from 'axios';

const getContacts = async (id: string): Promise<User | null> => {
  const host = process.env.CONTACTS_SERVICE_HOST;
  const path = `api/v1/person/${id}`;
  const url = `${host}/${path}`;

  try {
    const response = await axios.get<User>(url);
    return response.data;
  } catch (e: any) {
    console.error(`Error fetching contacts for user ${id}: ${e.message}`);
    throw e;
  }
};

export { getContacts };
