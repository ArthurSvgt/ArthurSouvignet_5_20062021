function ajoutEventPanier () {
    document.getElementById('ajoutPanier')
    .addEventListener('click', ajoutPanier);
}

function ajoutPanier () {
    let id = document.getElementById('ref').textContent
    let name = document.getElementById('name').textContent
    let imageUrl = document.getElementById('imageUrl').src
    let price = document.getElementById('price').textContent
    let qt = document.getElementById('qt').value
    var product = {
        'ref':id,
        'name':name,
        'image':imageUrl,
        'price':price,
        'quantite':qt,
    };

    let products = [];

    
    if (localStorage.getItem ('products')) {
        products =  JSON.parse (localStorage.getItem ('products'))
        const productFound = products.findIndex(productCart => productCart.ref === id)
        console.log(productFound);

        if (productFound >= 0) { 
            products[productFound].quantite = parseInt(products[productFound].quantite) + parseInt(qt);  

        }
        else {
            products.push(product);
        }
        
    }
    
    else {
        products.push(product);
    }
    
    /* Récuperer les données du tableau dans le local storage et ajouter
    le produit au tableau */

    localStorage.setItem('products', JSON.stringify(products))

    /* Rediriger vers la page panier  */

    
}

function ajoutProduit(nom, img, price, id) {
    let nounours = document.createElement("div");
    nounours.className = 'product'
    nounours.innerHTML = "<div class='product'><img id='imageUrl' src='" + img + "'><div class='desc_product'><h1 id='name'>" + nom + "</h1><p id='price'>" + price + "€</p><p>Ref:<span id='ref'>"+id+"</span></p><p>Description du produit</p><input type='number' name='quantite' id='qt' class='quantite' value='1'><button id='ajoutPanier'>Ajouter au panier</button></div></div>"
    document.querySelector("#list_products").appendChild(nounours);
}

function getArticle() {
    let params = new URL(document.location).searchParams;
    let id = params.get("id")

    fetch('http://localhost:3000/api/teddies/' + id)
        .then(response => {
            console.log('3');
            return response.json();
        }
        )
        .then(teddy => {
            ajoutProduit(teddy.name, teddy.imageUrl, teddy.price, teddy._id);
            ajoutEventPanier();
        })
        .catch(function (err) {
            console.log('Erreur');
        })

}

getArticle();

