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

    obtenerAltura(raiz) {
        if (!raiz){
            return 0;
        }
        return raiz.altura;
    } 

    balancear(raiz){
        if (!raiz){
            return 0;
        }
        return this.obtenerAltura(raiz.izquierda)-this.obtenerAltura(raiz.derecha);
    }
    
}
