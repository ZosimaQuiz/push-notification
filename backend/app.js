const express = require('express');
const path = require('path'); 
const webpush = require('web-push');

const vapidKeys = {
  publicKey: 'BGHzCeWBc0iGPpbr4wQ4gBGG52m6Ji7_dUmAp3D_oLoChQ-bjAvEiPOmOD2DWRSxnuqRP9RQbgoqyncirZhq95s',
  privateKey: 'uvSk5nqTYgrwrFFNlgj2AxgZEk1fHU8t-P0TeDdT2HA'
};

webpush.setVapidDetails(
  'mailto:angryfool777@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const app = express();

app.use('/static', express.static(path.join(__dirname, '../frontend/static/')));
app.use('/', express.static(path.join(__dirname, '../frontend/static/')));


app.get('/', (request, response) => {
    console.log(request.query);
    response.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/send', (request, response) => {
  webpush.sendNotification({"endpoint":"https://fcm.googleapis.com/fcm/send/ezwfnN9Uypo:APA91bGz7qM9QuOSKoBldedXnH_60vth_3Gyz_HKedB430gsKOxjynbI738nurDqKoCTkJb_4E1qu--IQgrL0fQN6TqNUEd66CwOSNoS8TlP3-snvEDP0D55t9CI5EX4Pj3ep2NKmIWn","expirationTime":null,"keys":{"p256dh":"BPBQvxH3wv6Brbygp2rtIBs4N_gsD0PBdavYgqFGECoX8zgKpjLo3osbGmh8-9KeX66CCcFAt0IcCdKvJ1Kb2P0","auth":"AAuhtv929IZWRIlBFPYxRg"}}, 'Your Push Payload Text').then((result) => {
    console.log(result);
    response.send(result);
  }).catch((error) => {
    console.log(error);
    response.send(error);
  });
});

app.listen(4040, () => {
    console.log('Server started.');
});