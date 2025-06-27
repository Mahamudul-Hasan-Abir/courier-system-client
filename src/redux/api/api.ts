import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://courier-system-server.vercel.app/api/v1`,
    credentials: "include",
  }),

  endpoints: () => ({}), // Return an empty object here
});
