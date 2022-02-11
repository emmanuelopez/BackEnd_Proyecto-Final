const socket = io();

//muestra listado de productos por pantalla
async function mostrarListadoProductos(data) {
    console.log("main.js: se muestra lista de productos disponibles")
    //obtengo la estructura del html
    const fetchTemplateHbs = await fetch("/templates/listado_productos.hbs");
    const templateHbs = await fetchTemplateHbs.text();
    const template = Handlebars.compile(templateHbs);
    //lleno la estructura de html obtenida con los productos obtenidos
    const html = template({ productos: data });
    //imprimo en pantalla el html
    document.querySelector("#lista_productos").innerHTML = html;
}

//Se inicia conexion del lado del cliente con el mensaje enviado por servidor
socket.on('mensaje_inicio', data => {
    console.log("main.js: socket.on - INICIO")
    console.log(data);
    mostrarListadoProductos(data);
    //socket.emit('notificacion', 'Mensaje recibido exitosamente')
})

//Formulario carga de productos -> Boton Submit
  document
  .querySelector("#formAltaProducto") 
  .addEventListener("submit", async (e) => {
    console.log("main.js: Evento submit alta producto - INICIO");
    e.preventDefault(); 
    const date = new Date();
      let fechaHora = date.toLocaleDateString() + " " + date.toLocaleTimeString()
    console.log(fechaHora)
    //obtengo los datos del formulario
    let nuevoProducto = {
        codigo: document.querySelector("#formAltaProducto input[name=codigoProducto]").value,
        fechaHora: fechaHora,
        nombre: document.querySelector("#formAltaProducto input[name=nombreProducto]").value,
        descripcion: document.querySelector("#formAltaProducto input[name=descripcionProducto]").value,
        precio: document.querySelector("#formAltaProducto input[name=precioProducto]").value,
        imagenURL: document.querySelector("#formAltaProducto input[name=imagenProducto]").value,
        stock: document.querySelector("#formAltaProducto input[name=stockProducto]").value,
    };
    console.log(nuevoProducto);
    //llamo a la api que realiza el alta de nuevo producto
    let rtaAgregarProducto = await fetch("/api/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoProducto),
    });
    //respondo al servidor si se dio o no de alta el producto
    rtaAgregarProducto != null ? socket.emit("mensaje_AltaProducto", {estado: "OK"}) : socket.emit("mensaje_AltaProducto", {estado: "ERROR"});
    //borro los datos del formulario y lo vuelvo a dejar vacio
    document.querySelector("#formAltaProducto input[name=codigoProducto]").value="";
    document.querySelector("#formAltaProducto input[name=nombreProducto]").value="";
    document.querySelector("#formAltaProducto input[name=descripcionProducto]").value="";
    document.querySelector("#formAltaProducto input[name=precioProducto]").value="";
    document.querySelector("#formAltaProducto input[name=imagenProducto]").value="";
    document.querySelector("#formAltaProducto input[name=stockProducto]").value="";
  });