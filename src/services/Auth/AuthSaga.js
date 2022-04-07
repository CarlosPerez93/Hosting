import React from 'react';
import { put, takeLatest, all } from 'redux-saga/effects';
import { Token } from '../../common/Storage/Token';
import { auth } from './AuthActions';
import Api from '../../common/Api/Api';
import { push } from 'connected-react-router';
import { message } from 'antd';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const modalError = ({ message }) =>
  MySwal.fire({
    icon: 'error',
    title: <p>Tenemos un error</p>,
    heightAuto: 'false',
    didOpen: () => {
      MySwal.clickConfirm();
    }
  }).then(() => {
    return MySwal.fire(<p>{message}</p>);
  });

function* login({ payload: { data } }) {
  try {
    const response = yield Api.post('/login', data);
    console.log('asdasdadasasdasdas ' + response);
    if (response.ok) {
      yield Token.setToken('local', response.payload.Token);
      yield put(auth.loginResponse(response.payload.Token));
      message.success('¡Bienvenido!');
    } else {
      const err = new TypeError('ERROR_LOGIN');
      yield put(auth.loginResponse(err));
      modalError({ message: response.payload.message ? response.payload.message :'Revisa tus datos' });
    }
  } catch (error) {
    modalError({ message: 'Parece que tenemos problemas' });
    yield put(auth.loginResponse(error));
  }
}

function* logout() {
  localStorage.clear();
  yield put(push('/'));
}

function* ActionWatcher() {
  yield takeLatest(auth.login, login);
  yield takeLatest(auth.logout, logout);
}

export default function* rootSaga() {
  yield all([ActionWatcher()]);
}
