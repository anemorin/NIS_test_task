import { FC } from "react";
import Styles from "./Style.module.sass";
import { Link } from "react-router-dom";

const Page404: FC = () => {
  return (
    <div className={Styles.page404}>
      <div className={Styles.page404_title}>404</div>
      <div>Искомая страница не найдена</div>
      <Link to="/main">На главную</Link>
    </div>
  );
};

export { Page404 };
