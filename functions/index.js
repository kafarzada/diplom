const functions = require("firebase-functions");
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


const createNotification = (notification => {
    return admin.firestore()
            .collection('notifications')
            .add(notification)
            .then(doc => {
                console.log('notification added', doc)
            })
})

exports.createdCar = functions.firestore
        .document('cars/{carId}')
        .onCreate(doc => {

        const car = doc.data();

        
        const notification = {
            content: "Добавил(а) Транспорт",
            user: `${car.userID}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification)
})

exports.userJoined = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('client')
        .doc(user.uid)
        .get()
        .then(doc => {
            const newUser = doc.data()
            const notification = {
                content: "Новый Пользователь",
                user: `${newUser.firstname} ${newUser.lastname}`,
                time: admin.firestore.FieldValue.serverTimestamp()
            }

            return createNotification(notification)
        })
})