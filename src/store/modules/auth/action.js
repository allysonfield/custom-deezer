export function setTrack(payload) {
  return {
    type: '@auth/SET_TRACK',
    payload,
  };
}

export function setTracks(payload) {
  return {
    type: '@auth/SET_TRACKS',
    payload,
  };
}

export function removeTracks(payload) {
  return {
    type: '@auth/REMOVE_TRACKS',
    payload,
  };
}

export function setAlbums(payload) {
  return {
    type: '@auth/SET_ALBUMS',
    payload,
  };
}

export function setDataRequest(payload) {
  return {
    type: '@auth/SET_DATA_REQUEST',
    payload,
  };
}

export function setPlayed(payload) {
  return {
    type: '@auth/SET_PALYED',
    payload,
  };
}
