var userLogin = JSON.parse(localStorage.getItem("userlogin"))
var logout = function(){
    localStorage.removeItem("userlogin")
    window.location.href = "signin.html"
}
// console.log(userLogin.phone)
// if (userLogin){
//     document.getElementById("link_login").href = ""
//     document.getElementById("more").style.margin = "0"
//     document.getElementById("btn_logout").style.display = "flex"
//     document.getElementById("account_name").innerHTML = `<p style ="margin-bottom:0;">${userLogin.phone}</p>`
//     document.getElementById("user").style.width = "100px"
//     var addProduct = function(id){
//         var countproduct = JSON.parse(localStorage.getItem("countproduct"))
//         countproduct += 1
//         localStorage.setItem("countproduct",JSON.stringify(countproduct))
//         document.getElementById("soluong").innerHTML = JSON.parse(localStorage.getItem("countproduct"))
            
//         var CartID = JSON.parse(localStorage.getItem("CartIDlist")) || []
//         if (CartID){
//             const Newdata = [...CartID,id]
//             localStorage.setItem("CartIDlist",JSON.stringify(Newdata))
//         }
//     }
//     document.getElementById("soluong").innerHTML = JSON.parse(localStorage.getItem("countproduct"))
// }
// else{
//     document.getElementById("link_login").href = "./signin.html"
//     document.getElementById("account_name").innerHTML = "Tài khoản"
//     document.getElementById("btn_logout").style.display = "none"
//     document.getElementById("more").style.margin = "0 0 0 40px"
//     document.getElementById("user").style.width = "120px"
    
//         var addProduct = function(){
//             window.scrollTo(0,500)
//             UIkit.modal(`
//                 <div id="modal-center" class="uk-flex-top" uk-modal>
//                     <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style ="background-color: white; border-radius:8px; width:430px;top:-1000;">
//                         <img src="./Asset/index/picture/modal_close.png" class="uk-modal-close-default" type = "button" alt="">
//                         <h4>Bạn chưa đăng nhập, cần có tài khoản để thêm sản phẩm</h4>
//                         <a href="./signin.html" style ="margin-left:175px;">  
//                             <button type="button" class="btn btn-secondary" >Đăng nhập</button>
//                         </a>
//                         <a href="./signup.html">
//                             <button type="button" class="btn btn-primary">Đăng kí</button>
//                         </a>
//                     </div>
//                 </div>
                        
//             `
//         ).show()
        
//     }
    
// }

var generate_modal = function () {
    UIkit.modal(`<div id="modal-center" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style ="background-color: none;width:430px;bottom:150px;">

        <img src="./Asset/index/picture/modal_close.png" class="uk-modal-close-default" type = "button" alt="">

        <img src="./Asset/index/picture/modal.png" alt="">

    </div>
</div>`).show();
}
// generate_modal()
var account_list = [
    {
        phone: "0369999909",
        email:"phongnguyenhuy63@gmail.com",
        password:"12345678"
    }
]

function filter(categories) {
    axios.get("https://66c989ed8a477f50dc30e938.mockapi.io/list_product").then(function (data) {
        var product_info = data.data
        console.log(product_info, categories)

        if (categories === "") {
            var newproductlist = [...product_info]
            console.log({ newproductlist })
            renderProduct(newproductlist)
            return
        }
    
        var newProductList = [...product_info].filter(function (product) {
    
            return product.categories === categories;
        });
    
        console.log({ newProductList });
    
        renderProduct(newProductList);
    })
  
}

