import { Button, TextField } from "@mui/material";
import { FC, useState } from "react";
import Styles from "./Style.module.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { onChangeSearch } from "../../store/slices/forkSlice";

const Header: FC = () => {
  const store = useAppSelector((store) => store.forkSlice);
  const [searchState, setSearchState] = useState(store.search ?? "");
  const dispatch = useAppDispatch();

  return (
    <div className={Styles.header}>
      <TextField
        placeholder="Введите поисковый запрос"
        onChange={(e) => setSearchState(e.target.value)}
        value={searchState}
        className={Styles.header_input}
      />
      <Button
        variant="contained"
        onClick={() => {
          dispatch(onChangeSearch(searchState));
        }}
      >
        Искать
      </Button>
    </div>
  );
};

export { Header };
