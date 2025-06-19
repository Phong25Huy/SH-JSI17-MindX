const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const app = express();
const cors = require('cors');
const serviceAccount = require('./tiki-project-database-firebase-adminsdk-fbsvc-1f248d9517.json')
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: serviceAccount.project_id // thêm nếu cần
});

app.use(bodyParser.json());

app.post('/update-user', async (req, res) => {
    const { uid, newEmail } = req.body;
    try {
        await admin.auth().updateUser(uid, { email: newEmail });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
