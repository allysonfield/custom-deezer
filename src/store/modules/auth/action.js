export function setTrack(payload) {
  return {
    type: '@auth/SET_TRACK',
    payload,
  };
}

export function setTracks(payload) {
  console.log('tracks', payload.tracks);
  return {
    type: '@auth/SET_TRACKS',
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
