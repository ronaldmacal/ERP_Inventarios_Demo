/*
**********************************************************************************************
**********************************************************************************************
                            ESTRUCTURAS DE DATOS DEL PROYECTO
**********************************************************************************************
**********************************************************************************************
*/
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
            console.log("Encriptación: ");
            console.log("Correo: "+raiz_actual.correo);
            console.log("Password: "+raiz_actual.password);
            this.inOrden(raiz_actual.derecha);
        }
    }
    graficarClientes(raiz_actual,idempleado){
        if(raiz_actual!=null){
            this.graficarClientes(raiz_actual.izquierda,idempleado);
            //Parte de análisis
            if(raiz_actual.id==idempleado){
                raiz_actual.listaclientes.graphClientes();
            }
            //FIN 
            this.graficarClientes(raiz_actual.izquierda,idempleado);
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
            //Parte de análisis
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
            //Parte de análisis
            if(raiz_actual.id==id){
                raiz_actual.listameses.insertarEvento(idmes,mes,dia,hora,descripcion);
                //id,mes,dia,hora,descripcion
            }
            //FIN 
            this.insertarCalendario(raiz_actual.derecha,id,idmes,dia,hora,descripcion);
        }
    }
}
/* Inicia la parte de la programación de la lista doble clientes*/
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

    graphClientes(){
        let cadena="digraph G{";
        let actual = this.primero;
        if (this.primero!=null){
            while (actual != null){
                cadena+=actual.id+";\n";
                actual=actual.siguiente;
            }
            actual= this.primero;
            while (actual != null){
                cadena+=actual.id+"->"+actual.siguiente.id+";\n";
                cadena+=actual.siguiente.id+"->"+actual.id+";\n";
            }
            cadena+="}";
            document.body.innerHTML+=Viz(cadena,"svg");
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
            console.log("Lista vacía")
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
            console.log("Lista vacía");
        }
    }
}
/* Termina la parte de la programacion lista doble clientes */
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
/* Inicia la parte de la programación de la lista doble meses*/
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
                    //Aqui va la inserción en la matriz de este lugar
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
            console.log("Lista vacía")
        }
    }
}
/* Termina la parte de la programacion lista doble meses */
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
/* Inicia la parte de la programación de la matriz*/
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
}
/* Termina la parte de la programacion de la matriz  */
//-------------------------------------------------------------------------------------------------
class nodobinario{
    constructor(id,padre,nombre,direccion,telefono,correo){
        this.id=id;
        this.nombre=nombre;
        this.direccion=direccion;
        this.telefono=telefono;
        this.correo=correo;
        this.derecha=null;
        this.izquierda=null;
        this.padre=padre;
    }
}

class arbolbinario{
    constructor(){
        this.raiz=null;
    }

    insertar(id,nombre,direccion,telefono,correo){
        let nuevodato = new nodobinario(id,null,nombre,direccion,telefono,correo);
        let actual= new nodobinario(id,null,nombre,direccion,telefono,correo) 
        actual=this.raiz;//curr_node
        let nodo_padre=new nodobinario(id,null,nombre,direccion,telefono,correo);//parent_node
        if (this.raiz == null){
            this.raiz=nuevodato;
        }else{
            while (actual!=null){
                nodo_padre=actual;
                if (nuevodato.id < actual.id){
                    actual=actual.izquierda;
                }else{
                    actual=actual.derecha;
                }
            }
            if (nuevodato.id < nodo_padre.id){
                nodo_padre.izquierda=nuevodato;
            }else{
                nodo_padre.derecha=nuevodato;
            }
            nuevodato.padre=nodo_padre;
        }
    }

    mostrar(){
        let actual=this.raiz;
        this.inOrden(actual)
    }

