console.log("Todo en orden");


function getData() {
    fetch('http://localhost:8081/products/web', {
        method: 'GET',


    }).then(function(response) {
        if (response.ok) {
            console.log(200);

            return response.json();
        }

    }).then(function(json) {
        data = json;
        /*
		 * name = data.product; 
		 * price = data.price; 
		 * stock = data.stock; 
		 * //images = data.url;
		 */

        renderItems();


        console.log(data)

    }).catch(function(error) {
        console.log("Request failed:" + error.message);
    })
    getData();

    let $items = document.querySelector('#items');
    let cart = [];
    let total = 0;
    let $cart = document.querySelector('#cart');
    let $total = document.querySelector('#total');

    // Funciones
    function renderItems() {
        for (let info of data) {
            // Estructura
            let Nodo = document.createElement('div');
            Nodo.classList.add('card', 'col-sm-4');
            // Body
            let NodoCardBody = document.createElement('div');
            NodoCardBody.classList.add('card-body');
            // Product
            let NodoProducto = document.createElement('h5');
            NodoProducto.classList.add('card-title');
            NodoProducto.textContent = info['name'];
            /*
			 * Imagen let NodoImagen = document.createElement('img');
			 * NodoImagen.classList.add('img-fluid');
			 * NodoImagen.setAttribute('src', info['imagen']);
			 */
            // Price
            let NodoPrecio = document.createElement('p');
            NodoPrecio.classList.add('card-text');
            NodoPrecio.textContent = info['price'] + '€';
            // Boton
            let NodoBoton = document.createElement('button');

            NodoBoton.classList.add('btn', 'btn-warning');
            NodoBoton.textContent = '+';
            NodoBoton.setAttribute('mark', info['id']);
            NodoBoton.addEventListener('click', addToCart);
            // Insertamos
            // NodoCardBody.appendChild(NodoImagen);
            NodoCardBody.appendChild(NodoProducto);
            NodoCardBody.appendChild(NodoPrecio);
            NodoCardBody.appendChild(NodoBoton);
            Nodo.appendChild(NodoCardBody);
            $items.appendChild(Nodo);
        }
    }

    function addToCart() {
        // Añadimos el Nodo a nuestro carrito
        cart.push(this.getAttribute('mark'))
            // Calculo el total
        TotalCalc();
        // Renderizamos el carrito
        renderCart();
    }

    function renderCart() {
        // Vaciamos todo el html
        $cart.textContent = '';

        // Generamos los Nodos a partir de carrito
        cart.forEach(function(item, index) {

            // Obtenemos el item que necesitamos de la variable base de datos
            let miItem = data.filter(function(itemdata) {
                return itemdata['id'] == item;
            });
            // Cuenta el número de veces que se repite el producto
            let numeroUnidadesItem = cart.reduce(function(total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            let Nodo = document.createElement('li');
            Nodo.classList.add('list-group-item', 'text-right');
            Nodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - ${miItem[0]['precio']}€`;

            // Boton de borrar
            let Boton = document.createElement('button');
            Boton.classList.add('btn', 'btn-danger');
            Boton.textContent = 'X';
            Boton.style.marginLeft = '1rem';
            Boton.setAttribute('position', index);
            Boton.addEventListener('click', deleteItemCart);
            // Mezclamos nodos
            Nodo.appendChild(Boton);
            $carrito.appendChild(Nodo);
        })
    }

    function deleteItemCart() {
        console.log()
        let position = this.getAttribute('position');

        cart.splice(position, 1);

        // volvemos a renderizar
        renderCart();
        // Calculamos de nuevo el precio
        TotalCalc();
    }

    function TotalCalc() {
        // Limpiamos precio anterior
        total = 0;
        // Recorremos el array del carrito
        for (let item of cart) {
            // De cada elemento obtenemos su precio
            let miItem = data.filter(function(itemData) {
                return itemData['id'] == item;
            });
            total = total + miItem[0]['price'];
        }
        // Formateamos el total para que solo tenga dos decimales
        let totalDosDecimales = total.toFixed(2);
        // Renderizamos el precio en el HTML
        $total.textContent = totalDosDecimales;
    }
    // Eventos

    // Inicio
    renderItems();


}