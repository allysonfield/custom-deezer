import { all, takeLatest, call, put, select } from 'redux-saga/effects';


import api from '~/services/api';


export function* login({ payload }) {
  try {
    const { email, senha, principal, cadastro, falha } = payload;

    // login da conta
    const response = yield call(() =>
      api.post('conta/login', {
        email,
        password: senha,
        rememberMe: true,
      })
    );
    const { data, success } = response.data;

    consoleAux({ data, success });
    if (success === true) {
      // const {decode} = destrinchaToken({token: data.token});
      if (data.status === 1) {
        yield criaDevice(data.usuarioId);

        yield put(
          loginSucesso({ token: data.token, usuarioId: data.usuarioId })
        );
        principal.call();
      } else if (data.status === 3) {
        yield put(
          loginSucessoPendente({ token: data.token, usuarioId: data.usuarioId })
        );
        cadastro.call();
      } else {
        // showAlert(translate('falhaLogintext'));

        falha.call();
      }
    } else {
      // showAlert(translate('falhaLogintext'));

      falha.call();
    }
  } catch (error) {
    consoleAux({ error });
    showAlert(errorControl(error));
  }
}





export default all([
  takeLatest('@auth/LOGIN_REQUEST', login),
]);
