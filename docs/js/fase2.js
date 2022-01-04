/*
**********************************************************************************************
**********************************************************************************************
                            ESTRUCTURAS DE DATOS FASE 2
**********************************************************************************************
**********************************************************************************************
*/
/**********************************************************************************************/
/************************************  Arbol B Orden 5 ****************************************/
/**********************************************************************************************/
class nodoB{
    constructor(id,nombre,precio,cantidad){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.cantidad=cantidad;
        this.siguiente = null; //Apuntador dentro de la pagina
        this.anterior = null;
        this.izq = null; //Apuntadores a las paginas
        this.der = null;
    }
}

class lista_nodoB{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size=0;
    }
    insertar(nuevo){
        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
            this.size++;
            return true;
        }else{
            if(this.primero == this.ultimo){
                if(nuevo.id < this.primero.id){
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    //cambiar punteros de paginas
                    this.primero.izq = nuevo.der;
                    this.primero = nuevo;
                    this.size++;
                    return true;
                }else if(nuevo.id> this.ultimo.id){
                    this.ultimo.siguiente = nuevo;
                    nuevo.anterior = this.ultimo;
                    //cambiar punteros de paginas
                    this.ultimo.der = nuevo.izq;
                    this.ultimo = nuevo;
                    this.size++;
                    return true;
                }else{ 
                    console.log("Ya existe un dato con ese valor en la lista");
                    return false;
                }
            }else{ 
                if(nuevo.id < this.primero.id){
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    //cambiar punteros de paginas
                    this.primero.izq = nuevo.der;
                    this.primero = nuevo;
                    this.size++;
                    return true;
                }else if(nuevo.id> this.ultimo.id){
                    this.ultimo.siguiente = nuevo;
                    nuevo.anterior = this.ultimo;
                    //cambiar punteros de paginas
                    this.ultimo.der = nuevo.izq;
                    this.ultimo = nuevo;
                    this.size++;
                    return true;
                }else{
                    let aux = this.primero;
                    while(aux != null){
                        if(nuevo.id < aux.id){
                            nuevo.siguiente = aux;
                            nuevo.anterior = aux.anterior;
                            aux.izq= nuevo.der;
                            aux.anterior.der = nuevo.izq;
                            aux.anterior.siguiente = nuevo;
                            aux.anterior = nuevo;
                            this.size++;
                            return true;
                        }else if(nuevo.id == aux.id){
                            console.log("Ya existe un dato con ese valor en la lista");
                            return false;
                        }else{
                            aux = aux.siguiente;
                        }
                    }
                }
            }
        }
    }
}
/****************** Pagina del arbol B ************************/
class pagina{
    constructor(){
        this.raiz = false;
        this.claves_max = 4;
        this.claves_min = 2;
        this.size =0;
        this.claves = new lista_nodoB();
    }
    insertar_EnPagina(nodo){
        if(this.claves.insertar(nodo)){
            this.size = this.claves.size;
            if(this.size < 5){
                return this;
            }else if(this.size == 5){ //dividir pagina
                return this.dividir_pagina(this);
            }
        }
        return null;
    }

    dividir_pagina(pag){
        let temp = pag.claves.primero;
        for(var i=0; i<2;i++){ //ubicarnos en la posicion [2] de la lista (mitad)
            temp = temp.siguiente;
        }

        //pasar valores de la pagina a nodos independientes
        let primero = pag.claves.primero;
        let segundo = pag.claves.primero.siguiente;
        let tercero = temp.siguiente;
        let cuarto = pag.claves.ultimo;

        primero.siguiente = null;
        primero.anterior = null;

        segundo.siguiente = null;
        segundo.anterior = null;

        tercero.siguiente = null;
        tercero.anterior = null;

        cuarto.siguiente = null;
        cuarto.anterior = null;

        temp.siguiente = null;
        temp.anterior = null;

        //** crear nuevas paginas */
        let pag_izquierda = new pagina();
        pag_izquierda.insertar_EnPagina(primero);
        pag_izquierda.insertar_EnPagina(segundo);

        let pag_dercha = new pagina();
        pag_dercha.insertar_EnPagina(tercero);
        pag_dercha.insertar_EnPagina(cuarto);

        temp.izq = pag_izquierda;
        temp.der = pag_dercha;

        return temp;
    }

    es_hoja(pag){
        if(pag.claves.primero.izq==null){
            return true;
        }else{
            return false;
        }
    }
}
/************************** Arbol B ***************************/
class Arbol_B{
    constructor(){
        this.raiz = null;
        this.orden =5;
        this.altura =0;
    }

