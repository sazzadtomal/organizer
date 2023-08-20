import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apikey="apikey=ff3c4395"

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
    endpoints: (builder) => ({
      getMovieByName: builder.query({
        query: (name) => `?s=${name}&${apikey}`,
      }),
    }),
  })

  export const { useGetMovieByNameQuery } = moviesApi