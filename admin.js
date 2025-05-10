var userLogin = JSON.parse(localStorage.getItem("userlogin"))
var logout = function(){
    localStorage.removeItem("userlogin")
    window.location.href = "signin.html"
}
// console.log(userLogin.phone)
if (userLogin){
    document.getElementById("link_login").href = ""
    document.getElementById("more").style.margin = "0"
    document.getElementById("btn_logout").style.display = "flex"
    document.getElementById("account_name").innerHTML = `<p style ="margin-bottom:0;">${userLogin.phone}</p>`
    document.getElementById("user").style.width = "100px"
    var addProduct = function(id){
        var countproduct = JSON.parse(localStorage.getItem("countproduct"))
        countproduct += 1
        localStorage.setItem("countproduct",JSON.stringify(countproduct))
        document.getElementById("soluong").innerHTML = JSON.parse(localStorage.getItem("countproduct"))
            
        var CartID = JSON.parse(localStorage.getItem("CartIDlist")) || []
        if (CartID){
            const Newdata = [...CartID,id]
            localStorage.setItem("CartIDlist",JSON.stringify(Newdata))
        }
    }
    document.getElementById("soluong").innerHTML = JSON.parse(localStorage.getItem("countproduct"))
}
else{
    document.getElementById("link_login").href = "./signin.html"
    document.getElementById("account_name").innerHTML = "Tài khoản"
    document.getElementById("btn_logout").style.display = "none"
    document.getElementById("more").style.margin = "0 0 0 40px"
    document.getElementById("user").style.width = "120px"
    
        var addProduct = function(){
            window.scrollTo(0,500)
            UIkit.modal(`
                <div id="modal-center" class="uk-flex-top" uk-modal>
                    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style ="background-color: white; border-radius:8px; width:430px;top:-1000;">
                        <img src="./Asset/index/picture/modal_close.png" class="uk-modal-close-default" type = "button" alt="">
                        <h4>Bạn chưa đăng nhập, cần có tài khoản để thêm sản phẩm</h4>
                        <a href="./signin.html" style ="margin-left:175px;">  
                            <button type="button" class="btn btn-secondary" >Đăng nhập</button>
                        </a>
                        <a href="./signup.html">
                            <button type="button" class="btn btn-primary">Đăng kí</button>
                        </a>
                    </div>
                </div>
                        
            `
        ).show()
        
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


function renderProduct(product_info) {
    var productElement = document.getElementById("list_product_topdeal");
    var htmlelement = `
        <div class ="product col-sm-6 col-md-4 col-lg-3" style ="height:450px;">
                            
                            <button></button>
                                
                            
                                <div style ="display:block">
                                    <p id ="name"></p>
                                    <div id ="rate">
                                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </div>
                                </div>
                                
                            
                            
                            
                            <div class ="price" style ="display:flex;">
                                <div class ="price2">
                                    <p id = price></p>
                                    <span>đ<span>
                                </div>
                                <button id ="add_product" onclick="addProduct()" alt ="thêm vào giỏ hàng">Thêm</button>
                            </div>
                            <div class="sale" style ="display:flex;justify-content:space-between;">
                        
                    
                                <p id = "sale">-%</p>
                                <div class ="price2">
                                    <p style ="color:red;font-weight:500;font-size:20px;"></p>
                                    <span style ="color:red;"font-weight:500>đ<span>
                                </div>
                                
                            </div>
                            <div class = "line"></div>
                            <div class ="deli">
                                <img src="./Asset/index/picture/deli_morning.png" alt="">
                                <span id ="delivery_time"></span>
                            </div>
                </div>`
    ;
    
    
    for (var index in product_info) {
        
            if (product_info[index].price.length > 3){
                var newprice = product_info[index].price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                
            }
        
        var pricesale = Number(product_info[index].price) * (100 - Number(product_info[index].sale)) / 100
        if (pricesale > 999){
            var newpricesale = String(pricesale).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            
        }
        htmlelement += `
                        <div class ="product col-sm-6 col-md-4 col-lg-3" id ="product_admin">
                            
                            <img src="${product_info[index].image}" alt="" id = "image">
                                
                            
                                <div style ="display:block">
                                    <p id ="name">${product_info[index].name}</p>
                                    <div id ="rate">
                                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </div>
                                </div>
                                
                            
                            
                            
                            <div class ="price" style ="display:flex;">
                                <div class ="price2">
                                    <p id = price>${newprice}</p>
                                    <span>đ<span>
                                </div>
                                <button id ="add_product" onclick="addProduct(${product_info[index].id})" alt ="thêm vào giỏ hàng">Thêm</button>
                            </div>
                            <div class="sale" style ="display:flex;justify-content:space-between;">
                        
                    
                                <p id = "sale">-${product_info[index].sale}%</p>
                                <div class ="price2">
                                    <p style ="color:red;font-weight:500;font-size:20px;">${newpricesale}</p>
                                    <span style ="color:red;"font-weight:500>đ<span>
                                </div>
                                
                            </div>
                            <div class = "line"></div>
                            <div class ="deli">
                                <img src="./Asset/index/picture/deli_morning.png" alt="">
                                <span id ="delivery_time">${product_info[index].delivery_time}</span>
                            </div>
                        </div>`

    }
    productElement.innerHTML = htmlelement
}

axios.get("https://66c989ed8a477f50dc30e938.mockapi.io/list_product").then(function (data) {
    product_info = data.data
    renderProduct(product_info)
})



