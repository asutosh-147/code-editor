import { RecoilRoot } from "recoil";
import CodeIDE from "./components/CodeIDE";
import "./index.css";
import { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Layout from "./components/Layout";
import { Toaster } from "sonner";
import FileTree from "./components/FileTree";
import { useFileTree } from "./store/hooks/useFileTree";

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
  const { fileTreeData, insertNodeState, deleteNodeState, updateNodeState } =
    useFileTree();
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
        <Route path="/editor" element={<CodeIDE />} />
        <Route path="/signup" element={<Layout children={<SignUp />} />} />
        <Route path="/login" element={<Layout children={<Login />} />} />
        <Route
          path="/fileTree"
          element={
            <Layout
              children={
                <FileTree
                  data={fileTreeData}
                  insertNode={insertNodeState}
                  deleteNode={deleteNodeState}
                  updateNode={updateNodeState}
                />
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
