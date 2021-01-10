import React, { useState, useEffect } from "react";
import { Reset } from "styled-reset";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { AuthContext, LoadingContext } from "../../contexts";
import { getMe } from "../../WebAPI";
import Header from "../Header";
import Footer from "../Footer";
import {
  getAuthToken,
  ScrollToTop,
  scrollToAnchor,
  ClickTop,
} from "../../utils";
import {
  EditPostPage,
  HomePage,
  LoginPage,
  NewPostPage,
  PostListPage,
  PostPage,
  RegisterPage,
} from "../../pages";

export default function App() {
  const [isLoadingGetMe, setLoadingGetMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // user 有東西就代表有登入
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 以 getAuthToken 從 localStorage 讀取 token
    if (getAuthToken()) {
      // 有 token 才 call API
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data);
          setLoadingGetMe(false);
        }
      });
    } else {
      setLoadingGetMe(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Reset />
      <LoadingContext.Provider
        value={{ isLoading, setIsLoading, isLoadingGetMe }}
      >
        {/* Router: 包在最外層 */}
        <Router>
          {/* 路徑改變自動到 TOP */}
          <ScrollToTop />
          <ClickTop onClick={() => scrollToAnchor("page-top")}></ClickTop>
          <Header />
          {/* Switch: 確保匹配第一個符合網址列的路由 */}
          <Switch>
            {/* exact path: 完整匹配 */}
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/post-list/">
              <PostListPage />
            </Route>
            <Route exact path="/post/:id">
              <PostPage />
            </Route>
            <Route exact path="/new-post">
              <NewPostPage />
            </Route>
            <Route exact path="/edit-post/:id">
              <EditPostPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </LoadingContext.Provider>
    </AuthContext.Provider>
  );
}
