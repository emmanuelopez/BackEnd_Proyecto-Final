//Clase CONTENEDOR que recibe el nombre del archivo
module.exports = class Carrito {

    //array con los productos 
    static #arrCarritos = [
        {
            id: 1,
            productos: [
                {
                idProducto: 1,
                precioProducto: 950,
                cantidad: 6,
                },
                {
                idProducto: 2,
                precioProducto: 950,
                cantidad: 4,
                }
            ],        
        },
        {
            id: 2,
            productos: [
                {
                idProducto: 4,
                precioProducto: 2500,
                cantidad: 6,
                },
                {
                idProducto: 1,
                precioProducto: 950,
                cantidad: 12,
                }
            ],        
        },
    ];

    //obtengo el máximo id (lo uso en setCarrito)
    #getMaxId(){
        return Carrito.#arrCarritos.length === 0 ? 0 : Carrito.#arrCarritos.reduce((acum,proximo)=> acum>proximo.id? acum:proximo.id,0);
    }

    //devuelve todos los carritos 
    getCarritos(){
        return  Carrito.#arrCarritos.length === 0 ? null : Carrito.#arrCarritos;
    }

    //devuelve el contenido de un carrito en particular 
    getProductosCarritoById(idCarrito){
        return idCarrito != undefined && typeof(idCarrito) === "number" ? Carrito.#arrCarritos.find(carrito=> carrito.id === idCarrito): null;
    }

    //crea carrito y devuelve el id del carrito asignado 
    setCarrito(objProductosCarrito){
        let id = this.#getMaxId(); //obtengo el máximo id del array de carritos
        id++; //sumo en 1 para asginar al nuevo carrito      
        //armo el objetoCarritoNuevo
        let objCarritoNuevo =  {   
            id:id,
            productos: objProductosCarrito.productos,
        };
        Carrito.#arrCarritos.push(objCarritoNuevo); // lo agrego a mi arrayCarritos
        return id; //  devuelvo id asignado  
    }

    //agrego un producto al carrito
    agregarProductoCarrito(idCarrito,objProducto){
        console.log("cl_Carrito.js: agregarProductoCarrito: INCIO")
        console.log("carrito: " + idCarrito)
        console.log(objProducto)

        if(objProducto.idProducto != undefined && idCarrito != undefined){
            console.log("validacion de datos OK")
            //busco la posicion en el array del carrito a modificar
            let posicionCarrito = Carrito.#arrCarritos.findIndex(carrito=> carrito.id === idCarrito);
            
            //si la posicion existe (carrito existe) , actualizo
            if( posicionCarrito > -1){
                console.log(Carrito.#arrCarritos[posicionCarrito])

                //valido si ya existe el producto
                let posicionProducto = Carrito.#arrCarritos[posicionCarrito].productos.findIndex(producto=> producto.idProducto === objProducto.idProducto);
                
                if( posicionProducto > -1){ //existe, sumo cantidad en 1
                    console.log("El producto existe en el carrito, sumo cantidad en 1")
                    let cantidadActual = Carrito.#arrCarritos[posicionCarrito].productos[posicionProducto].cantidad;
                    Carrito.#arrCarritos[posicionCarrito].productos[posicionProducto].cantidad = cantidadActual + 1; 

                }else{ //no existe el producto, lo agrego
                    console.log("El producto no existe en el carrito, lo agrego")
                    
                    Carrito.#arrCarritos[posicionCarrito].productos.push({
                        idProducto: objProducto.idProducto,
                        precioProducto: objProducto.precioProducto,
                        cantidad: 1,
                    })
                } 
                return true; // retorno OK la actualizacion
            }
        }
        console.log("validacion de datos ERROR")
        return false; // retorno false si no se cumple nada de lo anterior (ambos if)
    }

    //elimina un producto del carrito
    eliminarProductoCarrito(idCarrito,idProducto){
        console.log("cl_Carrito.js: eliminarProductoCarrito: INICIO")

        if(idCarrito != undefined && idProducto != undefined){
            console.log("validacion de datos OK")
            //busco la posicion en el array del carrito a modificar
            let posicionCarrito = Carrito.#arrCarritos.findIndex(carrito=> carrito.id === idCarrito);
            
            //si la posicion existe (carrito existe) , actualizo
            if( posicionCarrito > -1){
                console.log(Carrito.#arrCarritos[posicionCarrito])

                //valido si ya existe el producto
                let posicionProducto = Carrito.#arrCarritos[posicionCarrito].productos.findIndex(producto=> producto.idProducto === idProducto);
                
                if( posicionProducto > -1){ //existe, lo elimino
                    console.log("El producto existe en el carrito, lo elimino")
                    Carrito.#arrCarritos[posicionCarrito].productos.splice(posicionProducto, 1); 
                    return true; // retorno OK la actualizacion
                }else{ //no existe el producto, lo agrego
                    console.log("El producto no existe en el carrito, no fue posible eliminarlo.")
                    return false; // retorno ERROR la actualizacion
                }                 
            }
        }
        console.log("validacion de datos ERROR");
        return false; // retorno false si no se cumple nada de lo anterior (ambos if)
    }

    //elimina un carrito
    deleteProducto(idCarrito){

        if(idCarrito != undefined && typeof(idCarrito) === "number"){
            //obtengo la posicion en el arrayCarritos del id carrito ingresado como parametro
            let posicion = Carrito.#arrCarritos.findIndex(element=> element.id === idCarrito);
            
            if( posicion > -1){
                Carrito.#arrCarritos.splice(posicion,1); //borro producto
                return true; // retorno OK la eliminacion
            }
        }
        return false; // retorno false si no se cumple nada de lo anterior (ambos if)
    }
}

