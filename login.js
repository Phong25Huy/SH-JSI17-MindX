var userList = [
  {
    email: "admin@gmail.com",
    password: "admin",
  },
  {
    email: "admin2@gmail.com",
    password: "admin",
  },
];

document.getElementById("form-login").addEventListener("submit", function (e) {
  e.preventDefault();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // validate email
  if(email === "") {
    document.getElementById("email").classList.add("is-invalid")
    document.getElementById("email-feedback").innerHTML = "Email khong duoc de trong"
  } else {
    document.getElementById("email").classList.remove("is-invalid")
    document.getElementById("email-feedback").innerHTML = ""
  }

  // validate password
  if(password === "") {
    document.getElementById("password").classList.add("is-invalid")
    document.getElementById("password-feedback").innerHTML = "Password khong duoc de trong"
  } else {
    document.getElementById("password").classList.remove("is-invalid")
    document.getElementById("password-feedback").innerHTML = ""
  }

  var userSignIn= userList.find(function(user) {
    return user.email === email
  }) 

  if(userSignIn) {
    console.log(userSignIn)
    if(userSignIn.password === password) {
      console.log("dang nhap thanh cong")
      // chyuyen user ve trang home
      window.location.href = "index.html"
    } else {
      console.log("sai thong tin mat khau")
    }
  } else {
    console.log("sai thong tin email")
  }
});
