import React from 'react';
import { useState } from 'react';
import LoginForm from 'modules/auth/components/LoginForm/LoginForm';
import logo from 'assets/images/logo-pg.png';
import { ILoginParams } from 'models/auth';
import { handleLoginAPI } from 'server/userServer';
import './LoginPage.css';
import { RESPONSE_STATUS_SUCCESS } from 'utils/httpResponseCode';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'modules/auth/redux/authReducer';
import { ACCESS_TOKEN_KEY } from 'utils/constants';
import Cookies from 'js-cookie';
import { replace } from 'connected-react-router';
import { ROUTES } from 'configs/routes';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'redux';

function LoginPage() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const navigate = useNavigate();

  const onLogin = async (values: ILoginParams) => {
    setErrorMessage('');
    setLoading(true);
    const json = await handleLoginAPI(values.email, values.password);
    console.log(json);
    setLoading(false);

    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      dispatch(setUserInfo(json.data));
      Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined });
      dispatch(replace(ROUTES.home));
    }

    if (json?.error) {
      setErrorMessage(json.message);
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />
      <LoginForm onLogin={onLogin} isLoading={isLoading} errorMessage={errorMessage} />
      <div>
        <label style={{ marginRight: '10px' }}>Bạn chưa có tài khoản? </label>
        <a href={ROUTES.signUp}>
          <FormattedMessage id="register" />
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
