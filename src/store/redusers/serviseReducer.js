const initialState = {
  services: [],
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SUBSERVICE_SUCCESS":
      return {
        ...state,
        services: [...action.arr],
      };
    case "GET_SUBSERVICE_ERR":
        console.log(action.err);
      return state;
    default:
      return state;
  }
  return state
};

export default serviceReducer;
