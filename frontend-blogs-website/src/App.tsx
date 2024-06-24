import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import { Provider } from "react-redux";
import store from "./store/store";
import FeedbackPage from "./pages/FeedbackPage/FeedbackPage";


function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Provider>
    </>
  )
}

export default App
