import { AxiosRequestConfig } from 'axios';

import instance from '../utils/axiosRetry';

const getContacts = async (id: string): Promise<User | null> => {
  const host = process.env.CONTACTS_SERVICE_HOST;
  const path = `api/v1/person/${id}`;
  const url = `${host}/${path}`;

  try {
    const response = await instance.get<User>(url, { retryCount: 3 } as AxiosRequestConfig);
    return response.data;
  } catch (e: any) {
    console.error(`Error fetching contacts for user ${id}: ${e.message}`);
    throw e;
  }
};

export { getContacts };
