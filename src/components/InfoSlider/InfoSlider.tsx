import { FC } from "react";
import Styles from "./Style.module.sass";
import { useAppSelector } from "../../store/hooks";

const InfoSlider: FC<{ id: number }> = ({ id }) => {
  const fork =
    useAppSelector((store) => store.forkSlice).forks?.filter(
      (fork) => fork.id === id
    )[0] ?? undefined;
  return (
    <div className={Styles.container}>
      <div className={Styles.title}>{fork?.name}</div>
      <div>{fork?.description}</div>
      {fork?.license && <div>{fork.license.name}</div>}
    </div>
  );
};

export { InfoSlider };
