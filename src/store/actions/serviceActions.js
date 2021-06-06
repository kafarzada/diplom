export const changePrice = (id, price) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("services/rggQUehfahL1LFQGS17R/autowathServices")
      .doc(id)
      .update({ price })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
};

export const addService = (name, price) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("services/rggQUehfahL1LFQGS17R/autowathServices")
      .add({
        name,
        price,
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
};

export const removeService = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log(id);
    firestore
      .collection("services/rggQUehfahL1LFQGS17R/autowathServices")
      .doc(id)
      .delete()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
};

export const sortedService = () => {
  return (dispatch, getState, { getFirestore }) => {
    function sortByAge(arr) {
      arr.sort((a, b) => (a.price > b.price ? 1 : -1));
    }

    sortByAge(
      getState().firestore.ordered[
        "services/rggQUehfahL1LFQGS17R/autowathServices"
      ]
    );
  };
};

export const getSubservices = (name) => {
  return (dispatch, getState, { getFirestore }) => {
    let subServicPath =
      name == "Автостоянка"
        ? "/services/ulLN96MuM5VZoMp5fylD/parkingServices"
        : "/services/rggQUehfahL1LFQGS17R/autowathServices";

      if(name == "Все"){
        return dispatch({type: "GET_SUBSERVICE_SUCCESS", arr: []})
      } else {
        const firestore = getFirestore();
        firestore
          .collection(subServicPath)
          .get()
          .then((snapshots) => {
            let arr = []
            snapshots.forEach((doc) => {
              arr.push({id: doc.id, data: doc.data()})
            });
            dispatch({type: "GET_SUBSERVICE_SUCCESS", arr})
          })
          .catch((err) => dispatch({type: "GET_SUBSERVICE_ERR", err}));
      }
  };
};
