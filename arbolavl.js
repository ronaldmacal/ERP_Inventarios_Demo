class nodo{
    constructor(dato){
        this.dato = dato;
        this.izquierda = null;
        this.derecha = null;
        this.altura = 1;
    }
}

class avlArbol{
    constructor(){
        this.raiz=null;
    }

    //Funcion para obetner la altura de la raiz
    obtenerAltura(raiz) {
        if (!raiz){
            return 0;
        }
        return raiz.altura;
    } 

    //Funcion que realiza la resta
    balancear(raiz){
        if (!raiz){
            return 0;
        }
        return this.obtenerAltura(raiz.izquierda)-this.obtenerAltura(raiz.derecha);
    }

    //Funcion que busca el último nodo del arbol
    nodoMinimo(raiz){
        if (raiz==null || raiz.izquierda == null){
            return raiz;
        }
        return this.nodoMinimo(raiz.izquierda);
    }

    //Rotacion por la izquierda
    rotarIzquierda(pivote){
        let y=pivote.derecha;
        let x=y.izquierda;
        y.izquierda=pivote;
        pivote.derecha=x;
        pivote.altura=1 + Math.max(this.obtenerAltura(pivote.izquierda),this.obtenerAltura(pivote.derecha));
        y.altura=1 + Math.max(this.obtenerAltura(y.izquierda),this.obtenerAltura(y.derecha));
        return y;
    }

    //Rotación por la derecha
    rotarDerecha(pivote){
        let y=pivote.izquierda;
        let x=y.derecha;
        y.derecha=pivote;
        pivote.izquierda=x;
        pivote.altura=1 + Math.max(this.obtenerAltura(pivote.izquierda),this.obtenerAltura(pivote.derecha));
        y.altura=1 + Math.max(this.obtenerAltura(y.izquierda),this.obtenerAltura(y.derecha));
        return y;
    }

    insertar(dato){
        if (this.raiz==null){
            let nuevonodo=new nodo(dato);
            this.raiz=nuevonodo;
        }else if (dato < this.raiz.carnet){
            this.raiz.izquierda=this.insertar(this.raiz.izquierda,dato)
        }

    }

}
