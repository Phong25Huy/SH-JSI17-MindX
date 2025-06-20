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

// Initialize Cloud Storage and get a reference to the service

document.getElementById("form-signup").addEventListener("submit", function (e) {
  e.preventDefault();

  const phone = document.getElementById("tel").value.trim();
  const email = document.getElementById("email_signup").value.trim();
  const password = document.getElementById("password_signup").value.trim();

  // Kiểm tra đầu vào trước
  if (
    !phone || phone.length != 10 ||
    !email || !email.includes("@") ||
    !password || password.length < 8
  ) {
    alert("Vui lòng kiểm tra lại các trường nhập!");
    return;
  }

  // Kiểm tra trùng email và sđt
  db.collection("account-list").where("email", "==", email).get()
    .then((emailSnapshot) => {
      if (!emailSnapshot.empty) {
        alert("Email đã được sử dụng");
      }
      return db.collection("account-list").where("phone", "==", phone).get();
    })
    .then((phoneSnapshot) => {
      if (!phoneSnapshot.empty) {
        alert("SĐT đã được sử dụng");
      }

      // Tạo tài khoản trên Firebase Auth
      return firebase.auth().createUserWithEmailAndPassword(email, password);
    
    })
    .then((userCredential) => {
        const name = email.slice(0, 6);
        var role = "user"
        db.collection("account-list").doc(userCredential.user.uid).set({
            name: name,
            email: email,
            password: password,
            cart: [],
            uid: userCredential.user.uid,
            phone: phone,
            role: role,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    })
    .then(() => {
      alert("Đăng ký thành công!");
      window.location ="./signin.html"
    })
    .catch((error) => {
      
        console.error("Lỗi đăng ký:", error.message);
      
    });
});



