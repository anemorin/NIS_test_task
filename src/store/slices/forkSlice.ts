import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  IInitialStateType,
  IForkType,
  IResponse,
  IForkTableItem,
  ISortOptions,
} from "../../types/ForkTypes";
import { formatDate } from "../../utils";

const initialState: IInitialStateType = {
  search: "",
  filter: {
    pageSize: 10,
    page: 1,
  },
  forks: [],
};

export const forkSlice = createSlice({
  name: "forkSlice",
  initialState,
  selectors: {
    getForkTableData: (state): IForkTableItem[] => {
      return (
        state.forks?.map((fork) => ({
          id: fork.id,
          name: fork.name,
          language: fork.language,
          forks_count: fork.forks_count,
          stargazers_count: fork.stargazers_count,
          updated_at: formatDate(new Date(fork.updated_at)),
        })) ?? []
      );
    },
  },
  reducers: {
    onChangeForks: (state, action: PayloadAction<IResponse<IForkType>>) => {
      state.forks = action.payload.items;
      state.filter.totalCount = action.payload.total_count;
    },
    onChangeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    onChangeFilter: (
      state,
      action: PayloadAction<{ pageSize: number; page: number }>
    ) => {
      state.filter = {
        ...action.payload,
        page: action.payload.page + 1,
      };
    },
    onChangeSortOptions: (state, action: PayloadAction<ISortOptions>) => {
      state.sortOptions = action.payload;
    },
  },
});

export const {
  onChangeForks,
  onChangeSearch,
  onChangeFilter,
  onChangeSortOptions,
} = forkSlice.actions;
export const { getForkTableData } = forkSlice.selectors;
