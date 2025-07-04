
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



const container = document.getElementById("list_product_topdeal");
    
db.collection('product-list').orderBy("createdAt", "desc").get().then((querySnapshot) => {
    let htmls = '';
    
    querySnapshot.forEach((doc) => {
        const product_info = doc.data();
        const id = doc.id;

        const newprice = String(product_info.price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const pricesale = Number(product_info.price) * (100 - Number(product_info.sale)) / 100;
        const newpricesale = String(pricesale).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        htmls += `
        <div class="product col-sm-6 col-md-4 col-lg-3" data-id="${id}">
            <img src="${product_info.image}" alt="">
            <p id ="name">${product_info.name}</p>
            <div>
            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
            </div>
            <div class="price" style="display:flex;">
            <div class="price2">
                <p>${newprice}</p><span>đ</span>
            </div>
            <button class="add_product" data-id="${id}">Thêm</button>
            </div>
            <div class="sale" style="display:flex;justify-content:space-between;">
            <p id ="sale">-${product_info.sale}%</p>
            <div class="price2">
                <p style="color:red;font-weight:500;font-size:20px;">${newpricesale}</p>
                <span style="color:red;font-weight:500">đ</span>
            </div>
            </div>
            <div class="line"></div>
            <div class="deli">
            <img src="./Asset/index/picture/deli_morning.png" alt="">
            <span>${product_info.delivery_time}</span>
            </div>
        </div>`;
    });

    container.innerHTML = htmls;
});

// Thanh tìm kiếm


document.addEventListener('DOMContentLoaded', function() {
    
    const searchButton = document.getElementById("search_find");
    if (searchButton) {
        searchButton.addEventListener('click', search_text);
    }
});

function removeVietnameseTones(str) {
    return str.normalize("NFD") // Tách chữ và dấu
              .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
              .replace(/đ/g, "d") // Thay thế riêng chữ đ
              .replace(/Đ/g, "D");
}

var search_text = function(){
    var search_value = document.getElementById("search_input_value").value.toUpperCase()
    var search = removeVietnameseTones(search_value)
    db.collection('product-list')
  .where('search', '>=', search)
  .where('search', '<=', search+'\uF8FF')
  .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var htmls = '';
            var container = document.getElementById("list_product_topdeal")
            const product_info = doc.data();
            if (String(product_info.price).length > 3){
                var newprice = String(product_info.price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
            var pricesale = Number(product_info.price) * (100 - Number(product_info.sale)) / 100

            if (pricesale > 999){
                var newpricesale = String(pricesale).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    
            }
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            htmls += `
        <div class="product col-sm-6 col-md-4 col-lg-3" data-id="${doc.id}">
            <img src="${product_info.image}" alt="">
            <p id ="name"style="color:red;font-weight:500;font-size:20px;">${product_info.name}</p>
            <div>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
            </div>
            <div class="price" style="display:flex;">
                <div class="price2">
                    <p>${newprice}</p><span>đ</span>
                </div>
                <button class="add_product" data-id="${doc.id}">Thêm</button>
            </div>
            <div class="sale" style="display:flex;justify-content:space-between;">
                <p id ="sale">-${product_info.sale}%</p>
                <div class="price2">
                    <p style="color:red;font-weight:500;font-size:20px;background-color:none;">${newpricesale}</p>
                    <span style="color:red;font-weight:500">đ</span>
                </div>
            </div>
            <div class="line"></div>
            <div class="deli">
            <img src="./Asset/index/picture/deli_morning.png" alt="">
            <span>${product_info.delivery_time}</span>
            </div>
        </div>`;
                container.innerHTML = htmls  
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

}


