function getPanier() {
    let products = localStorage.getItem('products');
    products = JSON.parse(products);
    products.forEach(product => {
        let divProduct = document.createElement("div");
        divProduct.className = 'productPanier'
        divProduct.innerHTML = `<img src='${product.image}'>
        <div class='desc_product'>
        <h1>${product.name}</h1>
        <p class='price'>${product.price}</p>
        </div>
        <div>
        <h3>Quantité</h3>
        <input type='number' name='quantite' class='quantite' id='qt' value='${product.quantite}'>
        </div>
        <h2>Prix:<span class="total_ligne"></span>€</h2>`
        

        divProduct.querySelector('.quantite').addEventListener('change', () => {
            calculateTotalProduct();
            calculateTotalOrder();
        })
        document.querySelector("#list_products").appendChild(divProduct);


    });

    calculateTotalProduct();
    
    calculateTotalOrder();

}

/* Ajouter l'évenement onChange sur la quantité, et sur le chargement de la page onLoad) */

/* Fonction qui calcule le prix total pour un produit en fonction de la quantité */



function calculateTotalProduct() {
    let panier = document.querySelectorAll(".productPanier");
    panier.forEach (product => {
        let price = product.querySelector(".price").textContent
        let quantity = product.querySelector(".quantite").value
        let totalLigne = product.querySelector(".total_ligne")
        totalLigne.textContent = parseFloat(price) * quantity;
    })


}

/* Fonction qui calcule le total de la commande */

function calculateTotalOrder() {

    let panier = document.querySelectorAll(".productPanier");
    let total = 0;
    panier.forEach(product => {
        let price = product.querySelector(".total_ligne").textContent;
        total += parseFloat(price);
    
    })
    document.querySelector(".totalPanier").textContent = total
    console.log(total);
    localStorage.setItem("prixTotal", JSON.stringify(total));
}



getPanier();


document.querySelector("#btncommande").addEventListener("click",(e)=>{
    e.preventDefault()
let name = document.querySelector("#prenom").value;
console.log(name);

})