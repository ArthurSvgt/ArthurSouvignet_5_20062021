function totalPrice() {

const prixTotal = localStorage.getItem("prixTotal");
document.querySelector(".totalPrix").textContent = prixTotal
console.log(`prixTotal : ${prixTotal}`);

}

totalPrice();