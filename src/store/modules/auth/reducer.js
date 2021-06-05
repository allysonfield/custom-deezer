import produce from 'immer';

const INITIAL_STATE = {
  nome: null,
  token: null,
  usuarioId: null,
  signed: null,
  track: {},
  tracks: [],
  albums: [],
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SET_TRACK': {
        draft.track = action.payload.data;
        break;
      }
      case '@auth/SET_TRACKS': {
        draft.tracks = action.payload.tracks;
        break;
      }
      case '@auth/SET_ALBUMS': {
        draft.albums = action.payload.albums;
        break;
      }

      case '@auth/SET_DATA_REQUEST': {
        break;
      }
      default:
        return state;
    }
  });
}
