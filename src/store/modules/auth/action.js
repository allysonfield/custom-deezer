

export function loginRequest(payload) {
  return {
    type: '@auth/LOGIN_REQUEST',
    payload,
  };
}
