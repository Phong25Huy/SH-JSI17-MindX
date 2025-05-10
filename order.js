var userLogin = JSON.parse(localStorage.getItem("userlogin"))
var logout = function(){
    localStorage.removeItem("userlogin")
    window.location.href = "signin.html"
}
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
    function removeItem(index){
        var productIDList = JSON.parse(localStorage.getItem("CartIDlist"))
        productIDList.splice(index,1)
        localStorage.setItem("CartIDlist",JSON.stringify(productIDList))
        
        axios.get("https://66c989ed8a477f50dc30e938.mockapi.io/list_product").then(function (data) {
            var productList = data.data;
            const myCart = JSON.parse(localStorage.getItem("CartIDlist")) || [];
            console.log(myCart)
            const cartData = [];

            for (var index in myCart) {
            const productId = myCart[index];
            const product = productList.find(function (item) {
                return item.id == productId;
            });

            cartData.push(product);
            }

            console.log(cartData);

            renderProductList(cartData);
        })
        var countproduct = Number(JSON.parse(localStorage.getItem("countproduct")))
        countproduct -= 1
        localStorage.setItem("countproduct",JSON.stringify(countproduct))
        document.getElementById("soluong").innerHTML = JSON.parse(localStorage.getItem("countproduct"))
    }
    function renderProductList(data) {
        var productListElement = document.getElementById("cart-list");
        console.log(data)
        var htmlString = "";
        var pricetotal = 0
        var count = 0
        
        for (var index in data) {
            
            
            count += 1
             
            if (count*10000 > 999){
                var  transportfee = String(count*10000).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            document.getElementById("transportfee").innerHTML = transportfee + " ₫"
            if (data[index].price.length > 3){
                var newprice = data[index].price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                
            }
            var pricesale = Number(data[index].price) * (100 - Number(data[index].sale)) / 100
            pricetotal += pricesale
            
            if (pricesale > 999){
                var newpricesale = String(pricesale).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            if (pricetotal > 999){
                var newpricetotal = String(pricetotal).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            document.getElementById("pricetotal").innerHTML = newpricetotal + " ₫"

            if (pricetotal/10 >1000){
                var newvat = String(pricetotal/10).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            document.getElementById("thue").innerHTML = newvat + " ₫"
            if (pricetotal + pricetotal/10 + count*10000 > 999){
                var total = String(pricetotal + pricetotal/10 + count*10000).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            document.getElementById("total").innerHTML = total + " ₫"
        htmlString =
        htmlString +
        `
                <tr>
                <td>
                    <img src="${data[index].image}" alt="Giày Nike" class="img-thumbnail me-2" width="50">
                    ${data[index].name}
                </td>
                
                <td>${newprice}₫</td>
                <td>${newpricesale}₫</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger" onclick ="removeItem(${index})"><i class="bi bi-trash"></i></button>
                </td>
                </tr>
        `;
    }

    productListElement.innerHTML = htmlString;
    }
    axios
    .get("https://66c989ed8a477f50dc30e938.mockapi.io/list_product")
    .then(function (data) {
        var productList = data.data;
        const myCart = JSON.parse(localStorage.getItem("CartIDlist")) || [];
        console.log(myCart)
        const cartData = [];

        for (var index in myCart) {
        const productId = myCart[index];
        const product = productList.find(function (item) {
            return item.id == productId;
        });

        cartData.push(product);
        }

        console.log(cartData);

        renderProductList(cartData);
    })
}
else{
  document.getElementById("link_login").href = "./signin.html"
  document.getElementById("account_name").innerHTML = "Tài khoản"
  document.getElementById("btn_logout").style.display = "none"
  document.getElementById("more").style.margin = "0 0 0 40px"
  document.getElementById("user").style.width = "120px"
}



