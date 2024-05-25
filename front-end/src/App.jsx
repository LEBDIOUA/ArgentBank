import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";
import SignUpPage from "./pages/SignUpPage";
import { PersistGate } from 'redux-persist/integration/react';
import { myStore, persistor } from './redux/myStore';
import { Provider } from "react-redux";

function App() {

  return (
    <Provider store={myStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Header signIn="on" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/profile" element={<UserPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
export default App;