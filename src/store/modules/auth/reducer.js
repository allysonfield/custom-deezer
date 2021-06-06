// import produce from 'immer';

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
  // return produce(state, (draft) => {
  switch (action.type) {
    case '@auth/SET_TRACK':
      return {
        ...state,
        track: action.payload.data,
      };
    case '@auth/SET_TRACKS':
      return {
        ...state,
        tracks: [...state.tracks, action.payload],
      };
    case '@auth/REMOVE_TRACKS':
      return {
        ...state,
        tracks: action.payload,
      };
    // case '@auth/SET_ALBUMS': {
    //   draft.albums = action.payload.albums;
    //   break;
    // }

    // case '@auth/SET_DATA_REQUEST': {
    //   break;
    // }
    default:
      return state;
  }
  // });
}
