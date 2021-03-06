class nodoavl{
    constructor(id,nombre,edad,correo,contra){
        this.id = id;
        this.nombre=nombre;
        this.edad=edad;
        this.correo=correo;
        this.contra=contra;
        this.izquierda = null;
        this.derecha = null;
        this.altura = 0;
        this.listaclientes=new listaClientes();
        this.listameses= new listaMeses();
    }
}

class avl{
    constructor(){
        this.raiz = null;
    }

    insertar(id,nombre,edad,correo,contra){
        let nuevo = new nodoavl(id,nombre,edad,correo,contra);
        if(this.raiz == null){
            this.raiz= nuevo;
        }else{
            this.raiz = this.insertar_nodo(this.raiz,nuevo);
        }
    }

    insertar_nodo(raiz_actual,nuevo){
        if(raiz_actual != null){
            if(raiz_actual.id > nuevo.id){
                raiz_actual.izquierda = this.insertar_nodo(raiz_actual.izquierda,nuevo);
                if(this.altura(raiz_actual.derecha)-this.altura(raiz_actual.izquierda)==-2){
                    if(nuevo.id < raiz_actual.izquierda.id){
                        raiz_actual = this.r_izquierda(raiz_actual);
                    }else{ //1 ROTACION IZQ-DERECHA
                        raiz_actual = this.r_izq_der(raiz_actual);
                    }
                }
            }else if(raiz_actual.id < nuevo.id){
                raiz_actual.derecha = this.insertar_nodo(raiz_actual.derecha,nuevo);
                if(this.altura(raiz_actual.derecha)-this.altura(raiz_actual.izquierda)==2){
                    if(nuevo.id > raiz_actual.derecha.id){ // 1 ROTACION DERECHA
                        raiz_actual=this.r_derecha(raiz_actual);
                    }else{//-1 ROTACION DERECHA izquierdaUIERDA
                        raiz_actual = this.r_der_izq(raiz_actual);
                    }
                }

            }else{
                console.log("Dato repetido");
            }
            raiz_actual.altura = this.altura_maxima(this.altura(raiz_actual.derecha),this.altura(raiz_actual.izquierda))+1;
            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            return raiz_actual;
        }
    }

    altura(nodo){
        if(nodo != null){
            return nodo.altura;
        }else{
            return -1;
        }
    }

