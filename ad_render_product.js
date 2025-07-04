
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();
const auth = firebase.auth()
//Render sản phẩm
var generate_list_product = function(){
    render_product()
    document.getElementById("categories_name").innerHTML = "Danh sách sản phẩm"
    document.getElementById("accounts").classList.remove("active")
    document.getElementById("products").classList.add("active")
}
var render_product = function(){
    db.collection("product-list").orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
    const product_list = [];
    
    var container = document.getElementById("list_product_topdeal")
            var htmls = `<div class ="product col-sm-6 col-md-4 col-lg-3" style ="height:450px;">
                            
                            <h5>Mục thêm sản phẩm</h5>

                                <div style ="display:block">
                                    <input type="text" placeholder="Đường dẫn ảnh" id ="input_link">
                                    <input type ="text" placeholder="Tên sản phẩm" id ="input_name">
                                    <input type="text" id="input_categories" placeholder="Danh mục">
                                </div>
                                
                            
                            
                            
                            <div class ="price" style ="display:flex;">
                                <div class ="price2">
                                    <input type="number" placeholder="giá tiền" id ="input_price">
                                </div>
                                <button id ="add_product" onclick="add_Product()" alt ="thêm vào giỏ hàng">Thêm</button>
                            </div>
                            <div class="sale" style ="display:flex;justify-content:space-between;">
                        
                                <input type ="number" placeholder="Sale" id ="input_sale">
                            
                                <div class ="price2">
                                    <p style ="color:red;font-weight:500;font-size:20px;"></p>
                                </div>
                                
                            </div>
                            <div class = "line"></div>
                            <div class ="deli">
                                <img src="./Asset/index/picture/deli_morning.png" alt="">
                                <input type ="text" placeholder ="Thời gian giao hàng" id ="input_time">
                            </div>
                        </div>`;
            querySnapshot.forEach((doc) => {
                product_list.push(doc.data().name);
                const product_info = doc.data();
                console.log("Sản phẩm",  product_info);
                // const StudentId = doc.id;
                
                if (String(product_info.price).length > 3){
                    var newprice = String(product_info.price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                var pricesale = Number(product_info.price) * (100 - Number(product_info.sale)) / 100

                if (pricesale > 999){
                    var newpricesale = String(pricesale).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    
                }
                htmls += `
                        <div class ="product col-sm-6 col-md-4 col-lg-3" id ="${doc.id}"> 
                            <img src="${product_info.image}" alt="" id = "image">
                            <p id ="name">${product_info.name}</p>
                            <div id ="rate">
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i class="fa-solid fa-pen-to-square" onclick ="custom_product(${doc.id})"></i>
                            
                            </div>
                            <div class ="price" style ="display:flex;">
                                <div class ="price2">
                                    <p id = price>${newprice}</p>
                                    <span>đ<span>
                                </div>
                                <button id ="add_product" alt ="thêm vào giỏ hàng">Thêm</button>
                            </div>
                            <div class="sale" style ="display:flex;justify-content:space-between;">
                        
                    
                                <p id = "sale">-${product_info.sale}%</p>
                                <div class ="price2">
                                    <p style ="color:red;font-weight:500;font-size:20px;">${newpricesale}</p>
                                    <span style ="color:red;"font-weight:500>đ<span>
                                </div>
                                
                            </div>
                            <div class = "line"></div>
                            <div class ="deli">
                                <img src="./Asset/index/picture/deli_morning.png" alt="">
                                <span id ="delivery_time">${product_info.delivery_time}</span>
                            </div>
                        </div>
                        `;
                container.innerHTML = htmls          
            });
        })
}
render_product()
    // console.log("Current cities in CA: ", Student.join(", "));