    insertar_nodo(dato,nombre,precio,cantidad){
        let nuevo = new nodoB(dato,nombre,precio,cantidad);
        
        if(this.raiz == null){
            this.raiz = new pagina();
            this.raiz.raiz = true;
            this.raiz = this.raiz.insertar_EnPagina(nuevo);
            //console.log("se inserto el valor "+this.raiz.claves.primero.dato);
        }else{
            if(this.altura==0){
                let respuesta = this.raiz.insertar_EnPagina(nuevo);
                if(respuesta instanceof pagina){// la raiz no se dividio
                    this.raiz = respuesta;
                }else{
                    this.altura++;
                    this.raiz = new pagina();
                    this.raiz = this.raiz.insertar_EnPagina(respuesta);
                }
            }else{ // ya existe mas de una pagina, hay que recorrer el arbol para insertar el nuevo
                if(this.raiz == null){
                    console.log("la raiz es null ")
                    return;
                }   
                let respuesta = this.insertar_recorrer(nuevo,this.raiz);
                if(respuesta instanceof nodoB){ // la raiz se dividio
                    this.altura++;
                    this.raiz = new pagina();
                    this.raiz = this.raiz.insertar_EnPagina(respuesta);
                }else if(respuesta instanceof pagina){
                    this.raiz = respuesta;
                }
            }
        }
    }

    insertar_recorrer(nuevo, pagina_actual){
        if(pagina_actual.es_hoja(pagina_actual)){
            let respuesta = pagina_actual.insertar_EnPagina(nuevo);
            return respuesta;
        }else{
            if(nuevo.id < pagina_actual.claves.primero.id){ // va a la izquierda
                let respuesta = this.insertar_recorrer(nuevo,pagina_actual.claves.primero.izq);
                if(respuesta instanceof nodoB){ // la pagina se dividio y el nodo se tiene que insertar en la pagina actual
                    return pagina_actual.insertar_EnPagina(respuesta);
                }else if(respuesta instanceof pagina){
                    pagina_actual.claves.primero.izq = respuesta;
                    return pagina_actual;
                }
            }else if(nuevo.id > pagina_actual.claves.ultimo.id){ // va a la derecha porque es mayor al ultimo
                let respuesta = this.insertar_recorrer(nuevo,pagina_actual.claves.ultimo.der);
                if(respuesta instanceof nodoB){ // la pagina se dividio y el nodo se tiene que insertar en la pagina actual
                    return pagina_actual.insertar_EnPagina(respuesta);
                }else if(respuesta instanceof pagina){
                    pagina_actual.claves.ultimo.der = respuesta;
                    return pagina_actual;
                }
            }else{ // va en los apuntadores de los nodos de en medio
                let aux = pagina_actual.claves.primero;

                while(aux != null){
                    if(nuevo.id < aux.id){
                        let respuesta = this.insertar_recorrer(nuevo, aux.izq);
                        if(respuesta instanceof nodoB){ // la pagina se dividio y el nodo se tiene que insertar en la pagina actual
                            return pagina_actual.insertar_EnPagina(respuesta);
                        }else if(respuesta instanceof pagina){
                            aux.izq = respuesta;
                            aux.anterior.der = respuesta;
                            return pagina_actual;
                        }
                    }else if(nuevo.id == aux.id){
                        return pagina_actual;
                    }else{
                        aux = aux.siguiente;
                    }
                }
            }
        }
        return this;
    }

    graficar(){
        let cadena="digraph arbolB{\n";
        cadena+="rankr=TB;\n";
        cadena+="node[shape = box,fillcolor=\"azure2\" color=\"black\" style=\"filled\"];\n";
        //metodos para graficar el arbol
        cadena+= this.graficar_nodos(this.raiz);
        cadena+=  this.graficar_enlaces(this.raiz);
        cadena+="}\n"

        return cadena;
    }

    graficar_nodos(raiz_actual){
        let cadena="";

        if(raiz_actual.es_hoja(raiz_actual)){ //si es un hhoja solo grafica el nodo
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.id+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.claves.primero.id+";\n";
            return cadena;
        }else{
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.id+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.claves.primero.id+";\n";

            //recorrer los hicos de cada clave
            aux = raiz_actual.claves.primero;
            while(aux != null){
                cadena+= this.graficar_nodos(aux.izq);
                aux = aux.siguiente;
            }
            cadena+= this.graficar_nodos(raiz_actual.claves.ultimo.der);
            return cadena;
        }   
    }

