// src/collections/Users.ts
import { CollectionConfig } from "payload";

const Users: CollectionConfig = {
  slug: "users",
  auth: true, // Enable authentication
  admin: {
    useAsTitle: "email",
  },
  fields: [
    // Add your fields here
    {
      name: "name",
      type: "text",
    },
  ],
};

export default Users;
