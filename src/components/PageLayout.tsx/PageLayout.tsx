import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import { useEffect } from "react";

const PageLayout = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  useEffect(() => {
    console.log(path);
    if (path !== "/main") {
      navigate("/main");
    }
  }, [path]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export { PageLayout };
