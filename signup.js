
function initDatabase(){
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users ?.length === 0){
        localStorage.setItem("users",JSON.stringify([]));
    }
}
document.getElementById("form-signup").addEventListener("submit", function(e){
    e.preventDefault();
    initDatabase()
    var phone = document.getElementById("tel").value
    var email = document.getElementById("email_signup").value
    var password = document.getElementById("password_signup").value
    var cf_password = document.getElementById("cf_password").value
    var user = {
        phone,
        email,
        password,
    }
    
    const users = JSON.parse(localStorage.getItem("users"));

    var Exituseremail =  users.find((user) => user.email === email)
    var Exituserphone = users.find((user) => user.phone === phone)
    
    
    document.getElementById("pass-feedback_signup").innerHTML=""
    document.getElementById("cf_pass-feedback").innerHTML=""
    
    
    document.getElementById("password_signup").classList.remove("is-invalid")
    document.getElementById("cf_password").classList.remove("is-invalid")
    if (phone.length == 10 && email.length > 0 && password.length >= 8 && password == cf_password){
        if(Exituseremail && Exituserphone){
            document.getElementById("email_signup").classList.add("is-invalid")
            document.getElementById("email-feedback_signup").innerHTML="Email đã được đăng kí"
            document.getElementById("tel").classList.add("is-invalid")
            document.getElementById("tel-feedback").innerHTML="Số điện thoại đã được đăng kí"
        }
        else if (Exituseremail){
            document.getElementById("email_signup").classList.add("is-invalid")
            document.getElementById("email-feedback_signup").innerHTML="Email đã được đăng kí"
            document.getElementById("tel-feedback").innerHTML=""
            document.getElementById("tel").classList.remove("is-invalid")
        }
        else if (Exituserphone){
            document.getElementById("tel").classList.add("is-invalid")
            document.getElementById("tel-feedback").innerHTML="Số điện thoại đã được đăng kí"
            document.getElementById("email-feedback_signup").innerHTML=""
            document.getElementById("email_signup").classList.remove("is-invalid")  
        }
        else{
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            console.log(users)
            document.getElementById("email_signup").classList.remove("is-invalid")
            document.getElementById("email-feedback_signup").innerHTML=""
            document.getElementById("tel").classList.remove("is-invalid")
            document.getElementById("tel-feedback").innerHTML=""
            window.location.href = "signin.html"
        }
    }
    else{
        if (phone.length == 0 && email.length == 0 && password.length == 0){
            document.getElementById("tel").classList.add("is-invalid")
            document.getElementById("tel-feedback").innerHTML="Vui lòng điền số điện thoại"
            document.getElementById("email_signup").classList.add("is-invalid")
            document.getElementById("email-feedback_signup").innerHTML="Vui lòng điền email"
            document.getElementById("password_signup").classList.add("is-invalid")
            document.getElementById("pass-feedback_signup").innerHTML="Vui lòng điền password"
        }
        else if (phone.length == 0){
            document.getElementById("tel").classList.add("is-invalid")
            document.getElementById("tel-feedback").innerHTML="Vui lòng điền số điện thoại"
            document.getElementById("password_signup").classList.remove("is-invalid")
            document.getElementById("pass-feedpack_signup").innerHTML=""
            document.getElementById("email").classList.remove("is-invalid")
            document.getElementById("email-feedback_signup").innerHTML=""
        }
        else if (phone.length != 10){
            document.getElementById("tel").classList.add("is-invalid")
            document.getElementById("tel-feedback").innerHTML="Vui lòng điền đúng định dạng số điện thoại"
        }
        else if(email.length == 0){
            document.getElementById("email_signup").classList.add("is-invalid")
            document.getElementById("email-feedback_signup").innerHTML="Vui lòng điền Email"
            document.getElementById("password_signup").classList.remove("is-invalid")
            document.getElementById("pass-feedpack_signup").innerHTML=""
            document.getElementById("tel").classList.remove("is-invalid")
            document.getElementById("tel-feedback").innerHTML=""
        }
        else if(password.length == 0){
            document.getElementById("password_signup").classList.add("is-invalid")
            document.getElementById("pass-feedpack_signup").innerHTML="Vui lòng điền password"
            document.getElementById("tel").classList.remove("is-invalid")
            document.getElementById("tel-feedback").innerHTML=""
            document.getElementById("email").classList.remove("is-invalid")
            document.getElementById("email-feedback_signup").innerHTML=""
        }
        else if(password.length < 8){
            document.getElementById("password_signup").classList.add("is-invalid")
            document.getElementById("pass-feedback_signup").innerHTML="Password cần tối thiểu 8 kí tự"
        }
        if (cf_password != password){
            document.getElementById("cf_password").classList.add("is-invalid")
            document.getElementById("cf_pass-feedback").innerHTML="Password không trùng khớp"
        }
        if (cf_password == password){
            document.getElementById("cf_password").classList.remove("is-invalid")
            document.getElementById("cf_pass-feedback").innerHTML=""
        }
    }
    

    
})


