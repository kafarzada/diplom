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
      .get()
      .then((data) => {
            let { totalPrice, order_date, clientId } = data.data();
            const carsCount = data.data().cars.length > 3 ? 3 : data.data().cars.length;
            const sum = 10000;
            const t = totalPrice > sum ? sum : totalPrice;
            console.log(Rating([t / sum, carsCount / 3, getKoff(order_date)]));

      })
      .catch((err) => console.log(err));

    firestore
      .collection("orders")
      .doc(orderId)
      .update({
        status: "Выполнено",
        date_closed: new Date(),
      })
      .then((data) => {

        firestore
          .collection("orders")
          .doc(orderId)
          .get()
          .then((data) => {
            let { totalPrice, order_date, client } = data.data();
            const carsCount = data.data().cars.length > 3 ? 3 : data.data().cars.length;
            const sum = 10000;
            const t = totalPrice > sum ? sum : totalPrice;
            console.log(Rating([t / sum, carsCount / 3, getKoff(order_date)]));

            console.log(data.data());
            firestore.collection('client').doc(client).update({
              "bonus": firestore.FieldValue.increment( Math.round( Rating([t / sum, carsCount / 3, getKoff(order_date)])))
            })

            const employees = data.data().employees;
            employees.forEach((employee) => {
              firestore
                .collection("employees")
                .doc(employee.id)
                .update({
                  orderCount: firestore.FieldValue.increment(1),
                  status: false,
                });
            });
          })
          .catch((err) => console.log(err));

      })
      .catch((err) => console.log(err));
  };
};

export const changeIsNewOrder = () => {
  return (dispatch, getState, { getFirestore }) => {
    getFirestore().collection('setting').doc("FOJgu4rX7NgMXo0cJpTt").update({
      newOrder: false
    })
  }
}

const matricarating = [
  [0, 0, 0, 0],
  [0, 0, 1, 1],
  [0, 0, 2, 1],
  [0, 1, 0, 0],
  [0, 1, 1, 1],
  [0, 1, 2, 1],
  [0, 2, 0, 1],
  [0, 2, 1, 1],
  [0, 2, 2, 2], // 0 низкие

  [1, 0, 0, 0],
  [1, 0, 1, 0],
  [1, 0, 2, 1],
  [1, 1, 0, 1],
  [1, 1, 1, 2],
  [1, 1, 2, 2],
  [1, 2, 0, 1],
  [1, 2, 2, 2],
  [1, 2, 2, 2], // 1 - средние

  [2, 0, 0, 1],
  [2, 0, 1, 2],
  [2, 0, 2, 2],
  [2, 1, 0, 1],
  [2, 1, 1, 2],
  [2, 1, 2, 2],
  [2, 2, 0, 2],
  [2, 2, 1, 2],
  [2, 2, 2, 2],
];

const diapozonrat = [
  [0, 0.3, 0.2, 0.7, 0.6, 1],
  [0, 0.3, 0.2, 0.7, 0.6, 1],
  [0, 0.3, 0.2, 0.7, 0.6, 1],
];

function niz(znachenie, a, b) {
  let otvet = 0;
  if (znachenie <= a) otvet = 1;
  if (znachenie >= b) otvet = 0;

  if (znachenie >= a && znachenie <= b)
    otvet = Math.round((b - znachenie) / (b - a), 4);

  return otvet;
}

function sred(znachenie, a, c) {
  let otvet = 0;
  let b;
  b = (c + a) / 2;

  if (znachenie <= a) otvet = 0;
  if (znachenie >= c) otvet = 0;
  if (znachenie >= a && znachenie <= b) otvet = (znachenie - a) / (b - a);
  if (znachenie >= b && znachenie <= c) otvet = (c - znachenie) / (c - b);

  return otvet;
}

function visokiy(znachenie, a, b) {
  let otvet = 0;
  if (znachenie <= a) otvet = 0;
  if (znachenie >= b) otvet = 1;
  if (znachenie >= a && znachenie <= b) otvet = (znachenie - a) / (b - a);

  return otvet;
}

function BazaZnaniyRating(nomerkriteri, masiv) {
  let znacheniefun;
  let znacheniefuniterma = [];

  for (let i = 0; i < 27; i++) {
    switch (matricarating[i][nomerkriteri]) {
      case 0:
        znacheniefun = niz(masiv[0], masiv[1], masiv[2]);
        znacheniefuniterma.push(znacheniefun);
        break;
      case 1:
        znacheniefun = sred(masiv[0], masiv[3], masiv[4]);
        znacheniefuniterma.push(znacheniefun);
        break;
      case 2:
        znacheniefun = visokiy(masiv[0], masiv[5], masiv[6]);
        znacheniefuniterma.push(znacheniefun);
        break;
    }
  }
  return znacheniefuniterma;
}

function Rating(znach) {
  let masivnach = new Array(3);
  let masivsugeno = new Array(27);
  let matricaznachprinad = new Array(27);
  for (let i = 0; i < 3; i++) {
    masivnach[i] = new Array(7);
  }

  for (let i = 0; i < 27; i++) {
    matricaznachprinad[i] = new Array(4);
  }

  let otvet;

  for (let i = 0; i < 3; i++) {
    masivnach[i][0] = znach[i];
    for (let j = 1; j < 7; j++) {
      masivnach[i][j] = diapozonrat[i][j - 1];
    }
  }

  for (let i = 0; i < 3; i++) {
    let masiv = new Array(7);

    for (let k = 0; k < 7; k++) {
      masiv[k] = masivnach[i][k];
    }
    for (let j = 0; j < 27; j++) {
      matricaznachprinad[j][i] = BazaZnaniyRating(i, masiv)[j];
    }
  }

  for (let i = 0; i < 27; i++) {
    matricaznachprinad[i][3] = Math.min(
      Math.min(matricaznachprinad[i][0], matricaznachprinad[i][1]),
      matricaznachprinad[i][2]
    );
    masivsugeno[i] =
      50 * masivnach[0][0] + 30 * masivnach[1][0] + 20 * masivnach[2][0];
  }

  let summinznachmatricaznachprinad = 0;
  let masivchislit = new Array(27);

  for (let i = 0; i < 27; i++) {
    masivchislit[i] = matricaznachprinad[i][3] * masivsugeno[i];
    summinznachmatricaznachprinad += matricaznachprinad[i][3];
  }

  otvet =
    masivchislit.reduce((sum, curr) => sum + curr, 0) /
    summinznachmatricaznachprinad;

  return otvet;
}

function getKoff(data) {
  let seasоns = ["Зима", "Весна", "Лето", "Осень"];
  switch (seasоns[Math.floor((new Date(data).getMonth() + 1) / 3)]) {
    case "Лето":
      return 1 / 3;
      break;
    case "Осень":
      return 2 / 3;
      break;
    case "Весна":
      return 2 / 3;
      break;
    case "Зима":
      return 3 / 3;
      break;
  }
}
