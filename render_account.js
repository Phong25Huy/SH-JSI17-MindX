

const generate_list_user = () => {
    db.collection("account-list").orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
        var container = document.getElementById("list_product_topdeal")
        var htmls = `
            <table>
                <thead>
                    <tr>
                        <th>Họ tên</th>
                        <th style ="width:33%;">Email</th>
                        <th>Liên hệ </th>
                        <th>Vai trò</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody id ="list_user">
                    
                <!-- Thêm người dùng khác tại đây -->
                </tbody>
            </table>
        `;
        container.innerHTML = htmls
        document.getElementById("categories_name").innerHTML = "Danh sách tài khoản"
        document.getElementById("accounts").classList.add("active")
        document.getElementById("products").classList.remove("active")
        // db.collection('account-list').get().then((querySnapshot) => {
            const user_list = [];
    
            var container = document.getElementById("list_user")

            var htmls = `<tr>
                    <td><input type="text" id="inp_name" placeholder="Nhập tên tài khoản"></td>
                    <td><input type="text"  id="inp_gmail" placeholder="Nhập gmail" >
                    <input type="text"  id="inp_password" placeholder="Nhập mật khẩu" style ="width:40%"></td>
                    
                    <td><input type="text" id ="inp_phone" placeholder="Nhập SĐT"></td>
                    <td><input type="text" id ="inp_role" placeholder="Nhập vai trò"></td>
                    <td id ="role_btn">
                      <a href="#" class="action-btn" onclick ="add_account()"> Thêm</a>
                    </td>
                </tr>`;
            querySnapshot.forEach((doc) => {
                user_list.push(doc.data().name);
                const user_info = doc.data();
                const id = doc.id
                console.log("Người dùng", id,  user_info);
                // const StudentId = doc.id;
                if (user_info.role == "user"){
                    htmls += `
                            <tbody>
                                <tr id ="${id}">
                                    <td>${user_info.name}</td>
                                    <td>${user_info.email}</td>
                                    <td>${user_info.phone}</td>
                                    <td>${user_info.role}</td>
                                    <td>
                                        <a href="#" onclick ="custom_account(${id})" class="action-btn">Sửa</a>
                                        <a href="#" onclick ="delete_account(${id})" class="action-btn delete">Xóa</a>
                                    </td>
                                </tr>
                                
                            </tbody>
                        `;
                }
                else{
                    htmls += `
                            <tbody>
                                <tr id ="${id}">
                                    <td>${user_info.name}</td>
                                    <td>${user_info.email}</td>
                                    <td>${user_info.phone}</td>
                                    <td>${user_info.role}</td>
                                    <td>
                                        <a href="#" onclick ="custom_account(${id})" class="action-btn">Sửa</a>
                                        
                                    </td>
                                </tr>
                                
                            </tbody>
                        `;
                }
                
                container.innerHTML = htmls          
            // });
        })
    })
}

//Thêm tài khoản
function add_account() {
    let name = document.getElementById("inp_name").value.trim();
    let gmail = document.getElementById("inp_gmail").value.trim();
    let phone = document.getElementById("inp_phone").value.trim();
    let role = document.getElementById("inp_role").value.trim();
    let password = document.getElementById("inp_password").value.trim();

    if (name === "" || gmail === "" || phone === "" || role === "" || password === "") {
        alert("Vui lòng điền đủ các trường");
        return;
    }

    if (!gmail.includes('@')) {
        alert("Điền đúng cú pháp gmail");
        return;
    }

    if (phone.length != 10 && phone) {
        alert("Điền đúng cú pháp SĐT (10 chữ số)");
        return;
    }

    if (role !== 'admin' && role !== 'user') {
        alert("Vui lòng chỉ điền 'admin' hoặc 'user'");
        return;
    }

    if (password.length < 8) {
        alert("Mật khẩu cần ít nhất 8 kí tự");
        return;
    }

    // Bắt đầu thêm
    console.log("Đang thêm tài khoản...");

    // Kiểm tra trùng email
    db.collection("account-list").where("email", "==", gmail).get()
        .then((emailSnapshot) => {
            if (!emailSnapshot.empty) {
                throw new Error("Email đã được sử dụng");
            }
            // Kiểm tra trùng SĐT
            return db.collection("account-list").where("phone", "==", phone).get();
        })
        .then((phoneSnapshot) => {
            if (!phoneSnapshot.empty) {
                throw new Error("SĐT đã được sử dụng");
            }
            // Tạo tài khoản Auth
            return auth.createUserWithEmailAndPassword(gmail, password);
        })
        .then((userCredential) => {
            if (!userCredential || !userCredential.user) {
                throw new Error("Không thể lấy thông tin tài khoản");
            }
            // Lưu vào Firestore
            return db.collection("account-list").doc(userCredential.user.uid).set({
                name: name,
                email: gmail,
                password: password,
                phone: phone,
                role: role,
                cart: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            alert("Đăng ký thành công!");
        })
        .catch((error) => {
            console.error("Lỗi đăng ký:", error.message);
            alert("Lỗi: " + error.message);
        });
}


// Xóa tài khoản
function delete_account(id){   
    db.collection("account-list").doc(`${id.id}`).delete()
      .then(() => {

            generate_list_user()
      })
      .catch((error) => {
        console.error("Lỗi khi xóa: ", error);
        alert("Xóa không thành công!");
      });            
}

//Sửa tài khoản
function custom_account(id){
    db.collection("account-list").doc(id.id).get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        
        console.log("Dữ liệu:", data);
        var custom = document.getElementById(id.id)
        var custom_html = 
                        `
                            <td><input type="text" id ="custom_name" placeholder="${data.name}"></td>
                            <td><input type="text" id ="custom_email" placeholder="${data.email}"></td>
                            <td><input type="text" id ="custom_phone" placeholder="${data.phone}"></td>
                            <td><input type="text" id ="custom_role" placeholder="${data.role}"></td>
                            <td>
                                <a href="#" onclick ="update_account(${id.id})" class="action-btn">Cập nhật</a>                                    
                                
                            </td>
                        `
        custom.innerHTML =custom_html
        
        
        
      } else {
        alert("Không tìm thấy tài khoản");
      }
    })
    .catch(err => {
      console.error("Lỗi khi lấy dữ liệu:", err);
    });
}

function update_account(id){
            let name = document.getElementById("custom_name").value
            let email = document.getElementById("custom_email").value
            let phone =document.getElementById("custom_phone").value
            let role = document.getElementById("custom_role").value
            if (name != "" || email != "" || phone != "" || role != ""){
                if (name == ""){
                    name = document.getElementById("custom_name").placeholder
                }
                if (email == ""){
                    email = document.getElementById("custom_email").placeholder
                }
                if (phone == ""){
                    phone = document.getElementById("custom_phone").placeholder
                }
                if (role == ""){
                    role = document.getElementById("custom_role").placeholder
                }
                if (phone && phone.length != 10){
                    alert("Vui lòng điền đúng cú pháp số điện thoại")
                }
                if (role != "user" && role !="admin"){
                    alert("Chỉ nhập user hoặc admin")
                }
                db.collection("account-list").doc(id.id).update({
                    name: name,
                    email: email,
                    phone: phone,
                    role: role,
                })
                .then(() => {
                    
                    fetch("http://localhost:3000/update-user", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ uid: id.id, newEmail: email })
                    })
                        .then(res => res.json())
                        .then(data => console.log(data))
                });
            }
                
            else{
                generate_list_user()
            }
        }

