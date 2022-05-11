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
        <h2>Prix:<span class="total_ligne"></span>€</h2>
        <div class=delete><button class="btn-supprimer">Supprimer l'article</button></div>`


        divProduct.querySelector('.quantite').addEventListener('change', () => {
            calculateTotalProduct();
            calculateTotalOrder();
        })
        document.querySelector("#list_products").appendChild(divProduct);


    });



    calculateTotalProduct();

    calculateTotalOrder();

    eventDelete();

}

function eventDelete() {
    let deleteLine = document.querySelectorAll(".btn-supprimer");
    console.log(deleteLine);
    let products = localStorage.getItem('products');
    products = JSON.parse(products);
    deleteLine.forEach((line, index) => {
        line.onclick = function () {
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products))
            location.reload();
        };
    })

}
/* Fonction qui calcule le prix total pour un produit en fonction de la quantité */




function calculateTotalProduct() {
    let panier = document.querySelectorAll(".productPanier");
    panier.forEach(product => {
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





document.querySelector("#btncommande").addEventListener("click", (e) => {
    e.preventDefault()
    let FirstName = document.querySelector("#prenom").value;
    let name = document.querySelector("#nom").value;
    let adress = document.querySelector("#adresse").value;
    let city = document.querySelector("#ville").value;
    let mail = document.querySelector("#mail").value;

    if (emailControle, prenomControle, nomControle, adressControle, cityControle()) {
        let products = localStorage.getItem("products");
        products = JSON.parse(products);
        let productId = [];
        products.forEach(product => {
            productId.push(product.ref)
        })

        let order = {
            contact: {
                "firstName": FirstName,
                "lastName": name,
                "address": adress,
                "city": city,
                "email": mail,
            },
            products: productId

        }
        fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }


        )
            .then(response =>
                response.json())
            .then(data => {
                console.log(data)
                sessionStorage.setItem("order", JSON.stringify(data));
                window.location.href = "../page_confirmation/index.html";
            })



        console.log(order);
    }



})

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function emailControle() {

    const email = document.querySelector("#mail").value;
    console.log(email);
    console.log(validateEmail(email));
    if (validateEmail(email)) {
        return true;
    } else {
        alert("L'email n'est pas valide");
        return false;
    }
}
// function qui verifie que le prénom contient des lettres..

function validatePrenom(FirstName) {
    var re = /^[a-z ,.'-]+$/i; 
    return re.test(FirstName);
}

function prenomControle() {

    const FirstName = document.querySelector("#prenom").value;
    console.log(FirstName);
    console.log(validatePrenom(FirstName));
    if (validatePrenom(FirstName)&& FirstName.length > 3) {
        return true;
    } else {
        alert("Le prénom n'est pas valide");
        return false;
    }
}

function validateNom(name) {
    var re = /^[a-z ,.'-]+$/i; // Regex a revoir car peut contenir un nom a une lettre etc
    return re.test(name);
}

function nomControle() {

    const name = document.querySelector("#nom").value;
    console.log(name);
    console.log(validateNom(name));
    if (validateNom(name)) {
        return true;
    } else {
        alert("Le nom n'est pas valide");
        return false;
    }
}

function validateAdress(adress) {
    var re = /^\s*\S+(?:\s+\S+){2}/;
    return re.test(adress);
}

function adressControle() {

    const adress = document.querySelector("#adresse").value;
    console.log(adress);
    console.log(validateAdress(adress));
    if (validateAdress(adress)) {
        return true;
    } else {
        alert("L'adresse n'est pas valide");
        return false;
    }
}

function validateCity(city) {
    var re = /[a-zA-Z]+(?:[ '-][a-zA-Z]+)*/i; // Regex a vérifier
    return re.test(city);
}

function cityControle() {

    const city = document.querySelector("#ville").value;
    console.log(city);
    console.log(validateCity(city));
    if (validateCity(city)) {
        return true;
    } else {
        alert("La ville n'est pas valide");
        return false;
    }
}

