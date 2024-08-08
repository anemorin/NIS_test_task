import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainPage } from "./pages/MainPage/MainPage.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PageLayout } from "./components/PageLayout.tsx/PageLayout.tsx";
import { Page404 } from "./pages/Page404/Page404.tsx";
import { StoreProvider } from "./store/StoreProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route path="/main" element={<MainPage />} />
          </Route>
          <Route element={<Page404 />} path="/404" />
          <Route element={<Navigate to="/404" />} path="*" />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>
);
