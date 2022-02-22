const express = require("express");
const { sendFile } = require("express/lib/response");
const router = express.Router();

const Producto = require('../modules/clase_producto'); //importo la clase Producto
const producto = new Producto();

//GET '/api/productos' -> devuelve todos los productos
router.get("/",(req, res)=>{
    res.status(200).json(producto.getProductos()); 
});


//GET '/api/productos/:id' -> devuelve un producto según su id.
router.get("/:idProducto",(req, res)=>{
    //obtengo el id recibido por parametro
    let idProducto = parseInt(req.params.idProducto);

    //valido que el id ingresado sea numerico
    if ( !isNaN(idProducto) ){
        let objProductoId = producto.getProductoById(idProducto);
        objProductoId != null ? res.status(200).json(objProductoId): res.status(406).json({error:`No se encontró el producto con id: ${idProducto}`});
    }else{
        res.status(404).json({error:'El id ingresado no es numerico'});
    }    
});

//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado
router.post("",(req,res)=>{
    console.log("Inicio Post a productos.js");
    let objProductoBody = {...req.body};
    console.log(objProductoBody);
    //agrego nuevo producto al arrayProductos y devuelvo solo el nuevo obj producto con el id asignado
    console.log("Creo un producto nuevo con serProducto");
    let objProductoNuevo = producto.setProducto(objProductoBody);
    console.log(objProductoNuevo);
    objProductoNuevo != null ? res.status(200).json(objProductoNuevo) : res.status(406).json({error:'Error al agregar el nuevo producto'});
});

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put("/:idProducto",(req,res)=>{
    //obtengo el id recibido por parametro
    let idProducto = parseInt(req.params.idProducto);
    let objProductoBody = {...req.body};

    //actualizo los datos del producto del id recibido
    producto.updateProducto(idProducto,objProductoBody) ? res.status(200).json({status:`El producto con Id ${idProducto} fue actualizado correctamente.`}) : res.status(406).json({error:`No se encontró el producto con id: ${idProducto}`});
});

//DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete("/:idProducto",(req,res)=>{
    //obtengo el id recibido por parametro
    let idProducto = parseInt(req.params.idProducto);
    
    //elimino producto con id enviado como parametro
    producto.deleteProducto(idProducto) ? res.status(200).json({status:`El producto con Id ${idProducto} fue eliminado correctamente.`}) : res.status(406).json({error: `No se encontró el producto con id: ${idProducto}`});
});

module.exports = router;