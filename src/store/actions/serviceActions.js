

export const changePrice = (id, price) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("services/rggQUehfahL1LFQGS17R/autowathServices")
      .doc(id)
      .update({ price })
      .then(data=> console.log(data))
      .catch(err => console.log(err))
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
        .then(data=> console.log(data))
        .catch(err => console.log(err))
    };
  };

export const removeService = (id) => {
    return (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
       console.log(id)
      firestore
        .collection("services/rggQUehfahL1LFQGS17R/autowathServices")
        .doc(id)
        .delete()
        .then(data=> console.log(data))
        .catch(err => console.log(err))
    };
  };

export const sortedService = () => {
    return (dispatch, getState, { getFirestore }) => {
        function sortByAge(arr) {
            arr.sort((a, b) => a.price > b.price ? 1 : -1);
          }   

        sortByAge(getState().firestore.ordered['services/rggQUehfahL1LFQGS17R/autowathServices'])
      };
}