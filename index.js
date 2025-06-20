
        // Initialize Firebase

firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service

const auth = firebase.auth();



auth.onAuthStateChanged(function(user) {
  if (user) {
    const email = user.email;

    db.collection("account-list").where("email", "==", email).get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          
          updateUIForLoggedInUser(userData);
        }
      });
  } else {
    updateUIForGuest();
  }
});

function updateUIForLoggedInUser(userData) {
  document.getElementById("link_login").href = "";
  document.getElementById("more").style.margin = "0";
  document.getElementById("btn_logout").style.display = "flex";
  document.getElementById("account_name").innerHTML = `<p style="margin-bottom:0;">${userData.name.slice(0,6)}</p>`;
  document.getElementById("user").style.width = "100px";
  document.getElementById("soluong").innerHTML = userData.cart.length;
  
  
  

  // Cho phép thêm sản phẩm
  window.addProduct = function(id) {
      const cart = userData.cart || []
      console.log(cart)
      
      
      
      cart.push(id)
      console.log(cart)

            db.collection("account-list").doc(userData.uid).update({
              cart: cart
            }).then(() => {
              document.getElementById("soluong").innerHTML = cart.length;
            }).catch(err => {
              console.error("Lỗi khi cập nhật giỏ hàng:", err);
            });
  }
}

function Logout(){
    firebase.auth().signOut()
    window.location = "./signin.html"
}



function updateUIForGuest() {
  document.getElementById("link_login").href = "./signin.html";
  document.getElementById("account_name").innerHTML = "Tài khoản";
  document.getElementById("btn_logout").style.display = "none";
  document.getElementById("more").style.margin = "0 0 0 40px";
  document.getElementById("user").style.width = "120px";

  window.addProduct = function () {
    UIkit.modal(`
      <div id="modal-center" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="background-color: white; border-radius:8px; width:430px;top:-1000;">
          <img src="./Asset/index/picture/modal_close.png" class="uk-modal-close-default" type="button" alt="">
          <h4>Bạn chưa đăng nhập, cần có tài khoản để thêm sản phẩm</h4>
          <a href="./signin.html" style="margin-left:175px;">
            <button type="button" class="btn btn-secondary">Đăng nhập</button>
          </a>
          <a href="./signup.html">
            <button type="button" class="btn btn-primary">Đăng kí</button>
          </a>
        </div>
      </div>
    `).show();
  }
}


var generate_modal = function () {
    UIkit.modal(`<div id="modal-center" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style ="background-color: none;width:430px;bottom:150px;">

        <img src="./Asset/index/picture/modal_close.png" class="uk-modal-close-default" type = "button" alt="">

        <img src="./Asset/index/picture/modal.png" alt="">

    </div>
</div>`).show();
}



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







