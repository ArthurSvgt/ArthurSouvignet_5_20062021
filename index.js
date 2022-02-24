function createProduct (nom,img,price,id) {
    let element = document.createElement("div");
    element.className = 'product' 
    element.innerHTML = "<a href='page_produit/index.html?id="+id+"'><img class='image' src='"+img+"' <div class='desc_product'> <h1>"+nom+"</h1> <p>Fait main</p> <p class='price'>"+price+"€</p> </div>"
    return element   
}

function getArticles() {
    let parent = document.querySelector('#list_products');
    fetch('http://localhost:3000/api/teddies') 
    .then(response => {
        console.log ('3');
        return response.json();
    }
        )
        .then(teddies => {
            teddies.forEach(teddy => {
                    let productHtml = createProduct(teddy.name,teddy.imageUrl,teddy.price,teddy._id);
                    parent.append(productHtml);
            })
        })
        .catch(function (err){
            console.log ('Erreur');
        })

}

getArticles();