var generate_list_user = function(){
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
    db.collection('account-list').get().then((querySnapshot) => {
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
                console.log("Người dùng",  user_info);
                // const StudentId = doc.id;
                if (user_info.role == "user"){
                    htmls += `
                            <tbody>
                                <tr>
                                    <td>${user_info.name}</td>
                                    <td>${user_info.email}</td>
                                    <td>${user_info.phone}</td>
                                    <td>${user_info.role}</td>
                                    <td>
                                        <a href="#" class="action-btn">Sửa</a>
                                        <a href="#" class="action-btn delete">Xóa</a>
                                    </td>
                                </tr>
                                
                            </tbody>
                        `;
                }
                else{
                    htmls += `
                            <tbody>
                                <tr>
                                    <td>${user_info.name}</td>
                                    <td>${user_info.email}</td>
                                    <td>${user_info.phone}</td>
                                    <td>${user_info.role}</td>
                                    <td>
                                        <a href="#" class="action-btn">Sửa</a>
                                        
                                    </td>
                                </tr>
                                
                            </tbody>
                        `;
                }
                
                container.innerHTML = htmls          
            });
        })
}

//Thêm tài khoản
function add_account() {
    let name = document.getElementById("inp_name").value
    let gmail = document.getElementById("inp_gmail").value
    let phone =document.getElementById("inp_phone").value
    let role = document.getElementById("inp_role").value
    let password = document.getElementById("inp_password").value
    if (name == "" || gmail == "" || phone == "" || role == "") {
        alert("Vui lòng điền đủ các trường");
        return;
    }
    else if(!gmail.includes('@')){
        alert("Điền đúng cú pháp gmail")
    }
    else if(phone.length != 10){
        alert("Điền đúng cú pháp SĐT")
    }
    else if(role != 'admin' & role != 'user'){
        
            alert("Vui lòng chỉ điền admin hoặc user")
        
    }
    else if(password < 8){
        alert("password cần có 8 kí tự")
    }
    else{
        console.log("đang thêm")
        // Thêm user vào Firestore
        db.collection("account-list").add({
            name: name,
            email: gmail,
            password: password,
            phone: phone,
            role: role,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            location.reload();
            generate_list_user()
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
    }
}


// function renderProduct(product_info) {
//     var productElement = document.getElementById("list_product_topdeal");
//     var htmlelement = `
//         `
//     ;
    
    
//     for (var index in product_info) {
        
//             if (product_info[index].price.length > 3){
//                 var newprice = product_info[index].price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                
//             }
        
//         var pricesale = Number(product_info[index].price) * (100 - Number(product_info[index].sale)) / 100
//         if (pricesale > 999){
//             var newpricesale = String(pricesale).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            
//         }
//         htmlelement += `
//                         <div class ="product col-sm-6 col-md-4 col-lg-3" id ="product_admin">
                            
//                             <img src="${product_info[index].image}" alt="" id = "image">
                                
                            
//                                 <div style ="display:block">
//                                     <p id ="name">${product_info[index].name}</p>
//                                     <div id ="rate">
//                                         <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
//                                         <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
//                                         <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
//                                         <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
//                                         <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
//                                         <i class="fa-solid fa-pen-to-square"></i>
//                                     </div>
//                                 </div>
                                
                            
                            
                            
//                             <div class ="price" style ="display:flex;">
//                                 <div class ="price2">
//                                     <p id = price>${newprice}</p>
//                                     <span>đ<span>
//                                 </div>
//                                 <button id ="add_product" onclick="addProduct(${product_info[index].id})" alt ="thêm vào giỏ hàng">Thêm</button>
//                             </div>
//                             <div class="sale" style ="display:flex;justify-content:space-between;">
                        
                    
//                                 <p id = "sale">-${product_info[index].sale}%</p>
//                                 <div class ="price2">
//                                     <p style ="color:red;font-weight:500;font-size:20px;">${newpricesale}</p>
//                                     <span style ="color:red;"font-weight:500>đ<span>
//                                 </div>
                                
//                             </div>
//                             <div class = "line"></div>
//                             <div class ="deli">
//                                 <img src="./Asset/index/picture/deli_morning.png" alt="">
//                                 <span id ="delivery_time">${product_info[index].delivery_time}</span>
//                             </div>
//                         </div>`

//     }
//     productElement.innerHTML = htmlelement
// }

axios.get("https://66c989ed8a477f50dc30e938.mockapi.io/list_product").then(function (data) {
    product_info = data.data
    // renderProduct(product_info)
})



