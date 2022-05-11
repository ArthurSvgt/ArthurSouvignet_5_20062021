function totalPrice() {

    const prixTotal = localStorage.getItem("prixTotal");
    document.querySelector(".totalPrix").textContent = prixTotal
    console.log(`prixTotal : ${prixTotal}`);

}

function displayOrderId() {
    let order = JSON.parse(sessionStorage.getItem('order')) 
    document.querySelector('#orderId').textContent = order.orderId
}

displayOrderId();
totalPrice();