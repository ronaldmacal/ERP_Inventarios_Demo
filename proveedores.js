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
        console.log("raiz: "+this.raiz.id);
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
let arbol=new arbolbinario();
arbol.insertar(45,"Ronald Macal","Villa Nueva","24421597","bark@hotmial.com");
arbol.insertar(23,"Luis Perez","Villa Nueva","24421597","bark@hotmial.com");
arbol.insertar(65,"Andre Gigant","Villa Nueva","24421597","bark@hotmial.com");
arbol.insertar(2,"Pedro Alvarez","Villa Nueva","24421597","bark@hotmial.com");
arbol.insertar(38,"Andres Cuttini","Villa Nueva","24421597","bark@hotmial.com");
arbol.insertar(7,"Alan Alvarez","Villa Nueva","24421597","bark@hotmial.com");
arbol.insertar(52,"Stefan GIlmore","Villa Nueva","24421597","bark@hotmial.com");
arbol.insertar(96,"Tom Brady","Villa Nueva","24421597","bark@hotmial.com");
arbol.insertar(48,"Xavi Hernandez","Villa Nueva","24421597","bark@hotmial.com");
arbol.mostrar();
console.log("Eliminar");
arbol.eliminar(7);
arbol.eliminar(48);
arbol.eliminar(23);
arbol.mostrar();
*/
