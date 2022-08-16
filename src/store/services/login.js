import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'






// Define a service using a base URL and expected endpoints
export const LoginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rico-card-service.herokuapp.com/api",
  }),
  endpoints: (builder) => ({
    getLogin: builder.query({
      query: (data) =>
        `/auth/login?usernameOrEmail=${data.email}&password=${data.password}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLoginQuery} = LoginAPI;