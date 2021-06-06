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
  console.log({ payload });
  return {
    type: '@auth/REMOVE_TRACKS',
    payload,
  };
}

export function setAlbums(payload) {
  console.log('albums', payload.albums);
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
