const initialState = {
  orders: [],
  summ: 0
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_REPORT_SUCCESS":
      return {
        ...state,
        orders: [...action.arr]
      };
    case "CREATE_REPORT_ERROR":
      console.log(action.err);
      return state;

    default:
      return state;
  }
  return state;
};

export default reportReducer;
