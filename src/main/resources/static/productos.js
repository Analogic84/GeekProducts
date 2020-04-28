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
        //llamar funcion 
        //createTable();
        createTarjeta();
        console.log(data);

    }).catch(error => {
        console.log("Request failed:" + error.message);
    })
}
getData();
/* 
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

function createTarjeta() {
    const tarjetaContainer = document.getElementById("tarjetaContainer");

    data.forEach((producto, index) => {
        const card = document.createElement('div');
        card.classList = 'card-body';
        // Construccion del contenido de la tarjeta
        const content = `
     <div class="card">
    <div class="card-header" id="heading-${index}">
     <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${index}" aria-expanded="true" aria-controls="collapse-${index}">
              <a href="cart.html" class="btn btn-warning mb-2">Buy Now!!</a>
             </button>
     </h5>
    </div>

    <div id="collapse-${index}" class="collapse show" aria-labelledby="heading-${index}" data-parent="#tarjetaContainer">
    <div class="card-body">

        <h5>${producto.name}</h5>
        <p>${producto.price}€</p>
        <p>${producto.stock}</p>
      
    </div>
  </div>
</div>
`;

        // Append newyly created card element to the container- Agregar elemento de tarjeta recién creado al tarjetaContainer
        tarjetaContainer.innerHTML += content;
    })


    /* console.log(tarjeta);

    let cardName = document.createElement("h5");
    cardName.textContent = producto.name;
    tarjeta.appendChild(cardName);

    let cardPrice = document.createElement("p");
    cardPrice.textContent = producto.price;
    tarjeta.appendChild(cardPrice);

    let cardStock = document.createElement("p");
    cardStock.textContent = producto.stock;
    tarjeta.appendChild(cardStock);


    tarjetaContainer.appendChild(tarjeta);

}); */

}

function busqueda() {

    const busqueda = document.querySelector('#busqueda');
    const boton = document.querySelector('#boton');
    const resultado = document.querySelector('#resultado');


    const filtrar = () => {
        //Keyup
        //console.log(busqueda.value);
        const texto = busqueda.value.toLowerCase();

        resultado.innerHTML = ""; //string vacio

        //recorremos con buble for,variable local = producto
        for (let producto of data) {
            let nombreProducto = producto.name.toLowerCase();
            // const valorProducto = producto.price.toString(); se convierte a string para que se pueda realizar la busqueda 

            //busqueda por nombre ,si no encuentra ese texto va a retornar -1,
            //busca el primer indice en el q se puede encontrar un elemento dado en el array
            if ((nombreProducto.indexOf(texto) !== -1)) {
                resultado.innerHTML += `<li> ${producto.name} `; //info dinamica
            }
        }
        //si inner sigue vacio y nunca entro al for pues devuelve producto no encontrado
        if (resultado.innerHTML === "") {
            resultado.innerHTML += `<li>not found...</li>`;

        }

    }

    //se ejecuta lo que esta dentro de la const filtrar.agrego el evento click al boton
    boton.addEventListener('click', filtrar);
    //Agrego el evento keypUp a la busqueda
    busqueda.addEventListener('keyup', filtrar);
    filtrar();
}

//agregar carrito de compra

/*var contenido = document.querySelector('#contenido')
function traer (){
	fetch ('http://randomuser.me/api/')
	.then(res =>res.json()) 
	.then(data => {
		console.log(data.results['0'])
		contenido.innerHTML =`
		<img src="${data.results ['0'].picture.large}" width="100px" class="img-fluid rounded-circle" >
		<p>Last Name: ${data.results ['0'].name.last}</p>`	
	})
}
*/