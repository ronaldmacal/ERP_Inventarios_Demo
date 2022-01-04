class nodohash{
    constructor(dato,idvendedor,idcliente,total){
        this.dato = dato;
        this.idvendedor=idvendedor;
        this.idcliente=idcliente;
        this.total=total;
        this.listaproductos=new listaVendido();
    }
}

class hash{
    constructor(){
        this.claves = this.iniciar_arreglo(7);
        this.claves_usadas=0;
        this.size = 7;
    }

    iniciar_arreglo(tamaño){
        let claves=[];
        for(var i =0;i<tamaño,i++;){
            claves[i] = null;
        }
        return claves;
    }

    calcular_hash(dato){
        //metodo de division
        let resultado=0;
        resultado= dato % this.size;
        return resultado;
    }

    solucion_coliciones(indice){ //metodo de exploracion cuadratica
        let nuevo_indice =0;
        let i=0;
        let disponible = false;

        while(disponible == false){
            nuevo_indice = indice + Math.pow(i,2);
            //validar que nuevo_indice sea menor al tañano de la tabla
            if(nuevo_indice>= this.size){
                nuevo_indice = nuevo_indice-this.size;
            }
            //validar que la posicion del nuevo indice este disponible
            if(this.claves[nuevo_indice]==null){
                disponible= true;
            }
            i++;
        }
        return nuevo_indice;
    }

    insertar(nuevo){
        
        let indice = this.calcular_hash(nuevo.dato);

        //validaciones 
        if(this.claves[indice]==null){ //posicion disponible
            this.claves[indice] = nuevo;
            this.claves_usadas++;
        }else{ // existe una colicion
            indice =  this.solucion_coliciones(indice);
            this.claves[indice] = nuevo;
            this.claves_usadas++
        }

        //validacion de tamaño
        let Porcentaje_uso = this.claves_usadas/this.size;
        if(Porcentaje_uso>=0.5){
            this.rehash();
        }
    }

    rehash(){
        //****** Encontrar el siguiente numero primo */
        let primo= false;
        let new_size = this.size;
        while(primo==false){
            new_size++;
            let cont =0;
            for(var i = new_size;i>0; i--){
                if(new_size%i ==0){
                    cont++;
                }
            }
            //validar cuantas veces se dividio exactamente
            if(cont == 2){
                primo= true
            }
        }
        //****** crear nuevo arreglo con el tamaño del siguente numero primo */
        let claves_aux = this.claves;

        this.size = new_size;
        this.claves = this.iniciar_arreglo(new_size);
        this.claves_usadas=0;

        for(var i =0; i<claves_aux.length;i++){
            if(claves_aux[i]!=null){
                this.insertar(claves_aux[i]);
            }
        }
    }

    recorrer(){
        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null){
                console.log("--0>"+this.claves[i].dato);
                this.claves[i].listaproductos.mostrar();
                console.log("-----Termina la lista-----");
            }else{
                console.log("--0> Hash vacio");
            }
        }
    }

    insertar_producto(id,idprod,cantidad){
        var encontrado=false;
        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null && encontrado==false){
                if(this.claves[i].dato==id){
                    console.log("IDS:"+this.claves[i].dato+" equal -> "+id);
                    this.claves[i].listaproductos.insertarProd(idprod,cantidad);
                    encontrado=true;
                }
            }
        }
    }
}

class nodoVenta{
    constructor(id,cantidad){
        this.id=id;
        this.cantidad=cantidad;
        this.siguiente=null;
        this.anterior=null;
    }
}

class listaVendido{
    constructor(){
        this.primero=null;
        this.ultimo=null;
    }

    insertarProd(id,cantidad){
        let nuevo = new nodoVenta(id,cantidad);
        console.log("Producto: "+id+" cant: "+cantidad);
        if (this.primero == null){
            this.primero=nuevo;
            this.primero.siguiente=null;
            this.primero.anterior=null;
            this.ultimo=nuevo;
        }else{
            this.ultimo.siguiente=nuevo;
            nuevo.siguiente=null;
            nuevo.anterior=this.ultimo;
            this.ultimo=nuevo;
        }
    }

    mostrar(){
        let id="";
        let actual = new nodoVenta(id)
        actual=this.primero;
        if (this.primero!=null){
            console.log("  Lista productos comprados:")
            while(actual!=null){
                console.log("  ->"+actual.id);
                actual=actual.siguiente;
            }
        }else{
            console.log("Lista vacía")
        }
    }
}



let tabla = new hash();
//dato,idvendedor,idcliente,total
tabla.insertar(new nodohash(10,111,"Cliente1",40));
tabla.insertar(new nodohash(8,112,"Cliente2",420));
tabla.insertar(new nodohash(2,113,"Cliente3",60));
tabla.insertar(new nodohash(9,111,"Cliente4",311));
tabla.insertar(new nodohash(81,112,"Cliente5",110));
tabla.insertar(new nodohash(12,114,"Cliente6",741));
tabla.insertar(new nodohash(90,113,"Cliente7",23));
tabla.insertar(new nodohash(181,112,"Cliente8",420));
tabla.insertar(new nodohash(112,111,"Cliente9",84));
tabla.insertar(new nodohash(190,113,"Cliente10",33));

tabla.insertar_producto(10,100,31);
tabla.insertar_producto(2,300,22);
tabla.insertar_producto(9,400,7);
tabla.insertar_producto(81,500,4);
tabla.insertar_producto(12,600,2);
tabla.insertar_producto(90,700,4);
tabla.insertar_producto(181,800,41);
tabla.insertar_producto(10,1000,21);
tabla.recorrer();