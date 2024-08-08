import { Button, TextField } from "@mui/material";
import { FC } from "react";
import Styles from "./Style.module.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { onChangeSearch } from "../../store/slices/forkSlice";

const Header: FC = () => {
  const store = useAppSelector((store) => store.forkSlice);
  const dispatch = useAppDispatch();
  return (
    <div className={Styles.header}>
      <TextField
        placeholder="Введите поисковый запрос"
        onChange={(e) => dispatch(onChangeSearch(e.target.value))}
        value={store.search}
        className={Styles.header_input}
      />
      <Button variant="contained">Искать</Button>
    </div>
  );
};

export { Header };
