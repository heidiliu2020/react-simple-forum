import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";

import { login, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext, LoadingContext } from "../../contexts";
import { MEDIA_QUERY } from "../../constants/theme";

const LoginWrapper = styled.div`
  padding: 200px 20px 300px 20px;

  ${MEDIA_QUERY} {
    padding: 200px 20px;
  }
`;

const LoginForm = styled.form`
  max-width: 450px;
  margin: 0 auto;
  padding: 30px 50px;
  box-shadow: 0px 2px 12px ${(props) => props.theme.colors.neutralGrey};
  border-radius: 6px;
  background: ${(props) => props.theme.colors.mainBackground};
  font-size: ${(props) => props.theme.fontSize.h5};

  p {
    font-size: ${(props) => props.theme.fontSize.h5};
    padding-bottom: 16px;
  }

  ${MEDIA_QUERY} {
    padding: 30px;
  }
`;

const LoginTitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.h2};
  font-weight: 700;
  margin-bottom: 28px;
  text-align: center;
`;

const LoginInput = styled.div`
  margin-bottom: 28px;

  & input {
    width: 100%;
    padding: 8px;
    font-size: ${(props) => props.theme.fontSize.h5};
    outline: transparent;
    border: 1px solid ${(props) => props.theme.colors.neutralPaleGrey};
    border-radius: 5px;
    letter-spacing: 1.5px;
    margin-top: 8px;
  }
`;

const LoginSubmit = styled.div`
  display: flex;
  justify-content: space-evenly;

  & button {
    background: ${(props) => props.theme.colors.neutralGrey};
    color: ${(props) => props.theme.colors.neutralSnow};
  }

  & button,
  a {
    border-radius: 20px;
    font-size: ${(props) => props.theme.fontSize.h5};
    padding: 6px 20px;
    border: 1px solid ${(props) => props.theme.colors.neutralGrey};
  }
`;

const LinkToRegister = styled(Link)`
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.colors.neutralSnow};
  color: ${(props) => props.theme.colors.neutralGrey};
`;

const ErrorMessage = styled.div`
  margin-bottom: 16px;
  color: ${(props) => props.theme.colors.uiNegative};
  font-weight: 700;
`;

const SubmitLoading = styled.div`
  font-weight: 700;
  color: ${(props) => props.theme.colors.neutralGrey};
  padding: 10px;
`;

export default function LoginPage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { setUser } = useContext(AuthContext);
  // 在 React 中 value 若是 undefined，等同於沒有傳 value
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  // 阻止送出表單
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    login({ username, password }).then((data) => {
      // 若 ok 為 0 代表錯誤
      if (data.ok === 0) {
        setIsLoading(false);
        return setErrorMessage(data.message);
      }
      // 成功的話就把 token 存到 localStorage
      setAuthToken(data.token);

      getMe().then((response) => {
        if (response.ok !== 1) {
          setIsLoading(false);
          // 在 getMe() 出錯代表還沒成功登入，因此要把 token 清空
          setAuthToken(null);
          setErrorMessage(response.toString());
        }
        setUser(response.data);
        // 並導回首頁
        history.push("/");
      });
    });
  };

  const handleInputFocus = () => {
    setErrorMessage(null);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <LoginTitle>登入</LoginTitle>
        <p>※ 此論壇僅供測試用，密碼均設為 React</p>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <LoginInput>
          username:
          <input
            value={username}
            onChange={handleUsernameChange}
            onFocus={handleInputFocus}
          />
        </LoginInput>
        <LoginInput>
          password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onFocus={handleInputFocus}
          />
        </LoginInput>
        <LoginSubmit>
          {isLoading ? (
            <SubmitLoading>資料驗證中...</SubmitLoading>
          ) : (
            <>
              <LinkToRegister to="/register">建立帳號</LinkToRegister>
              <button>登入</button>
            </>
          )}
        </LoginSubmit>
      </LoginForm>
    </LoginWrapper>
  );
}
