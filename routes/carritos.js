const express = require("express");
const { sendFile } = require("express/lib/response");
const router = express.Router();

const Carrito = require("../modules/clase_carrito"); //importo la clase Carrito
const carrito = new Carrito();

//GET '/api/carritos' -> devuelve todos los carritos 
router.get("/",(req, res)=>{
    res.status(200).json(carrito.getCarritos()); 
});


//GET '/api/carritos/:id/productos' -> devuelve todos los productos de un carrito
router.get("/:idCarrito/productos",(req, res)=>{
    //obtengo el id recibido por parametro
    let idCarrito = parseInt(req.params.idCarrito);

    //valido que el id ingresado sea numerico
    if ( !isNaN(idCarrito) ){
        let objProductosCarritoId = carrito.getProductosCarritoById(idCarrito);
        objProductosCarritoId != null ? res.status(200).json(objProductosCarritoId): res.status(406).json({error:`No se encontrĂ³ el carrito con id: ${idCarrito}`});
    }else{
        res.status(404).json({error:'El id ingresado no es numerico'});
    }    
});

//POST '/api/carritos' -> crea un carrito y devuelve el id asignado
router.post("/",(req,res)=>{
    console.log("LOG router.post (carritos.js): INICIO ");
    let objProductosCarrito = {...req.body};
    let objCarritoNuevo = carrito.setCarrito(objProductosCarrito);
    console.log(objCarritoNuevo);
    objCarritoNuevo != null ? res.status(200).json(objCarritoNuevo) : res.status(406).json({error:'Error al querer crear el nuevo carrito'});
});

//POST '/api/carrito/:id/productos' -> recibe y agrega un producto al carrito indicado x el body
router.post("/:idCarrito/productos",(req,res)=>{
    //obtengo el id recibido por parametro
    let idCarrito = parseInt(req.params.idCarrito);
    let objProductosCarritoBody = {...req.body};

    //actualizo los datos del producto del id recibido
    carrito.agregarProductoCarrito(idCarrito,objProductosCarritoBody) ? res.status(200).json({status:`El producto con Id ${objProductosCarritoBody.idProducto} fue agregado al carrito correctamente.`}) : res.status(406).json({error:`No se encontrĂ³ el carrito con id: ${idCarrito}`});
});

//DELETE '/api/carrito/:id/productos' -> recibe y elimina un producto al carrito indicado x el body
router.delete("/:idCarrito/productos/:idProducto",(req,res)=>{
    //obtengo el id recibido por parametro
    let idCarrito = parseInt(req.params.idCarrito);
    let idProducto = parseInt(req.params.idProducto);

    //actualizo los datos del producto del id recibido
    carrito.eliminarProductoCarrito(idCarrito,idProducto) ? res.status(200).json({status:`El producto con Id ${idProducto} fue eliminado del carrito correctamente.`}) : res.status(406).json({error:`No fue posible eliminar el producto. El id carrito ${idCarrito} y/o el id producto: ${idProducto} no existe`});
});

//DELETE '/api/carrito/:id' -> elimina un carrito segĂºn su id.
router.delete("/:idProducto",(req,res)=>{
    //obtengo el id recibido por parametro
    let idProducto = parseInt(req.params.idProducto);
    
    //elimino producto con id enviado como parametro
    carrito.deleteProducto(idProducto) ? res.status(200).json({status:`El carrito con Id ${idProducto} fue eliminado correctamente.`}) : res.status(406).json({error: `No se encontrĂ³ el producto con id: ${idProducto}`});
});

module.exports = router;