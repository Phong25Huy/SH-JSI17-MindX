

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

    
    document.getElementById("soluong").innerHTML = userData.cart.length;

    renderProductList(uid)
  } else {
    document.getElementById("account_name").innerHTML = "Tài khoản";
    document.getElementById("btn_logout").style.display = "none";
    document.getElementById("link_login").href = "./signin.html";
    document.getElementById("more").style.margin = "0 0 0 40px";
    document.getElementById("user").style.width = "120px";
  }
});

// async function addProduct(id) {
//   const user = firebase.auth().currentUser;
//   if (!user) return alert("Bạn cần đăng nhập!");

//   const userRef = db.collection("account_list").doc(user.uid);
//   const userDoc = await userRef.get();
//   const cart = userDoc.data().cart || [];

//   cart.push(id);
//   await userRef.update({ cart });

//   document.getElementById("soluong").innerHTML = cart.length;
//   loadCartData(cart);
// }

async function removeItem(id) {
  
  const user = firebase.auth().currentUser;

  const userRef = db.collection("account-list").doc(user.uid);
  const userDoc = await userRef.get();
  let cart = await userDoc.data().cart
  for (let i in cart){
    if (cart[i] == id){
      console.log(cart[i])
      console.log(cart)
      cart.splice(i,1)
      console.log(cart)
      await userRef.update({ cart });

      document.getElementById("soluong").innerHTML = cart.length;
      renderProductList(userDoc.data().uid);
      return
    }
  }
  
  
}



async function renderProductList(data) {
    
    const productListElement = document.getElementById("cart-list");
    let htmlString = "";
    let pricetotal = 0;
    let count = 0;
    const docSnap = await db.collection("account-list").doc(data).get();
    let cartList = docSnap.data().cart
    console.log(cartList)
    if (cartList == ''){
      htmlString =""
      productListElement.innerHTML = htmlString;
    }
    
    for (let index in cartList) {
        let product_id = cartList[index]
        db.collection("product-list").doc(product_id)
        .onSnapshot({
  
            
        }, (doc) => {
          
            var product = doc.data()
            
        count++;
        
        
        const price = Number(product.price);
        
        const sale = Number(product.sale);
        
        const pricesale = price * (100 - sale) / 100;
        
        pricetotal += pricesale;
        
        const newprice = price.toLocaleString();
        const newpricesale = pricesale.toLocaleString();

        htmlString += `
        <tr>
            <td>
            <img src="${product.image}" alt="${product.name}" class="img-thumbnail me-2" width="50">
            ${product.name}
            </td>
            <td>${newprice} ₫</td>
            <td>${newpricesale} ₫</td>
            <td><button class="btn btn-sm btn-outline-danger" onclick="removeItem('${doc.id}')"><i class="bi bi-trash"></i></button></td>
        </tr>
        `;
        const thue = (pricetotal / 10).toLocaleString();
        const transportfee = (count * 10000).toLocaleString();
        const total = (pricetotal + pricetotal / 10 + count * 10000).toLocaleString();

        document.getElementById("transportfee").innerHTML = transportfee + " ₫";
        document.getElementById("pricetotal").innerHTML = pricetotal.toLocaleString() + " ₫";
        document.getElementById("thue").innerHTML = thue + " ₫";
        document.getElementById("total").innerHTML = total + " ₫";
        productListElement.innerHTML = htmlString;
        });
        
    }

    
}

function logout() {
  firebase.auth().signOut().then(() => {
    window.location = "./signin.html";
  });
}
