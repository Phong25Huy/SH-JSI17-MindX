
var logout = function(){
   firebase.auth().signOut().then(() => {
    window.location = "./signin.html";
  });
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







axios.get("https://66c989ed8a477f50dc30e938.mockapi.io/list_product").then(function (data) {
    product_info = data.data
    // renderProduct(product_info)
})



