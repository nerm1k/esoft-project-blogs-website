import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import FeedbackPage from "./pages/FeedbackPage/FeedbackPage";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import Logout from "./components/Logout/Logout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CreateArticlePage from "./pages/CreateArticlePage/CreateArticlePage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { useEffect } from "react";
import RequiredAuth from "./components/RequiredAuth/RequiredAuth";


function App() {
  useEffect(() => {
    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
      document.body.dataset.theme = 'dark';
    } else {
      document.body.dataset.theme = 'light';
    }

  }, []);

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:articleId" element={<ArticlePage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/users/:username" element={<ProfilePage />} />
            <Route path="/users/:username/articles" element={<ProfilePage />} />
            <Route path="/users/:username/comments" element={<ProfilePage />} />
            <Route path="/settings" element={<RequiredAuth>
                                                <SettingsPage />
                                              </RequiredAuth>} />
            <Route path="/settings/profile" element={<RequiredAuth>
                                                        <SettingsPage />
                                                      </RequiredAuth>} />
            <Route path="/settings/account" element={<RequiredAuth>
                                                        <SettingsPage />
                                                      </RequiredAuth>} />
            <Route path="/articles/new" element={<RequiredAuth>
                                                    <CreateArticlePage />
                                                  </RequiredAuth>} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Provider>
    </>
  )
}

export default App
