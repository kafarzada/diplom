export const createReport = (data) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let orderRef = firestore.collection("orders").where("paided", "==", "Оплачено")
    let result;

    if (data.start_date) {
      result = orderRef.where("order_date", ">", data.start_date).get();
    }

    

    if (data.end_date) {
      result = orderRef
        .where("order_date", ">", data.start_date)
        .where("order_date", "<", data.end_date)
        .get();
    }

    if (data.service) {

        if(data.service === "Все") {
            result = orderRef
            .where("order_date", ">", data.start_date)
            .where("order_date", "<", data.end_date)
            .get();
        } else {
            result = orderRef
            .where("order_date", ">", data.start_date)
            .where("order_date", "<", data.end_date)
            .where('type', "==", data.service)
            .get();
        }

    }

    result
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        console.log(arr);
        dispatch({ type: "CREATE_REPORT_SUCCESS", arr });
      })
      .catch((err) => dispatch({ type: "CREATE_REPORT_ERROR", err }));
    console.log(data);
  };
};
