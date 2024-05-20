import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";
import SignUpPage from "./pages/SignUpPage";

function App() {

  return (
    <BrowserRouter>
      <Header signIn="on" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signIn" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;