import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

export const personApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getPersonTodos: builder.query<any, number>({ query: (id) => ({ url: `/todos/${id}`, method: "get" }) }),
  }),
});

export const useGetPersonTodosQuery = personApi.endpoints.getPersonTodos.useQuery;
