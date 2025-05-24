import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();

// products.forEach(product =>{
//     db.collection("product-list").add(
//         product
//     )
//     .then(() => {
//         console.log("Document successfully written!");
//     })
//     .catch((error) => {
//         console.error("Error writing document: ", error);
//     });
// })


db.collection("product-list").onSnapshot((querySnapshot) => {
    const product_list = [];
    
    var container = document.getElementById("list_product_topdeal")
    db.collection('product-list').get()
        .then((querySnapshot) => {
            var htmls = '';
            querySnapshot.forEach((doc) => {
                product_list.push(doc.data().name);
                const product_info = doc.data();
                console.log("Student:",  product_info);
                // const StudentId = doc.id;
                
                if (String(product_info.price).length > 3){
                    var newprice = String(product_info.price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                var pricesale = Number(product_info.price) * (100 - Number(product_info.sale)) / 100

                if (pricesale > 999){
                    var newpricesale = String(pricesale).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    
                }
                htmls += `
                        <div class ="product col-sm-6 col-md-4 col-lg-3">
                            <img src="${product_info.image}" alt="" id = "image">
                            <p id ="name">${product_info.name}</p>
                            <div id ="rate">
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                            
                            </div>
                            <div class ="price" style ="display:flex;">
                                <div class ="price2">
                                    <p id = price>${newprice}</p>
                                    <span>đ<span>
                                </div>
                                <button id ="add_product" onclick="addProduct(${product_info.id})" alt ="thêm vào giỏ hàng">Thêm</button>
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
    // console.log("Current cities in CA: ", Student.join(", "));
    

});