import React, { useEffect } from 'react';
import { useState, useCallback } from 'react';
import SignUpForm from 'modules/auth/components/SignupForm/SignupForm';
import logo from 'assets/images/logo-pg.png';
import { ISignUpParams } from 'models/auth';
import { handleSignUpLocationsAPI, handleRegisterAPI } from 'server/userServer';
import './SignUpPage.css';
import { RESPONSE_STATUS_SUCCESS } from 'utils/httpResponseCode';
// import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'configs/routes';
import { getErrorMessageResponse } from 'utils';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'redux';
import { setUserInfo } from 'modules/auth/redux/authReducer';
import Cookies from 'js-cookie';
import { replace } from 'connected-react-router';
import { ACCESS_TOKEN_KEY } from 'utils/constants';

function SigUpPage() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [isLoading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  // const navigate = useNavigate();

  const getLocation = useCallback(async () => {
    setLoading(true);
    const res = await handleSignUpLocationsAPI();
    setLoading(false);

    if (res?.code === RESPONSE_STATUS_SUCCESS) {
      setLocations(res?.data);
      return;
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const onSignUp = async (values: ISignUpParams) => {
    setErrorMessage('');
    setLoading(true);

    const json = await handleRegisterAPI(values);

    setLoading(false);

    if (json.code === RESPONSE_STATUS_SUCCESS) {
      alert('Chúc mừng bạn đã đăng ký thành công!');
      dispatch(setUserInfo(json.data));
      Cookies.set(ACCESS_TOKEN_KEY, json.data.token);
      dispatch(replace(ROUTES.login));
      // navigate(ROUTES.login);
      return;
    }

    if (json?.error) {
      setErrorMessage(getErrorMessageResponse(json));
    }
  };

  return (
    <div className="container form-login">
      <img src={logo} alt="" />
      <SignUpForm onSignUp={onSignUp} isLoading={isLoading} errorMessage={errorMessage} locations={locations} />
    </div>
  );
}

export default SigUpPage;
