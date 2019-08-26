const login = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedInUser: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        loggedInUser: null,
      }
    default:
      return state
  }
}
  
  export default login