    graficar_enlaces(raiz_actual){
        let cadena="";
        if(raiz_actual.es_hoja(raiz_actual)){
            return ""+raiz_actual.claves.primero.id+";\n";
        }else{
            //cadena += ""+raiz_actual.claves.primero.dato+";\n";
            let aux = raiz_actual.claves.primero;
            let contador =0;
            let raiz_actual_txt = raiz_actual.claves.primero.id;
            while(aux != null){
                cadena+= "\n"+raiz_actual_txt+":p"+contador+"->"+this.graficar_enlaces(aux.izq);
                contador++;
                aux = aux.siguiente;
            }
            cadena+="\n"+raiz_actual_txt+":p"+contador+"->"+this.graficar_enlaces(raiz_actual.claves.ultimo.der);
            return cadena;
        }
    }
}
/**********************************************************************************************/
/***************************************  Tabla Hash ******************************************/
/**********************************************************************************************/
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
/**********************************************************************************************/
/******************************************  Grafos *******************************************/
/**********************************************************************************************/
class nodo{
    constructor(id){
        this.id = id;
        this.siguiente = null;
        this.anterior = null;
        this.ponderacion=0;
        this.adyasentes = new lista_adyasentes();
    }
}

class lista_adyasentes{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertar(id,p){
        let nuevo = new nodo(id);
        nuevo.ponderacion = p;
        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
        }else{
            if(this.primero == this.ultimo){
                this.primero.siguiente = nuevo;
                nuevo.anterior = this.primero;
                this.ultimo = nuevo;
            }else{
                nuevo.anterior = this.ultimo;
                this.ultimo.siguiente = nuevo;
                this.ultimo= nuevo;
            }
        }
    }
}

class grafo{
    constructor(){
        this.primero= null;
        this.ultimo = null;
    }

    insertar(id){
        let nuevo = new nodo(id);

        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
        }else{
            if(this.primero == this.ultimo){
                this.primero.siguiente = nuevo;
                nuevo.anterior = this.primero;
                this.ultimo = nuevo;
            }else{
                nuevo.anterior = this.ultimo;
                this.ultimo.siguiente = nuevo;
                this.ultimo= nuevo;
            }
        }
    }

    buscar(id){
        let aux = this.primero;
        while(aux != null){
            if(aux.id == id){
                return aux;
            }else{
                aux = aux.siguiente;
            }
        }
        return null;
    }

    agregar_adyacente(id, id_adyacente,ponderacion){
        let principal = this.buscar(id);

        if(principal != null){
            principal.adyasentes.insertar(id_adyacente,ponderacion);
        }else{
            console.log("no existe el nodo origen")
        }
    }

    mostrar(){
        let aux = this.primero;
        while(aux != null){
            console.log("-> "+aux.id);
            let aux2 = aux.adyasentes.primero;
            while(aux2 != null){
                console.log("   -"+aux2.id);
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
    }

    graficar(){
        let cadena= "digraph grafo {\n rankdir=\"LR\" \n"
        let aux = this.primero;
        while(aux != null){
            cadena+="n"+aux.id+"[label= \""+aux.id+"\"];\n"
            aux = aux.siguiente;
        }
        aux = this.primero;
        while(aux != null){
            let aux2 = aux.adyasentes.primero;
            while(aux2 != null){
                cadena+= "n"+aux.id+" -> n"+aux2.id+" [label=\""+aux2.ponderacion+"km\"]; \n";
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
        cadena += "}"
        console.log(cadena);
    }
}
/**********************************************************************************************/
/****************************************  Blockchain *****************************************/
/**********************************************************************************************/
const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timestamp,data,nonce,previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.nonce=nonce;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + this.data + this.nonce);
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.bloquedeInicio()];
    }

    bloquedeInicio(){//DD-MM-YY::HH:MM::SS
        return new Block(0,"01/01/2022::11:20:01","Inicio","0000","0");
    }
    
    ultimoBlock(){
        return this.chain[this.chain.length -1];
    }

    agregarBlock(newBlock){
        newBlock.previousHash=this.ultimoBlock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i=1; i>this.chain.length;i++){
            const actual=this.chain[i];
            const previo=this.chain[i-1];
            if (actual.hash !== actual.calculateHash()){
                return false;
            }

            if(actual.previo !== previo.hash){
                return false;
            }
        }
        return true;
    }
}


/**********************************************************************************************/
/************************************  Programación Fase 2 ************************************/
/**********************************************************************************************/
let ventasHash = new hash();
let arbolProductos = new Arbol_B();
let grafoRutas = new grafo();
let bloqueChain = new BlockChain();
