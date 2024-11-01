import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPanel from "./admin-panel";
import MainPage from "./main-page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route
          path="/admin-panel"
          element={<AdminPanel />}
        />
      </Routes>
    </BrowserRouter>
  );
}
