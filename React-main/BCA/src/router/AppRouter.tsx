import { Route, Routes } from "react-router-dom";
import Users from "../users/Users";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="*" element={<h1>404 Who AM I?</h1>} />
      </Routes>
    </>
  );
}
