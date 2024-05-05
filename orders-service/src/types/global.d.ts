declare global {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    streetAddress: string;
    houseNumber: string;
    zip: string;
    city: string;
    country: string;
    extensionFields: Record<string, unknown>;
  }

  interface Order {
    id: number;
    description: string;
    UserId?: string;
  }
}

export { };