    inOrden(actual){
        if (actual != null){
            this.inOrden(actual.izquierda);
            console.log(actual.id+" Nombre: "+actual.nombre);
            this.inOrden(actual.derecha);
        }
    }

    
    reasignar(node, nuevohijo){
        if(nuevohijo != null){
            nuevohijo.padre=node.padre;
        }
        if(node.padre != null){
            var paso=false;
            if(node == node.padre.derecha){
                paso=true;
            }
            if(paso){
                node.padre.derecha=nuevohijo;
            }else{
                node.padre.izquierda=nuevohijo;
            }
        }
    }
    eliminar(id){
        let actual=null;
        if(this.raiz != null){
            actual=this.raiz;
            while (actual != null && actual.id!=id){
                if (id < actual.id){
                    actual=actual.izquierda;
                }else{
                    actual=actual.derecha;
                }
            }
            if (actual!= null){
                if(actual.izquierda ==null && actual.derecha==null){
                    this.reasignar(actual,null);
                    actual=null;
                }else if(actual.izquierda == null && actual.derecha != null){
                    this.reasignar(actual,actual.derecha);
                }else if(actual.izquierda != null && actual.derecha == null){
                    this.reasignar(actual,actual.izquierda);
                }else{
                    let root=actual.izquierda;
                    let acurr=null;
                    if (root != null){
                        acurr=root;
                    }else{
                        acurr=this.raiz;
                    }
                    if(this.raiz!= null){
                        while(acurr.derecha !=null){
                            acurr=acurr.derecha;
                        }
                    }
                    this.eliminar(acurr.id);
                    actual.id=acurr.id;
                }
            }
        }
    }
}

/*
**********************************************************************************************
                           FIN ESTRUCTURAS DE DATOS DEL PROYECTO
**********************************************************************************************
*/

/*
**********************************************************************************************
**********************************************************************************************
                            INICIO DE PROGRAMACION ESTRUCTURAS
**********************************************************************************************
**********************************************************************************************
*/
/*
let arbol = new avl();
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
console.log("------------------------------------------------------");
let arbolb=new arbolbinario();
arbolb.insertar(45,"Ronald Macal","Villa Nueva","24421597","bark@hotmial.com");
arbolb.insertar(23,"Luis Perez","Villa Nueva","24421597","bark@hotmial.com");
arbolb.insertar(65,"Andre Gigant","Villa Nueva","24421597","bark@hotmial.com");
arbolb.insertar(2,"Pedro Alvarez","Villa Nueva","24421597","bark@hotmial.com");
arbolb.insertar(38,"Andres Cuttini","Villa Nueva","24421597","bark@hotmial.com");
arbolb.insertar(7,"Alan Alvarez","Villa Nueva","24421597","bark@hotmial.com");
arbolb.insertar(52,"Stefan GIlmore","Villa Nueva","24421597","bark@hotmial.com");
arbolb.insertar(96,"Tom Brady","Villa Nueva","24421597","bark@hotmial.com");
arbolb.insertar(48,"Xavi Hernandez","Villa Nueva","24421597","bark@hotmial.com");
arbolb.mostrar();
console.log("Eliminar");
arbolb.eliminar(7);
arbolb.eliminar(48);
arbolb.eliminar(23);
arbolb.mostrar();
*/
//Estructuras clave del proyecto
let avl_empleados = new avl();
let binario_proveedores=new arbolbinario();
let passCrypto;

function cargarSession(){
    var temp = CircularJSON.stringfy(avl_empleados);
    var temp2 = JSON.stringify(temp);
    sessionStorage.setItem("avl",temp2);
    var temp = CircularJSON.stringfy(binario_proveedores);
    var temp2 = JSON.stringfy(temp);
    sessionStorage.setItem("binario",temp2);
}

function ingresarapp(){
    let user=document.getElementById('usuario').value;
    let contra=document.getElementById('contrasena').value;
    if(user=="Admin" && contra=="1234"){
        /*var temp = CircularJSON.stringfy(avl_empleados);
        var temp2 = JSON.stringify(temp);
        sessionStorage.setItem("avl",temp2);
        var temp = CircularJSON.stringfy(binario_proveedores);
        var temp2 = JSON.stringfy(temp);
        sessionStorage.setItem("binario",temp2);*/
        location.href="../docs/administrador.html";
    }else{
        sessionStorage.setItem("usuario",44);
        console.log("Empleado intentando ingresar");
    }
}
function recuperar_estructuras(){
    var tem = JSON.parse(sessionStorage.getItem("avl"));
    avl_empleados = new avl();
    tem = CircularJSON.parse(tem);
    Object.assign(avl_empleados,tem);
    var temp = JSON.parse(sessionStorage.getItem("binario"));
    binario_proveedores = new arbolbinario();
    temp = CircularJSON.parse(temp);
    Object.assign(binario_proveedores,temp);
}

