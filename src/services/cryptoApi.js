import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '23bca54e11msh398931b1805a883p102c57jsn513e0b606057'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({
    url, headers: cryptoHeaders,
})
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=> ({
        getCrypto: builder.query({
            query: () => createRequest('/coins')
        })
    })
})

export const {
    useGetCryptoQuery,
} = cryptoApi