    altura_maxima(h1,h2){
        if(h2>=h1){ 
            return h2;
        }else{
            return h1;
        }

    }
    //Rotacion simple izquierda
    r_izquierda(nodo){
        let aux = nodo.izquierda;
        nodo.izquierda= aux.derecha;
        aux.derecha = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.derecha),this.altura(nodo.izquierda)) +1;
        aux.altura = this.altura_maxima(nodo.altura.altura,this.altura(nodo.izquierda))+1;
        return aux;
    }
    
    //Rotacion simple derecha
    r_derecha(nodo){
        let aux = nodo.derecha;
        nodo.derecha= aux.izquierda;
        aux.izquierda = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.izquierda),this.altura(nodo.derecha)) +1;
        aux.altura = this.altura_maxima(nodo.altura.altura,this.altura(nodo.derecha))+1;
        return aux;
    }

    //Rotacion izq-der
    r_izq_der(nodo){
        nodo.izquierda = this.r_derecha(nodo.izquierda);
        let aux = this.r_izquierda(nodo);
        return aux;
    }

    //Rotacion der-izq
    r_der_izq(nodo){
        nodo.derecha = this.r_izquierda(nodo.derecha);
        let aux = this.r_derecha(nodo);
        return aux;
    }

    preorden(raiz_actual){
        if(raiz_actual != null){
            console.log(raiz_actual.id+" Nombre: "+raiz_actual.nombre);
            this.preorden(raiz_actual.izquierda);
            this.preorden(raiz_actual.derecha);
        }
    }

    inOrden(raiz_actual){
        if(raiz_actual != null){
            this.inOrden(raiz_actual.izquierda);
            console.log(raiz_actual.id+" Nombre: "+raiz_actual.nombre);
            raiz_actual.listaclientes.mostrar();
            console.log("--/Lista meses y calendario");
            raiz_actual.listameses.mostrar();
            this.inOrden(raiz_actual.derecha);
        }
    }

    postOrden(raiz_actual){
        if(raiz_actual != null){
            this.postOrden(raiz_actual.izquierda);
            this.postOrden(raiz_actual.derecha);
            console.log(raiz_actual.id+" Nombre: "+raiz_actual.nombre);
        }
    }
    /*Metodos para insertar en la lista doble clientes*/
    insertarCliente(raiz_actual,id,idcliente,nombre,correo){
        if(raiz_actual!=null){
            this.insertarCliente(raiz_actual.izquierda,id,idcliente,nombre,correo);
            //Parte de an??lisis
            if(raiz_actual.id==id){
                raiz_actual.listaclientes.insertarNewClient(idcliente,nombre,correo);
            }
            //FIN 
            this.insertarCliente(raiz_actual.derecha,id,idcliente,nombre,correo);
        }
    }

    /*Metodo de insertar en la lista meses un evento */
    insertarCalendario(raiz_actual,id,idmes,dia,hora,descripcion){
        var mes="";
        switch (idmes) {
            case 1:
                mes="Enero";
                break;
            case 2:
                mes="Febrero";
                break;
            case 3:
                mes="Marzo";
                break;
            case 4:
                mes="Abril";
                break;
            case 5:
                mes="Mayo";
                break;
            case 6: 
                mes="Junio";
                break;
            case 7:
                mes="Julio";
                break;
            case 8:
                mes="Agosto";
                break;
            case 9:
                mes="Septiembre";
                break;
            case 10:
                mes="Octubre";
                break;
            case 11:
                mes="Noviembre";
                break;
            case 12:
                mes="Diciembre";
                break;
            default:
                break;
        }

        if(raiz_actual!=null){
            this.insertarCalendario(raiz_actual.izquierda,id,idmes,dia,hora,descripcion);
            //Parte de an??lisis
            if(raiz_actual.id==id){
                raiz_actual.listameses.insertarEvento(idmes,mes,dia,hora,descripcion);
                //id,mes,dia,hora,descripcion
            }
            //FIN 
            this.insertarCalendario(raiz_actual.derecha,id,idmes,dia,hora,descripcion);
        }
    }
}
/* Inicia la parte de la programaci??n de la lista doble clientes*/
//-------------------------------------------------------------------------------------------------
class nodoclientes{
    constructor(id,nombre,correo){
        this.id=id;
        this.nombre=nombre;
        this.correo=correo;
        this.siguiente=null;
        this.anterior=null;
    }
}

class listaClientes{
    constructor(){
        this.primero=null;
        this.ultimo=null;
    }

    insertarNewClient(id,nombre,correo){
        let nuevo = new nodoclientes(id,nombre,correo);
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
        let actual = new nodoclientes(id)
        actual=this.primero;
        if (this.primero!=null){
            console.log("  Lista clientes:")
            while(actual!=null){
                console.log("  ->"+actual.id);
                actual=actual.siguiente;
            }
        }else{
            console.log("Lista vac??a")
        }
    }
    
    eliminar(id){
        let actual = new nodoclientes(id);
        actual=this.primero;
        let atras= new nodoclientes(id)
        atras=null;
        var encontrado=false;
        if (this.primero !=null){
            while(actual != null && encontrado != true){
                if(actual.id== id){
                    if (actual==this.primero){
                        this.primero=this.primero.siguiente;
                        this.primero.anterior=null;
                    }else if (actual==this.ultimo){
                        atras.siguiente=null;
                        this.ultimo=atras;
                    }else{
                        atras.siguiente=actual.siguiente;
                        actual.siguiente.anterior=atras;
                    }
                    encontrado=true;
                }
                atras=actual;
                actual=actual.siguiente;
            }
            if (!encontrado){
                console.log("Nodo no encontrado en la lista");
            }
        }else{
            console.log("Lista vac??a");
        }
    }
}
/* Termina la parte de la programacion lista doble clientes */
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
/* Inicia la parte de la programaci??n de la lista doble meses*/
class nodoMeses{
    constructor(id,mes){
        this.id=id;
        this.mes=mes;
        this.siguiente=null;
        this.anterior=null;
        this.calendario=new matriz();
    }
}

