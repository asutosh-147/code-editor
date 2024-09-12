import { RecoilRoot } from "recoil";
import "./index.css";
import { Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Layout from "./components/Layout";
import { Toaster } from "sonner";
import Editor from "./components/Editor";
import LoadingBar,{LoadingBarRef} from "react-top-loading-bar";
import Fallback from "./components/Fallback";
const App = () => {
  const loadingRef = useRef<LoadingBarRef | null>(null);
  const handleLoadingStart = () => {
    loadingRef.current?.continuousStart();
  };
  const onLoadFinish = () => {
    loadingRef.current?.complete();
  }
  return (
    <RecoilRoot>
      <LoadingBar color="#BEFFF7" ref={loadingRef} waitingTime={300} />
      <Suspense fallback={<Fallback handleLoadingStart={handleLoadingStart} onLoadFinish={onLoadFinish} />}>
        <Toaster />
        <AuthApp/>
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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
