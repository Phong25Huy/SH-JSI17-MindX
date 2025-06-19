const firebaseConfig = {
            apiKey: "AIzaSyBTgc5bDWDSZgvKQYceJyVMv4qNVsbwqBQ",
            authDomain: "tiki-project-database.firebaseapp.com",
            projectId: "tiki-project-database",
            storageBucket: "tiki-project-database.firebasestorage.app",
            messagingSenderId: "74244344171",
            appId: "1:74244344171:web:7a5bb3b07293ad5dcb642e",
            measurementId: "G-WHYHB4GYYX"
};

        // Initialize Firebase

firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
const auth = firebase.auth();


document.getElementById("form-signin").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
        const user = userCredential.user;

        // Sau khi đăng nhập thành công =>  kiểm tra role
        db.collection("account-list")
            .where("email", "==", email)
            .get()
            .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                const role = userData.role;

                // Phân hướng
                if (role == "admin") {
                window.location.href = "http://127.0.0.1:5500/JSI_MindX/SH-JSI17-MindX/admin.html";
                } else if (role == "user") {
                window.location.href = "http://127.0.0.1:5500/JSI_MindX/SH-JSI17-MindX/index.html";
                } else {
                alert("Lỗi vai trò");
                }
            } else {
                alert("Tài khoản này chưa được đăng kí");
            }
            });
        })
        .catch((error) => {
        console.error("Lỗi đăng nhập:", error.message);
        alert("Email hoặc mật khẩu không đúng!");
        });
});


