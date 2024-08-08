import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetForksQuery } from "../../services/forkService";
import {
  onChangeForks,
  onChangeFilter,
  getForkTableData,
  onChangeSortOptions,
} from "../../store/slices/forkSlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { EmptyPage } from "../EmptyPage/EmptyPage";
import Styles from "./Style.module.sass";
import { InfoSlider } from "../../components/InfoSlider/InfoSlider";
import { formatSortFields } from "../../utils";

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((store) => store.forkSlice);
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);
  const { data, isFetching } = useGetForksQuery(
    {
      search: store.search!,
      page: store.filter.page,
      pageSize: store.filter.pageSize,
      field: formatSortFields(store.sortOptions?.field),
      direction: store.sortOptions?.direction,
    },
    { skip: !store.search }
  );

  useEffect(() => {
    dispatch(onChangeForks(data ?? {}));
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Название",
      sortable: false,
      flex: 1,
    },
    {
      field: "language",
      headerName: "Язык",
      sortable: false,
      flex: 1,
    },
    { field: "forks_count", headerName: "Число форков", flex: 1 },
    { field: "stargazers_count", headerName: "Число звезд", flex: 1 },
    { field: "updated_at", headerName: "Дата обновления", flex: 1 },
  ];

  return (
    <div className={Styles.page}>
      {!store.search?.length ? (
        <EmptyPage />
      ) : (
        <div className={Styles.column}>
          <div className={Styles.title}>Результаты поиска</div>
          <DataGrid
            rows={getForkTableData({ forkSlice: store })}
            columns={columns}
            paginationMode="server"
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: store.filter.pageSize,
                  page: store.filter.page - 1,
                },
              },
            }}
            onPaginationModelChange={(pagination) => {
              dispatch(onChangeFilter(pagination));
            }}
            autosizeOptions={{
              columns: ["name", "language", "updated_at"],
              includeOutliers: true,
              includeHeaders: false,
            }}
            rowCount={store.filter.totalCount}
            pagination
            disableColumnFilter
            className={Styles.table}
            loading={isFetching}
            pageSizeOptions={[10, 25, 50]}
            disableColumnMenu
            onRowSelectionModelChange={(selection) => {
              setSelectedRow(+selection[0]);
            }}
            sortingMode="server"
            onSortModelChange={(sortModel) => {
              if (!!sortModel.length) {
                dispatch(
                  onChangeSortOptions({
                    field: sortModel[0].field,
                    direction: sortModel[0].sort,
                  })
                );
              }
            }}
          />
        </div>
      )}
      <div className={!!selectedRow ? Styles.slider : Styles.slider_hidden}>
        {selectedRow && <InfoSlider id={selectedRow} />}
      </div>
    </div>
  );
};

export { MainPage };
