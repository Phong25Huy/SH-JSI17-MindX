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

firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    const userRef = db.collection("account-list").doc(user.uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    const uid = user.uid
    
    

    document.getElementById("account_name").innerHTML = `<p>${userData.name.slice(0,6)}</p>`;
    document.getElementById("btn_logout").style.display = "flex";
    document.getElementById("link_login").href = "";
    document.getElementById("more").style.margin = "0";
    document.getElementById("user").style.width = "100px";
    let length = 0
    for (let i in userData.cart){
      length += userData.cart[i].count
    }
    document.getElementById("soluong").innerHTML = length

    renderProduct(uid)
  } else {
    document.getElementById("account_name").innerHTML = "Tài khoản";
    document.getElementById("btn_logout").style.display = "none";
    document.getElementById("link_login").href = "./signin.html";
    document.getElementById("more").style.margin = "0 0 0 40px";
    document.getElementById("user").style.width = "120px";
  }
});

async function renderProduct(uid){
    
    const productImage = document.getElementById("sidebar1")
    const productName = document.getElementById("product_name")
    const productPrice = document.getElementById("price")
    const productSale = document.getElementById("sale")
    const lastPrice = document.getElementById("last_price")
    const total = document.getElementById("total")
    var soluong = document.getElementById("inp_number").value
    const navigate = document.getElementById("navigate")
    
    let imagesrc = ""
    let product_name =""
    let product_price =""
    let product_sale =""
    let total_price = 0
    //Lấy dữ liệu từ account-list
    const accountSnap = await db.collection("account-list").doc(uid).get()
    let id_product = accountSnap.data().onclick
    const product = await db.collection("product-list").doc(id_product).get()
    navigate.innerHTML =`
            <a href="./index.html">Trang chủ</a>
            <span>></span>
            <a href="">${product.data().categories}</a>
    `
    imagesrc = product.data().image
    product_name = product.data().name
    product_price = product.data().price
    product_sale = product.data().sale
    
    if (String(product_price).length > 3){
        var price = String(product_price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    let product_lastprice = Number(product_price) * (100 - Number(product_sale)) / 100

    total_price = soluong * product_lastprice
    console.log(soluong)
    
    if (product_lastprice > 999){
        var lastprice = String(product_lastprice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    if (total_price > 999){
        var price_total = String(total_price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    productImage.innerHTML =`<img src="${imagesrc}" alt="">`
    productName.innerHTML = product_name
    productSale.innerHTML = `-${product_sale}%`
    productPrice.innerHTML = price
    lastPrice.innerHTML = `<span>${lastprice}</span>
                            <p class ="d">đ</p>`
    total.innerHTML = `
        <span>${price_total}</span>
        <p class ="d" >đ</p>
    `
}

async function custom_addItem(){
    const user = firebase.auth().currentUser;

    const userRef = db.collection("account-list").doc(user.uid);
    const userDoc = await userRef.get();
    var soluong = document.getElementById("inp_number").value
    soluong++
    document.getElementById("inp_number").value = soluong
    renderProduct(userDoc.data().uid);
}

async function custom_removeItem(){
    const user = firebase.auth().currentUser;
    const userRef = db.collection("account-list").doc(user.uid);
    const userDoc = await userRef.get();
    var soluong = document.getElementById("inp_number").value
    if(soluong > 1){
        
        soluong--
        document.getElementById("inp_number").value = soluong
        renderProduct(userDoc.data().uid);
    }else{
        alert("Tối thiểu 1 sản phẩm")
        document.getElementById("inp_number").value = 1
    } 
}

async function add_product(){
    const user = firebase.auth().currentUser;
    const userRef = db.collection("account-list").doc(user.uid);
    const userDoc = await userRef.get();
    let count = document.getElementById("inp_number").value
    if (count ==""){
        count = 1
        document.getElementById("inp_number").value = 1
    }
    let cart = userDoc.data().cart || []
    
    let product = 
        {
            name:userDoc.data().onclick,
            count:Number(count),
        }
    cart.push(product)
    console.log(cart)
    const cart_map = cart.reduce((map, item) => {
      if (map[item.name]) {
        map[item.name] += item.count;
      } else {
        map[item.name] = item.count;
      }
      return map;
    }, {});
    console.log("cart_map:",cart_map)


    const cart_number = Object.keys(cart_map).map(name => ({
              name: name,
              count: cart_map[name]
            }));
            console.log("cart_number:",cart_number)
            // for (let i in cart_number){
            //   if(cart_number[i].name == "[object Object]"){
            //     cart_number.splice(i,1)
            //   }
            // }





    db.collection("account-list").doc(user.uid).update({
              cart: cart_number
            }).then(() => {
              let length = 0
              for (let i in cart_number){
                length += cart_number[i].count
                console.log(length)
              }
              document.getElementById("soluong").innerHTML = length;
            }).catch(err => {
              console.error("Lỗi khi cập nhật giỏ hàng:", err);
            });
    
    
}



//Theo dõi input
var input = document.getElementById("inp_number")
input.addEventListener("input", function () {
  const value = parseInt(input.value);
    
  
  if ( value < 1) {
    alert("Tối thiểu 1 sản phẩm")
    document.getElementById("inp_number").value = 1
  }
});


//Chỉnh sửa navigate


