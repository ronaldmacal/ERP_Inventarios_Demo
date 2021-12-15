class nodo{
    constructor(dato,padre){
        this.dato=dato;
        this.derecha=null;
        this.izquierda=null;
        this.padre=padre;
    }
}

class arbolbinario{
    constructor(){
        this.raiz=null;
    }

    insertar(dato){
        let nuevodato = new nodo(dato,null);
        let actual= new nodo(dato,null) 
        actual=this.raiz;//curr_node
        let nodo_padre=new nodo(dato,null);//parent_node
        if (this.raiz == null){
            this.raiz=nuevodato;
        }else{
            while (actual!=null){
                nodo_padre=actual;
                if (nuevodato.dato < actual.dato){
                    actual=actual.izquierda;
                }else{
                    actual=actual.derecha;
                }
            }
            if (nuevodato.dato < nodo_padre.dato){
                nodo_padre.izquierda=nuevodato;
            }else{
                nodo_padre.derecha=nuevodato;
            }
            nuevodato.padre=nodo_padre;
        }
    }

    mostrar(){
        let actual=this.raiz;
        console.log("raiz: "+this.raiz.dato);
        this.inOrden(actual)
    }

    inOrden(actual){
        if (actual != null){
            this.inOrden(actual.izquierda);
            console.log(actual.dato);
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
    eliminar(dato){
        let actual=null;
        if(this.raiz != null){
            actual=this.raiz;
            while (actual != null && actual.dato!=dato){
                if (dato < actual.dato){
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
                    this.eliminar(acurr.dato);
                    actual.dato=acurr.dato;
                }
            }
        }
    }
}
/*
let arbol=new arbolbinario();
arbol.insertar(45);
arbol.insertar(23);
arbol.insertar(65);
arbol.insertar(2);
arbol.insertar(38);
arbol.insertar(7);
arbol.insertar(52);
arbol.insertar(96);
arbol.insertar(48);
arbol.mostrar();
console.log("Eliminar");
arbol.eliminar(7);
arbol.eliminar(48);
arbol.eliminar(23);
arbol.mostrar();

*/
