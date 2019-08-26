export const userLogin = data => ({
  type: 'LOGIN',
  payload: data,
})

export const userLogout = data => ({
  type: 'LOGOUT',
  payload: null,
})