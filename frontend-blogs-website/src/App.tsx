import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/articles" element={<ArticlesPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  )
}

export default App
