console.log("Todo en orden");




function getData() {
    fetch('http://localhost:8081/products/web', {
        method: 'GET',


    }).then(function(response) {
        if (response.ok) {
            console.log(200);

            return response.json();
        }

    }).then(json => {
        data = json;
        producto = data;
        //llamada a la funcion 
        getInfo();
        //createTable();
        createTarjeta();
        myFilterFunction();
        //renderItems()
        addToCart();
        renderizarCarrito();
        borrarItemCarrito();
        calcularTotal();


        //console.log(data);


    }).catch(error => {
        console.log("Request failed:" + error.message);
    })
}
getData();
/*FUNCION PARA OBTENER INFORMACION DEL DATA*/
function getInfo() {
    var producto = data;
    var names = [];
    var prices = [];
    var available = [];

    for (var i = 0; i < producto.length; i++) {

        names.push(producto[i].name);
        prices.push(producto[i].price);
        available.push(producto[i].stock);

        //console.log(name);

    }
    //console.log(names, prices, stocks);
}

/* 
 FUNCION QUE CREA UNA TABLA
function createTable() {
    // se crea la tabla
    const cuerpoTabla = document.querySelector("#cuerpoTabla");
    // recorro todos los productos
    data.forEach(producto => {
        // Creo un <tr>
        const tr = document.createElement("tr");
        //
        // Creo el <td> de Id y lo adjunto a tr
        let tdId = document.createElement("td");
        tdId.textContent = producto.id; // el textContent del td es el id
        tr.appendChild(tdId);
        //
        // El td del Product
        let tdProduct = document.createElement("td");
        tdProduct.textContent = producto.name;
        tr.appendChild(tdProduct);
        // El td del Price
        let tdprice = document.createElement("td");
        tdprice.textContent = producto.price;
        tr.appendChild(tdprice);
        // El td del Stock
        let tdStock = document.createElement("td");
        tdStock.textContent = producto.stock;
        tr.appendChild(tdStock);
        // por ultimo agrego el <tr> al cuerpo de la tabla
        cuerpoTabla.appendChild(tr);
        // Y el ciclo se repite hasta que se termina de recorrer todo el data
    });
} */

/*FUNCION QUE CREA LA TARJETA FORMA1*/
/*function createTarjeta() {

    const tarjetaContainer = document.getElementById("tarjetaContainer");

    data.forEach((producto, index) => {
        const card = document.createElement('div');
        card.classList = 'card-body';
        /*Construccion del contenido de la tarjeta
        const content = `
     <div class="card" >
    <div class="card-header" id="heading-${index}">
     <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${index}" aria-expanded="true" aria-controls="collapse-${index}">
              <a href="cart.html" class="btn btn-warning mb-2">Buy Now!!</a>
             </button>
     </h5>
    </div>

    <div id="collapse-${index}" class="collapse show" aria-labelledby="heading-${index}" data-parent="#tarjetaContainer">
    <div class="card-body" id="resultado">

        <h5>${producto.name}</h5>
        <p>${producto.price}€</p>
        <p>On Stock: ${producto.stock}</p>
      
    </div>
  </div>
</div>
`;
        /* Append newyly created card element to the container- Agregar elemento de tarjeta recién creado al tarjetaContainer
        tarjetaContainer.innerHTML += content;
        //console.log(tarjetaContainer);
    })
}*/

/* CREA LA TARJETA DESDE JS FORMA2*/
function createTarjeta() {
    // var producto = data;

    var tarjeta;
    var tarjetaContainer = document.getElementById('tarjetaContainer');
    let $items = document.querySelector('#items');


    //recorremos con buble for
    for (var i = 0; i < producto.length; i++) {

        let nombreProducto = producto[i].name;
        let valorProducto = producto[i].price.toString();
        let stockProducto = producto[i].stock.toString(); //se convierte a string para que se pueda realizar la busqueda 
        ;

        //Se crea la tarjeta y su contenido
        tarjeta = document.createElement('div');
        tarjeta.className = 'card-body';


        var cardName = document.createElement('h5');
        cardName.textContent = nombreProducto; //valor de h5
        cardName.className = 'card-name';

        var cardPrice = document.createElement('p');
        cardPrice.textContent = valorProducto + "€";
        cardPrice.className = 'card-price';

        var cardStock = document.createElement('p');
        cardStock.textContent = "Units available: " + stockProducto;
        cardStock.className = 'card-stock';

        let button = document.createElement('button');
        button.classList.add('btn', 'btn-warning');
        button.textContent = 'Add +';
        button.setAttribute('marcador', producto['name']);
        button.addEventListener('click', addToCart);

        // Insertamos   
        tarjeta.appendChild(cardName);
        tarjeta.appendChild(cardPrice);
        tarjeta.appendChild(cardStock);
        tarjeta.appendChild(button);

        tarjetaContainer.append(tarjeta);
        $items.appendChild(tarjeta);

        console.log(tarjeta);
    }

}

/*FUNCION QUE BUSCA POR NOMBRE DE PRODUCTO*/
function myFilterFunction() {


    const busqueda = document.querySelector('#busqueda');
    //const button = document.querySelector('#boton');
    const resultado = document.getElementsByClassName('card-body');

    const texto = busqueda.value.toLowerCase();

    var names = [];
    var prices = [];
    var available = [];

    for (var i = 0; i < producto.length; i++) {

        let nombreProducto = producto[i].name.toLowerCase();

        if (nombreProducto.includes(texto)) {

            names.push(producto[i].name);
            prices.push(producto[i].price);
            available.push(producto[i].stock);
            resultado[i].style.display = "";

        } else {
            resultado[i].style.display = "none";
        }


    }
    //console.log();

}

/**
 * FUNCIONES PARA EL CARRITO DE LA COMPRA
 */

let $items = document.querySelector('#items');
let carrito = [];
let total = 0;
let $carrito = document.querySelector('#carrito');
let $total = document.querySelector('#total');
// Funciones

function addToCart() {
    // Añadimos el Nodo a nuestro carrito
    carrito.push(this.getAttribute('marcador'));
    // Calculo el total
    calcularTotal();
    // Renderizamos el carrito 
    renderizarCarrito();

}

function renderizarCarrito() {
    // Vaciamos todo el html
    $carrito.textContent = '';
    // Quitamos los duplicados
    let carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach(function(item) {
        // Obtenemos el item que necesitamos de la variable base de datos
        let miItem = data.filter(function(itemBaseDatos) {
            return itemBaseDatos['name'] == item;
        });
        // Cuenta el número de veces que se repite el producto
        let numeroUnidadesItem = carrito.reduce(function(total, itemId) {
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        let miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0],producto['name']} - ${miItem[0],producto['price']}€`;
        // Boton de borrar
        let miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.setAttribute('item', item);
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        $carrito.appendChild(miNodo);
    })
}

function borrarItemCarrito() {
    console.log()
        // Obtenemos el producto ID que hay en el boton pulsado
    let id = this.getAttribute('item');
    // Borramos todos los productos
    carrito = carrito.filter(function(carritoId) {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
    // Calculamos de nuevo el precio
    calcularTotal();
}

function calcularTotal() {
    // Limpiamos precio anterior
    total = 0;
    // Recorremos el array del carrito
    for (let item of carrito) {
        // De cada elemento obtenemos su precio
        let miItem = data.filter(function(itemBaseDatos) {
            return itemBaseDatos['name'] == item;
        });
        total = total + miItem[0], producto['price'];
    }
    // Renderizamos el precio en el HTML
    $total.textContent = total.toFixed(2);
}