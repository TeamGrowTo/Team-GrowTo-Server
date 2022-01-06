const admin = require("firebase-admin");
const serviceAccount = require("./team---grow-to-firebase-adminsdk-f8xpx-13a56e2ed9");
const dotenv = require("dotenv");

dotenv.config();

let firebase;
if (admin.apps.length === 0) {
  firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  firebase = admin.app();
}

module.exports = {
  api: require("./api"),
};
