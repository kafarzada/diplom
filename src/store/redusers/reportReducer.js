const initialState = {
  orders: [],
  copyOrders: [],
  summ: 0
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_REPORT_SUCCESS":
      return {
        ...state,
        orders: [...action.arr],
        copyOrders: [...action.arr],
        summ: action.arr.reduce((acc, curr) => {
          return acc + curr.totalPrice
        }, 0)
      };
    case "CREATE_REPORT_ERROR":
      console.log(action.err);
      return state;
    
    case "EMPLOYEE_ORDER":
      return {
        ...state,
        orders: [...action.arr],
        summ: action.arr.reduce((acc, curr) => {
          return acc + curr.totalPrice
        }, 0)
      }

    default:
      return state;
  }
  return state;
};

export default reportReducer;
