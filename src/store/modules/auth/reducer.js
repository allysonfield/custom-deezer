const INITIAL_STATE = {
  nome: null,
  token: null,
  usuarioId: null,
  signed: null,
  track: {},
  tracks: [],
  albums: [],
  played: false,
};

export default function auth(state = INITIAL_STATE, action) {
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
    case '@auth/SET_PALYED':
      return {
        ...state,
        played: action.payload,
      };
    default:
      return state;
  }
}
