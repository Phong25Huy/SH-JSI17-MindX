
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
  let length = 0
  for (let i in userData.cart){
      length += userData.cart[i].count
    }
  document.getElementById("soluong").innerHTML = length
  
  
  
  
  // Event delegation để ngăn chặn click lan
  container.addEventListener('click', function (e) {
    const addBtn = e.target.closest('.add_product');
    const productCard = e.target.closest('.product');

    if (addBtn) {
      e.stopPropagation();
      const id = addBtn.dataset.id;
      addProduct(id);
      return;
    }

    if (productCard) {
      const id = productCard.dataset.id;
      product_info(id);
    }
  });

  // Xử lý thêm sản phẩm vào giỏ
  // window.addProduct = function(id) {
  //   let cart_map = {};
  //   const cart = userData.cart || [];
  //   console.log(cart)
    
  //   cart.push(id);
  //   console.log(cart)
    
  //   cart.forEach(item => {
  //     if (cart_map[item]) {
  //       console.log(cart_map[item])
  //       cart_map[item]++;
  //       console.log(cart_map[item])
  //     } else {
  //       console.log(cart_map[item])
  //       cart_map[item] = 1;
  //     }
  //   });
  //   console.log(cart)
  //   console.log(cart_map)
    

  //   const cart_number = Object.keys(cart_map).map(name => ({
  //     name: name,
  //     count: cart_map[name]
  //   })).filter(item => item.name != "[object Object]");
  //   console.log(cart_number)
  //   db.collection("account-list").doc(userData.uid).update({
  //     cart: cart_number
      
  //   }).then(() => {
  //     console.log(cart_number)
  //     length = 0
  //     for (let i in cart_number) {
  //       length += cart_number[i].count;
  //     }
  //     document.getElementById("soluong").innerHTML = length;
  //   }).catch(err => {
  //     console.error("Lỗi khi cập nhật giỏ hàng:", err);
  //   });
  // }
  window.addProduct = function(id) {
  const userRef = db.collection("account-list").doc(userData.uid);

  userRef.get().then(doc => {
    let cart = doc.data().cart || [];

    // Đảm bảo tất cả đều đúng định dạng {name, count}
    cart = cart.filter(item => typeof item === 'object' && item.name);

    // Tìm và cập nhật
    let found = false;
    for (let item of cart) {
      if (item.name === id) {
        item.count++;
        found = true;
        break;
      }
    }
    if (!found) {
      cart.push({ name: id, count: 1 });
    }

    // Update lên Firestore
    userRef.update({ cart }).then(() => {
      let total = 0;
      cart.forEach(item => total += item.count);
      document.getElementById("soluong").innerText = total;
    }).catch(err => {
      console.error("Lỗi khi cập nhật giỏ hàng:", err);
    });

  }).catch(err => {
    console.error("Lỗi khi lấy dữ liệu người dùng:", err);
  });
};


  // Mở chi tiết sản phẩm
  window.product_info = function(productId) {
    db.collection("account-list").doc(userData.uid).update({
      onclick: productId
    }).then(() => {
      window.location = "./product_info.html";
    }).catch(err => {
      console.error("Lỗi khi chuyển trang:", err);
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
      db.collection('product-list')
      .where('categories', '==', categories)
      .get()
        .then((querySnapshot) => {
            let htmls = '';
            querySnapshot.forEach((doc) => {
                const product_info = doc.data();
                if (String(product_info.price).length > 3){
                var newprice = String(product_info.price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                var pricesale = Number(product_info.price) * (100 - Number(product_info.sale)) / 100

                if (pricesale > 999){
                    var newpricesale = String(pricesale).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        
                }
                htmls += `
                <div class="product col-sm-6 col-md-4 col-lg-3" data-id="${doc.id}">
                    <img src="${product_info.image}" alt="">
                    <p>${product_info.name}</p>
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
                    <p>-${product_info.sale}%</p>
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
            })
        })
  
}







