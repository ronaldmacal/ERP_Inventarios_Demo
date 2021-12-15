class nodo{
    constructor(dato){
        this.dato=dato;
        this.siguiente=null;
        this.anterior=null;
        this.listadoble= new listaDoble();
    }
}

class listaDoble{
    constructor(){
        this.primero=null;
        this.ultimo=null;
    }

    insertar(dato){
        let nuevo = new nodo(dato);
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
        let dato="";
        let actual = new nodo(dato)
        actual=this.primero;
        if (this.primero!=null){
            while(actual!=null){
                console.log(actual.dato);
                actual=actual.siguiente;
            }
        }else{
            console.log("Lista vacía")
        }
    }
    
    eliminar(dato){
        let actual = new nodo(dato);
        actual=this.primero;
        let atras= new nodo(dato)
        atras=null;
        var encontrado=false;
        if (this.primero !=null){
            while(actual != null && encontrado != true){
                if(actual.dato== dato){
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
/*
let lista = new listaDoble();
lista.insertar(3);
lista.insertar(8);
lista.insertar(9);
lista.insertar(4);
lista.insertar(1);
lista.mostrar();
console.log("Next");
lista.eliminar(3);
lista.eliminar(1);
lista.eliminar(9);
lista.mostrar();
*/