class listaMeses{
    constructor(){
        this.primero=null;
        this.ultimo=null;
    }

    insertarEvento(id,mes,dia,hora,descripcion){
        let nuevo = new nodoMeses(id,mes);
        //Revisar si existe el mes
        let rev=new nodoMeses(id,null);
        rev=this.primero;
        var existe=false;
        if (this.primero!=null){
            while(rev!=null){
                if(rev.id=id){
                    existe=true;
                    //Aqui va la inserci??n en la matriz de este lugar
                    rev.calendario.insertar(descripcion,dia,hora);
                }
                rev=rev.siguiente;
            }
        }
        if(existe==false){
            nuevo.calendario.insertar(descripcion,dia,hora);
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
    }

    mostrar(){
        let id="";
        let actual = new nodoMeses(id,"")
        actual=this.primero;
        if (this.primero!=null){
            while(actual!=null){
                console.log(" *-* "+actual.id+" Mes: "+actual.mes);
                actual.calendario.recorrer_matriz();
                actual=actual.siguiente;
            }
        }else{
            console.log("Lista vac??a")
        }
    }
}
/* Termina la parte de la programacion lista doble meses */
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
/* Inicia la parte de la programaci??n de la matriz*/
class nodo_interno{
    constructor(valor,x,y){
        this.valor = valor;
        this.x = x;
        this.y = y;
        //apuntadores
        this.sig = null;
        this.ant = null;

        this.arriba = null;
        this.abajo = null;
    }
}

class lista_interna{
    constructor(){
        this.primero = null;
    }

    insertar_x(valor, x,y){ //para las X usamos sig y ant, y el valor para compara y ordenar es Y
        let nuevo = new nodo_interno(valor,x,y);

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.y < this.primero.y){
                nuevo.sig = this.primero;
                this.primero.ant = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.y < aux.y){
                        nuevo.sig = aux;
                        nuevo.ant = aux.ant;
                        aux.ant.sig = nuevo;
                        aux.ant= nuevo;
                        break;
                    }else if(nuevo.x == aux.x && nuevo.y == aux.y){
                        console.log("La posicion ya esta ocupada-> "+nuevo.x+","+nuevo.y);
                        break;
                    }else{
                        if(aux.sig ==null){
                            aux.sig=nuevo;
                            nuevo.ant = aux;
                            break;
                        }else{
                            aux = aux.sig;
                        }
                    }
                }
            }
        }
    }

    insertar_y(valor, x,y){ //para las Y usamos arriba y abajo, y el valor para compara y ordenar es X
        let nuevo = new nodo_interno(valor,x,y);

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.x < this.primero.x){
                nuevo.abajo = this.primero;
                this.primero.arriba = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.x < aux.x){
                        nuevo.abajo = aux;
                        nuevo.arriba = aux.arriba;
                        aux.arriba.abajo = nuevo;
                        aux.arriba= nuevo;
                        break;
                    }else if(nuevo.x == aux.x && nuevo.y == aux.y){
                        console.log("La posicion ya esta ocupada-> "+nuevo.x+","+nuevo.y);
                        break;
                    }else{
                        if(aux.abajo ==null){
                            aux.abajo=nuevo;
                            nuevo.arriba = aux;
                            break;
                        }else{
                            aux = aux.abajo;
                        }
                    }
                }
            }
        }
    }

    recorrer_x(){
        let aux = this.primero;
        while(aux != null){
            console.log("valor =",aux.valor," - x = ",aux.x , " y = ",aux.y);
            aux = aux.sig;
        }
    }
    recorrer_y(){
        let aux = this.primero;
        while(aux != null){
            console.log("valor =",aux.valor," - x = ",aux.x , " y = ",aux.y);
            aux = aux.abajo;
        }
    }
}

//**************************** CABECERAS ************************/
class nodo_cabecera{
    constructor(dato){
        this.dato = dato;
        this.sig= null;
        this.ant = null;
        this.lista_interna = new lista_interna();
    }
}

class lista_cabecera{
    constructor(){
        this.primero = null;
    }

