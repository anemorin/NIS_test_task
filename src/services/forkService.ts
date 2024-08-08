import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils";
import { IRequestType, IForkType, IResponse } from "../types/ForkTypes";

export const forkService = createApi({
  reducerPath: "forkService",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getForks: builder.query<IResponse<IForkType>, IRequestType>({
      query: (body) => ({
        url: "/search/repositories",
        method: "get",
        params: {
          q: body.search,
          page: body.page,
          per_page: body.pageSize,
          sort: body.field,
          order: body.direction,
        },
      }),
    }),
  }),
});

export const { useGetForksQuery } = forkService;
