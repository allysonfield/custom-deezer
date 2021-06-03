import produce from 'immer';

const INITIAL_STATE = {
  nome: null,
  token: null,
  usuarioId: null,
  signed: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/LOGIN_REQUEST': {
        draft.loading = true;
        break;
      }
      default:
        return state;
    }
  });
}