function removeVietnameseTones(str) {
    return str.normalize("NFD") // Tách chữ và dấu
              .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
              .replace(/đ/g, "d") // Thay thế riêng chữ đ
              .replace(/Đ/g, "D");
}
//Thêm sản phẩm
function add_Product() {
    let name = document.getElementById("input_name").value
    let link = document.getElementById("input_link").value
    let price =document.getElementById("input_price").value
    let sale = document.getElementById("input_sale").value
    let time = document.getElementById("input_time").value
    let categories = document.getElementById("input_categories").value
    
    if (name == "" || link == "" || price == "" || sale == ""|| time == "" ) {
        alert("Vui lòng điền đủ các trường");
        return;
    }
    else if(price < 1000){
        alert("Giá bán gốc tối thiểu là 1.000 vnd")
    }
    else if(sale < 0 || sale > 100){
        alert("Giảm giá từ 0 tới 100%")
    }
    else{

        // Thêm user vào Firestore
        db.collection("product-list").add({
            name: name,
            search: removeVietnameseTones(name).toUpperCase(),
            price: price,
            sale: sale,
            image: link,
            categories: categories,
            rate: 0,
            delivery_time:time,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            location.reload();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
    }
}

//Sửa sản phẩm
function custom_product(id){
    db.collection("product-list").doc(id.id).get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        
        console.log("Dữ liệu:", data);
        var custom = document.getElementById(id.id)
        var custom_html = 
                            `
                            
                                <h5>Mục thêm sản phẩm</h5>

                                <div style ="display:block;">
                                    <input type="text" placeholder="${data.image}" id ="custom_link">
                                    <input type ="text" placeholder="${data.name}" id ="custom_name">
                                    <input type="text" id="custom_categories" placeholder="${data.categories}">
                                </div>
                                
                            
                            
                            
                            <div class ="price" style ="display:flex;">
                                <div class ="price2">
                                    <input type="number" placeholder="${data.price}" id ="custom_price">
                                </div>
                                <button onclick="update_product(${doc.id})" id ="update_product" alt ="Cập nhật giỏ hàng">Update</button>
                            </div>
                            <div class="sale" style ="display:flex;justify-content:space-between;">
                        
                                <input type ="number" placeholder="${data.sale}" id ="custom_sale">
                            
                                <div class ="price2">
                                    <p style ="color:red;font-weight:500;font-size:20px;"></p>
                                </div>
                                
                            </div>
                            <div class = "line"></div>
                            <div class ="deli">
                                <img src="./Asset/index/picture/deli_morning.png" alt="">
                                <input type ="text" placeholder="${data.delivery_time}" id ="custom_time">
                            </div>
                        `;
                        
        custom.innerHTML =custom_html
        
        
        
      } else {
        alert("Không tìm thấy tài khoản");
      }
    })
    .catch(err => {
      console.error("Lỗi khi lấy dữ liệu:", err);
    });
}

//update sản phẩm
function update_product(id){
            let name = document.getElementById("custom_name").value
            let link = document.getElementById("custom_link").value
            let categories =document.getElementById("custom_categories").value
            let price = document.getElementById("custom_price").value
            let sale = document.getElementById("custom_sale").value
            let time= document.getElementById("custom_time").value
            if (name != "" || link != "" || categories != "" || price != "" || sale !="" || time !=""){
                if (name == ""){
                    name = document.getElementById("custom_name").placeholder
                }
                if (link == ""){
                    link = document.getElementById("custom_link").placeholder
                }
                if (categories == ""){
                    categories = document.getElementById("custom_categories").placeholder
                }
                if (price == ""){
                    price = document.getElementById("custom_price").placeholder
                }
                if (sale == ""){
                    sale = document.getElementById("custom_sale").placeholder
                    console.log(sale)
                    console.log(typeof(sale))
                }
                if (time ==""){
                    time = document.getElementById("custom_time").placeholder
                }
                if (price < 1000 && price != ""){
                    alert("Vui lòng điền giá tiền tổi thiểu 1.000 vnd")
                }
                if ((sale < 0 || sale > 100) && sale != ""){
                    alert("Chỉ nhập từ 0 tới 100")
                }
                db.collection("product-list").doc(id.id).update({
                    name: name,
                    search: removeVietnameseTones(name).toUpperCase(),
                    price: price,
                    sale: sale,
                    image: link,
                    categories: categories,
                    delivery_time:time,
                
                })
                .then(() => {
                    alert("Đã cập nhật thành công!");
                    })
                    .catch((error) => {
                    console.error("Lỗi khi cập nhật:", error);
                });
            }
                
            else{
                generate_list_product()
            }
        }



