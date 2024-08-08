import { FC } from "react";
import Styles from "./Style.module.sass";

const EmptyPage: FC = () => {
  return (
    <div className={Styles.container}>Пожалуйста, введите поисковый запрос</div>
  );
};

export { EmptyPage };