    insertar_cabecera(nuevo){

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.dato<this.primero.dato){
                nuevo.sig = this.primero;
                this.primero.ant=nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.dato < aux.dato){
                        nuevo.sig = aux;
                        nuevo.ant = aux.ant;
                        aux.ant.sig = nuevo;
                        aux.ant = nuevo;
                        break;
                    }else{
                        if(aux.sig == null){
                            aux.sig = nuevo;
                            nuevo.ant = aux;
                            break;
                        }else{
                            aux = aux.sig;
                        }
                    }
                }
            }
        }
    }

    buscar_cabecera(dato){
        let aux = this.primero;
        while(aux != null){
            if(aux.dato == dato){
                return aux;
            }else{
                aux = aux.sig;
            }
        }
        return null;
    }

    recorrer(){
        let aux = this.primero;
        while(aux != null){
            console.log("dato =",aux.dato);
            aux = aux.sig;
        }
    }
}

class matriz{
    constructor(){
        this.cabecetas_x = new lista_cabecera();
        this.cabecetas_y = new lista_cabecera();
    }
    insertar(valor,x,y){
        let nodo_cabecera_X = this.cabecetas_x.buscar_cabecera(x);
        let nodo_cabecera_y = this.cabecetas_y.buscar_cabecera(y);
        if(nodo_cabecera_X == null){
            nodo_cabecera_X =  new nodo_cabecera(x);
            this.cabecetas_x.insertar_cabecera(nodo_cabecera_X);
        }
        if(nodo_cabecera_y == null){
            nodo_cabecera_y =  new nodo_cabecera(y);
            this.cabecetas_y.insertar_cabecera(nodo_cabecera_y);
        }
        nodo_cabecera_X.lista_interna.insertar_x(valor,x,y);
        nodo_cabecera_y.lista_interna.insertar_y(valor,x,y);
    }
    recorrer_matriz(){
        console.log("cabeceras en X");
        let aux = this.cabecetas_x.primero;
        while(aux != null){
            console.log("   pos->"+aux.dato);
            let aux2 = aux.lista_interna.primero;
            while(aux2!= null){
                console.log("       -"+aux2.valor);
                aux2 = aux2.sig;
            }
            aux = aux.sig;
        }

        console.log("cabeceras en Y");
        aux = this.cabecetas_y.primero;
        while(aux != null){
            console.log("   pos->"+aux.dato);
            let aux2 = aux.lista_interna.primero;
            while(aux2!= null){
                console.log("       -"+aux2.valor);
                aux2 = aux2.abajo;
            }
            aux = aux.sig;
        }
    }
    /*
    graficar_matriz(){
        let cadena="";
        cadena+= "digraph Matriz{ \n";
        cadena+= "node[shape = box,width=0.7,height=0.7,fillcolor=\"azure2\" color=\"white\" style=\"filled\"];\n";
        cadena+= "edge[style = \"bold\"]; \n"
        //graficar el nodo matriz
        cadena+="node[label = Matriz fillcolor=\" darkolivegreen1\" pos = \"-1,1!\"]principal;"
        //graficar cabeceras X
        let aux_x = this.cabecetas_x.primero;
        while(aux_x!=null){
            cadena+="node[label = "+aux_x.dato+" fillcolor=\" azure1\" pos = \""+aux_x.dato+",1!\"]x"+aux_x.dato+";\n"
            aux_x = aux_x.sig;
        }
        aux_x = this.cabecetas_x.primero;
        while(aux_x.sig != null){
            cadena+="x"+aux_x.dato+"->"+"x"+aux_x.sig.dato+";\n"
            cadena+="x"+aux_x.sig.dato+"->"+"x"+aux_x.dato+";\n"
            aux_x = aux_x.sig;
        }

        if(this.cabecetas_x.primero!= null){
            cadena+="principal->x"+this.cabecetas_x.primero.dato+";\n";
        }
        //graficar cabeceras Y
        let aux_y = this.cabecetas_y.primero;
        while(aux_y!=null){
            cadena+="node[label = "+aux_y.dato+" fillcolor=\" azure1\" pos = \"-1,-"+aux_y.dato+"!\"]y"+aux_y.dato+";\n"
            aux_y = aux_y.sig;
        }
        aux_y = this.cabecetas_y.primero;
        while(aux_y.sig != null){
            cadena+="y"+aux_y.dato+"->"+"y"+aux_y.sig.dato+";\n"
            cadena+="y"+aux_y.sig.dato+"->"+"y"+aux_y.dato+";\n"
            aux_y = aux_y.sig;
        }

        if(this.cabecetas_x.primero!= null){
            cadena+="principal->y"+this.cabecetas_y.primero.dato+";\n";
        }
        //graficar nodos internos
        aux_x = this.cabecetas_x.primero;
        while(aux_x!=null){ //recorrer listas de x para graficar los nodos de sus lista interna
            let aux = aux_x.lista_interna.primero;
            while(aux!=null){
                cadena+="   node[label = "+aux.valor+" fillcolor=\" gold2\" pos = \""+aux.x+",-"+aux.y+"!\"]x"+aux.x+"y"+aux.y+";\n"
                aux = aux.sig;
            }

            //graficar flechitas
            aux = aux_x.lista_interna.primero;
            while(aux.sig!= null){
                cadena+="   x"+aux.x+"y"+aux.y+"->x"+aux.sig.x+"y"+aux.sig.y+";\n";
                cadena+="   x"+aux.sig.x+"y"+aux.sig.y+"->x"+aux.x+"y"+aux.y+";\n";
                aux= aux.sig;
            }
            if(aux_x.lista_interna.primero!= null){
                cadena+="x"+aux_x.dato+"->"+"x"+aux_x.lista_interna.primero.x+"y"+aux_x.lista_interna.primero.y+";\n";
            }

            aux_x = aux_x.sig;
        }

        aux_y = this.cabecetas_y.primero;
        while(aux_y!=null){ //recorrer la lista de y para graficar cada lista
            //graficar flechitas Y
            let aux = aux_y.lista_interna.primero;
            while(aux.abajo!= null){
                cadena+="   x"+aux.x+"y"+aux.y+"->x"+aux.abajo.x+"y"+aux.abajo.y+";\n";
                cadena+="   x"+aux.abajo.x+"y"+aux.abajo.y+"->x"+aux.x+"y"+aux.y+";\n";
                aux= aux.abajo;
            }
            if(aux_y.lista_interna.primero!= null){
                cadena+="y"+aux_y.dato+"->"+"x"+aux_y.lista_interna.primero.x+"y"+aux_y.lista_interna.primero.y+";\n";
            }
            aux_y = aux_y.sig;
        }

        cadena+= "\n}"
        console.log(cadena);
    }*/
}
/* Termina la parte de la programacion de la matriz  */
//-------------------------------------------------------------------------------------------------
//insertar(id,nombre,edad,correo,contra){
arbol = new avl();
arbol.insertar(30,"Julio Ramos",42,"brak_gmail.com","cpesg");
arbol.insertar(40,"Alberto del arco",23,"Eestup@gmail.com","d5fas6");
arbol.insertar(20,"Alan De leon",41,"pie@hotmail.com","daeah");
arbol.insertar(10,"Chuty",41,"pie@hotmail.com","daeah");
arbol.insertar(5,"Leo",41,"pie@hotmail.com","daeah");
arbol.insertar(70,"Ally",41,"pie@hotmail.com","daeah");
arbol.insertar(7,"Dustin Poirier",41,"pie@hotmail.com","daeah");
arbol.insertar(100,"Do Bronx",41,"pie@hotmail.com","daeah");
arbol.insertarCliente(arbol.raiz,40,23,"Luiz Miguel","luismi@yahoo.com");
arbol.insertarCliente(arbol.raiz,5,12,"Paquita","paco@gmail.com");
arbol.insertarCliente(arbol.raiz,5,15,"Myaan","pasd@hotmail.com");
arbol.insertarCalendario(arbol.raiz,70,2,22,16,"Prueba evento 1");
arbol.insertarCalendario(arbol.raiz,100,7,22,16,"Prueba evento 2");
arbol.insertarCalendario(arbol.raiz,20,10,22,16,"Prueba evento 3");
arbol.inOrden(arbol.raiz);