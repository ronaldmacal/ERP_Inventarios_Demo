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

let bloquesDatos = new BlockChain();
bloquesDatos.agregarBlock(new Block(1,"04/01/2022::12:27:30",{amount: 48},"0000",0));
bloquesDatos.agregarBlock(new Block(2,"04/01/2022::12:29:40",{amount: 12},"0000",1));
console.log(JSON.stringify(bloquesDatos, null, 4));

