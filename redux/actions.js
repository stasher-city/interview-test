export const updateQuery = (query) => {
  return async (dispatch) => {
    dispatch({ type: 'UPDATE_QUERY', payload: query })
  }
}
