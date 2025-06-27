import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5300/api/v1`,
    credentials: "include",
  }),

  endpoints: () => ({}), // Return an empty object here
});
