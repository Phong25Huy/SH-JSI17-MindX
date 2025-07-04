
var logout = function(){
   firebase.auth().signOut().then(() => {
    window.location = "./signin.html";
  });
}















