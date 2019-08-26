const searchPlanet = (state = [], action) => {
  switch (action.type) {
    case 'SEARCH_PLANET':
      return {
        ...state,
        planets: action.payload,
      }
    default:
      return state
  }
}
  
export default searchPlanet