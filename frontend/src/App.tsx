import { RecoilRoot } from "recoil";
import "./index.css";
import { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Layout from "./components/Layout";
import { Toaster } from "sonner";
import Editor from "./components/Editor";
const App = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <Toaster />
        <AuthApp />
      </Suspense>
    </RecoilRoot>
  );
};
const AuthApp = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme == "dark") document.documentElement.classList.add("dark");
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Landing />
            </Layout>
          }
        />
        <Route path="/editor" element={<Editor />} />
        <Route path="/signup" element={<Layout children={<SignUp />} />} />
        <Route path="/login" element={<Layout children={<Login />} />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
