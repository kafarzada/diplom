export const removeOrder = (orderId) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("orders")
      .doc(orderId)
      .delete()
      .then((data) => {
        dispatch({ type: "REMOVE_ORDER_SUCCESS", data });
      })
      .catch((err) => {
        dispatch({ type: "REMOVE_ORDER_ERR", err });
      });
  };
};

export const changeStatus = (status, id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("orders")
      .doc(id)
      .update({
        status: status,
      })
      .then(() => {
        dispatch({ type: "CHANGE_STATUS_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "CHANGE_STATUS_ERR", err });
      });
  };
};

export const chooseEmployee = (OrderId, employeeId) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const employees = [];

    employeeId.forEach((employee) => {
      firestore
        .collection("employees")
        .doc(employee)
        .get()
        .then((e) => {
          firestore.collection("employees").doc(e.id).update({
            status: true,
          });

          const firstname = e.data().firstname,
            lastname = e.data().lastname;
          employees.push({ id: e.id, firstname, lastname });
          firestore.collection("orders").doc(OrderId).update({
            employees,
          });
        })
        .catch();
    });
  };
};

export const closeOrder = (orderId) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("orders")
      .doc(orderId)
      .update({
        status: "Выполнено",
        date_closed: new Date()
      })
      .then((data) => {
        firestore
          .collection("orders")
          .doc(orderId)
          .get()
          .then((data) => {
                const employees = data.data().employees
                employees.forEach(employee => {
                    firestore.collection('employees').doc(employee.id).update({
                        orderCount: firestore.FieldValue.increment(1),
                        status: false
                    })
                })
          })
          .catch(err => console.log(err))
      })
      .catch((err) => console.log(err));
  };
};
