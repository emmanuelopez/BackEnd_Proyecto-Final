//Clase CONTENEDOR que recibe el nombre del archivo
module.exports = class Producto {

    //array con los productos 
    static #arrProductos = [
        {
            id: 1,
            codigo: "art-01",
            fechaHora: "09/02/2022 20:00:00",
            nombre: "Lovaglio Malbec",
            descripcion: "Vino uva Malbec linea Lovaglio",
            precio: 950,
            imagenURL: "/images/L-Malbec.jpg",
            stock: 100,
        },
        {
            id: 2,
            codigo: "art-01",
            fechaHora: "09/02/2022 20:00:00",
            nombre: "Lovaglio Cabernet-Sauvignon",
            descripcion: "Vino uva Cabernet-Sauvignon linea Lovaglio",
            precio: 950,
            imagenURL: "/images/L-Cabernet-Sauvignon.jpg",
            stock: 100,
        },
        {
            id: 3,
            codigo: "art-01",
            fechaHora: "09/02/2022 20:00:00",
            nombre: "Lovaglio Torrontes",
            descripcion: "Vino uva Torrontes linea Lovaglio",
            precio: 850,
            imagenURL: "/images/L-Torrontes.jpg",
            stock: 100,
        },
        {
            id: 4,
            codigo: "art-02",
            fechaHora: "09/02/2022 20:00:00",
            nombre: "Don Miguel Riesling",
            descripcion: "Vino uva Riesling linea Premium Don Miguel",
            precio: 2500,
            imagenURL: "/images/DM-Riesling.jpg",
            stock: 100,
        },
    ];

    //obtengo el máximo id (lo uso en setProducto)
    #getMaxId(){
        return Producto.#arrProductos.length === 0 ? 0 : Producto.#arrProductos.reduce((acum,proximo)=> acum>proximo.id? acum:proximo.id,0);
    }

    //devuelve todos los productos
    getProductos(){
        return  Producto.#arrProductos.length === 0 ? null : Producto.#arrProductos;
    }

    //devuelve un producto según el id ingresado como parametro
    getProductoById(idProducto){
        return idProducto != undefined && typeof(idProducto) === "number" ? Producto.#arrProductos.find(producto=> producto.id === idProducto): null;
    }

    //recibe y agrega un producto, y lo devuelve con su id asignado
    setProducto(objProductoIN){

        if(objProductoIN.nombre != undefined && 
            objProductoIN.codigo != undefined && 
            objProductoIN.fechaHora != undefined && 
            objProductoIN.codigo != undefined &&
            objProductoIN.descripcion != undefined &&
            (objProductoIN.precio != undefined && parseInt(objProductoIN.precio) != NaN) && 
            (objProductoIN.imagenURL != undefined && objProductoIN.imagenURL != "")){

            let id = this.#getMaxId(); //obtengo el máximo id del array de productos
            id++; //sumo en 1 para asginar al nuevo producto            
            objProductoIN.id = id; //asigno id al nuevo producto
            
            //armo el objetoProducto a agregar y devolver con el nuevo id asignado
            let objProductoOUT =  {   
                id:objProductoIN.id,
                codigo:objProductoIN.codigo,
                fechaHora:objProductoIN.fechaHora,
                nombre:objProductoIN.nombre,
                descripcion:objProductoIN.descripcion,
                precio:objProductoIN.precio,
                imagenURL:objProductoIN.imagenURL,
                stock:objProductoIN.stock,
            };
            Producto.#arrProductos.push(objProductoOUT); // lo agrego a mi arrayProductos
            return objProductoOUT; // lo devuelvo con el nuevo id asignado
        }else{
            return null;
        }
    }

    updateProducto(idProducto,objProducto){

        if(objProducto.nombre != undefined && 
            objProducto.codigo != undefined && 
            objProducto.fechaHora != undefined && 
            objProducto.codigo != undefined &&
            objProducto.descripcion != undefined &&
            (objProducto.imagenURL != undefined && objProducto.imagenURL != "") && 
            (objProducto.precio != undefined && parseInt(objProducto.precio) != NaN) && 
            (idProducto != undefined && typeof(idProducto) === "number")){
            
            //busco la posicion en el array del producto a modificar
            let posicion = Producto.#arrProductos.findIndex(producto=> producto.id === idProducto);
            
            //si la posicion existe , actualizo
            if( posicion > -1){
                //borro producto actual (no modificado)
                Producto.#arrProductos.splice(posicion,1);
                //agrego producto modificado
                Producto.#arrProductos.push(
                    {   
                        id:objProducto.id,
                        codigo:objProducto.codigo,
                        fechaHora:objProducto.fechaHora,
                        nombre:objProducto.nombre,
                        descripcion:objProducto.descripcion,
                        precio:objProducto.precio,
                        imagenURL:objProducto.imagenURL,
                        stock:objProducto.stock,
                    }
                );
                return true; // retorno OK la actualizacion
            }
        }
        return false; // retorno false si no se cumple nada de lo anterior (ambos if)
    }

    //elimina un producto según su id.
    deleteProducto(idProducto){

        if(idProducto != undefined && typeof(idProducto) === "number"){
            //obtengo la posicion en el arrayProductos del id producto ingresado como parametro
            let posicion = Producto.#arrProductos.findIndex(element=> element.id === idProducto);
            
            if( posicion > -1){
                Producto.#arrProductos.splice(posicion,1); //borro producto
                return true; // retorno OK la eliminacion
            }
        }
        return false; // retorno false si no se cumple nada de lo anterior (ambos if)
    }
}