function cierraAdmin() {
    cargarSession();
    location.href="../docs/index.html";
}
/*--------------------------------------------------------------------------------
**********************************************************************************
                     Reg/Eliminar Empelado y Proveedor
**********************************************************************************
----------------------------------------------------------------------------------
*/
function nuevoempleado(){
    let idem= document.getElementById('idempleado').value;
    let nomem= document.getElementById('nombreempleado').value;
    let edadem= document.getElementById('edadempleado').value;
    let correoem= document.getElementById('correoempleado').value;
    let contraem= document.getElementById('contraempleado').value;
    //arbol.insertar(30,"Julio Ramos",42,"brak_gmail.com","cpesg");
    /*const myString = 'Hello';
    console.log(myString);
    const myBitArray = sjcl.hash.sha256.hash(myString)
    const myHash = sjcl.codec.hex.fromBits(myBitArray)
    console.log(myHash);*/
    const correoEn = sjcl.hash.sha256.hash(correoem);
    const contraEn = sjcl.hash.sha256.hash(contraem);
    const hashCorreo = sjcl.codec.hex.fromBits(correoEn);
    const hashContra = sjcl.codec.hex.fromBits(contraEn);
    avl_empleados.insertar(idem,nomem,edadem,hashCorreo,hashContra);
    console.log("*--> Pass: "+passCrypto);
    alert("Nuevo empleado registrado");
    avl_empleados.inOrden(avl_empleados.raiz);
}
function nuevoproveedor(){
    let idprov = document.getElementById('idproveedor').value;
    let nombreprov = document.getElementById('nombreproveedor').value;
    let dirprov = document.getElementById('direccionproveedor').value;
    let telefonoprov = document.getElementById('telefonoproveedor').value;
    let correoprov = document.getElementById('correoproveedor').value;
    binario_proveedores.insertar(idprov,nombreprov,dirprov,telefonoprov,correoprov);
    alert("Nuevo proveedor registrado.");
    binario_proveedores.mostrar();
}
function limpiarregempelado(){
    document.getElementById('idempleado').value="";
    document.getElementById('nombreempleado').value="";
    document.getElementById('edadempleado').value="";
    document.getElementById('correoempleado').value="";
    document.getElementById('contraempleado').value="";
}
function limpiarregproveedor(){
    document.getElementById('idproveedor').value="";
    document.getElementById('nombreproveedor').value="";
    document.getElementById('direccionproveedor').value="";
    document.getElementById('telefonoproveedor').value="";
    document.getElementById('correoproveedor').value="";
}
function eliminarempleado(){
    avl_empleados.inOrden(avl_empleados.raiz);
}
function eliminarproveedor(){
    let idproveedor = document.getElementById('idproveedordelete').value;
    binario_proveedores.eliminar(idproveedor);
    alert("Provedor: "+idproveedor+" eliminado");
    binario_proveedores.mostrar();
}
/*--------------------------------------------------------------------------------
**********************************************************************************
                                Carga masiva
**********************************************************************************
----------------------------------------------------------------------------------
*/
function cargaproveedores(){
    var upload = document.getElementById('archivo');
    var reader = new FileReader();
    reader.addEventListener('load',function(){
        var result = JSON.parse(reader.result);
        for (let i in result.proveedores){
            binario_proveedores.insertar(result.proveedores[i].id,result.proveedores[i].nombre,result.proveedores[i].direccion,result.proveedores[i].telefono,result.proveedores[i].correo);
            binario_proveedores.mostrar();
        }
    });
    reader.readAsText(upload.files[0]);
    alert("Carga masiva de proveedores hecha con éxito.");
}
function cargaempleados(){
    passCrypto= document.getElementById('contraencriptar');
    var upload = document.getElementById('archivo');
    var reader = new FileReader();
    reader.addEventListener('load',function(){
        var result = JSON.parse(reader.result);
        for (let i in result.vendedores){
            //arbol.insertar(30,"Julio Ramos",42,"brak_gmail.com","cpesg");
            const correoEn = sjcl.hash.sha256.hash(result.vendedores[i].correo);
            const contraEn = sjcl.hash.sha256.hash(result.vendedores[i].password);
            const hashCorreo = sjcl.codec.hex.fromBits(correoEn);
            const hashContra = sjcl.codec.hex.fromBits(contraEn);
            avl_empleados.insertar(result.vendedores[i].id,result.vendedores[i].nombre,result.vendedores[i].edad,hashCorreo,hashContra);
        }
    });
    reader.readAsText(upload.files[0]);
    alert("Carga masiva de empleados hecha con éxito.");
}
function cargaclientes(){
    var upload = document.getElementById('archivo');
    var reader = new FileReader();
    reader.addEventListener('load',function(){
        var result = JSON.parse(reader.result);
        for (let i in result.vendedores){ 
            var idempleado=result.vendedores[i].id;
            for (let x in result.vendedores[i].clientes){
                //arbol.insertarCliente(arbol.raiz,40,23,"Luiz Miguel","luismi@yahoo.com");
                avl_empleados.insertarCliente(avl_empleados.raiz,idempleado,result.vendedores[i].clientes[x].id,result.vendedores[i].clientes[x].nombre,result.vendedores[i].clientes[x].correo);
            }
        }
    });
    reader.readAsText(upload.files[0]);
    alert("Carga masiva de clientes para empleados hecha con éxito.");
}
function cargaeventos(){
    var upload = document.getElementById('archivo');
    var reader = new FileReader();
    reader.addEventListener('load',function(){
        var result = JSON.parse(reader.result);
        //arbol.insertarCalendario(arbol.raiz,20,10,22,16,"Prueba evento 3");
        for (let i in result.vendedores){   
            var idempleado=result.vendedores[i].id;
            for (let x in result.vendedores[i].eventos){
                avl_empleados.insertarCalendario(avl_empleados.raiz,idempleado,result.vendedores[i].eventos[x].mes,result.vendedores[i].eventos[x].dia,result.vendedores[i].eventos[x].hora,result.vendedores[i].eventos[x].desc);
            }
        }
    });
    reader.readAsText(upload.files[0]);
    alert("Carga masiva de eventos para empleados hecha con éxito.");
}
/*--------------------------------------------------------------------------------
**********************************************************************************
                                  Reportes
**********************************************************************************
----------------------------------------------------------------------------------
*/
function repoavl(){
//3
}
function repolistadoble(){
    let idempleado=document.getElementById('repoidempleadolista').value;
    avl_empleados.graficarClientes(avl_empleados.raiz,idempleado);
}
function repocalendario(){
//4
}
function repoproveedores(){
//2
}
/*--------------------------------------------------------------------------------
**********************************************************************************
                                  Empleado
**********************************************************************************
----------------------------------------------------------------------------------
*/
function nuevocliente(){
    //arbol.insertarCliente(arbol.raiz,40,23,"Luiz Miguel","luismi@yahoo.com");
    let idempleado = sessionStorage.getItem('usuario');
    avl_empleados.insertarCliente(avl_empleados.raiz,idempleado,document.getElementById('idcliente').value,document.getElementById('nombrecliente').value,document.getElementById('correocliente').value);
    alert("Nuevo cliente registrado");
}
function eliminarcliente(){
    let idempleado = sessionStorage.getItem('usuario');
    //Pendiente
}
function agregarCalentarioEmpleado(){
    let idempleado = sessionStorage.getItem('usuario');
    avl_empleados.insertarCalendario(avl_empleados.raiz,idempleado,document.getElementById('mesevento').value,document.getElementById('diaevento').value,document.getElementById('horaevento').value,document.getElementById('descevento').value);
    alert("Evento agregado a su calendario");
}

/**********************************************************************************************/
/******************************************  Fase 2 *******************************************/
/**********************************************************************************************/
//Parte para encriptar los datos almacenados en el AVL.
function cryptoavl(){
    avl_empleados.inOrden(avl_empleados.raiz);
}