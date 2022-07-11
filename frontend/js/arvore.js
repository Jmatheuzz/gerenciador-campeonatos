class No{
    constructor(data, esquerda = null, direita = null){
        this.data = data;
        this.esquerda = esquerda;
        this.direita = direita;
    }
}

class ArvoreBuscaBinaria{
    constructor(root = null){
        this.root = null;
    }

    Insercao(data){
        let novoNo = new No(data);
        
        if (this.root === null){
            this.root = novoNo;
        } else {
            this.InserirNo(this.root, novoNo);
            this.root = this.balanceamento(this.root);
        }
    }

    InserirNo(no, novoNo){
        if (novoNo.data < no.data){
            if (no.esquerda === null){
                no.esquerda = novoNo;
            } else {
                this.InserirNo(no.esquerda, novoNo);
            }
        } else {
            if (no.direita === null){
                no.direita = novoNo;
            } else {
                this.InserirNo(no.direita, novoNo);
            }
        }
    }

    EncontrarNoRaiz(){
        return this.root;
    }

    PreOrdem(no){
        if (no !== null){
            console.log(no.data);
            this.PreOrdem(no.esquerda);
            this.PreOrdem(no.direita);
        }
    }

    altura(no){
        let altEsq = 0, altDir = 0
        if(no === null){
            return 0;
        }else{
            altEsq = this.altura(no.esquerda);
            altDir = this.altura(no.direita);

            if(altEsq > altDir){
                return 1 + altEsq;
            }else{
                return 1 + altDir;
            }
        }
    }

    fatorBalanceamento(no){
        return (this.altura(no.esquerda)) - this.altura(no.direita);
    }

    rotacaoSimplesEsquerda(no){
        let aux = no.direita;
        no.direita = aux.esquerda;
        aux.esquerda = no;
        no = aux;
        return no;
    }
    rotacaoSimplesDireita(no){
        let aux = no.esquerda;
        no.esquerda = aux.direita;
        aux.direita = no;
        no = aux;
        return no;
    }

    balanceioDireita(no){
        let fatorB = this.fatorBalanceamento(no.direita);
        if(fatorB<0){
            return rotacaoSimplesEsquerda(no);
        }else{
            if(fatorB>0){
                no.direita = this.rotacaoSimplesDireita(no.direita);
                no = this.rotacaoSimplesEsquerda(no);
                return no;
            }
        }
        return altura;
    }

    balanceioEsquerda(no){
        let fatorB = this.fatorBalanceamento(no.esquerda);
        if(fatorB>0){
            return this.rotacaoSimplesDireita(no);
        }else{
            if(fatorB<0){
                no.esquerda = this.rotacaoSimplesEsquerda(no.esquerda);
                no = this.rotacaoSimplesDireita(no);
                return no;

            }
        }
        return no;
    }

    balanceamento(no){
        let fatorB = this.fatorBalanceamento(no);
        if(fatorB>1){
            return this.balanceioEsquerda(no);
        }else{
            if(fatorB<-1){
                return this.balanceioDireita(no);
            }
        }
        return no;
    }
}

let arvoreBinaria = new ArvoreBuscaBinaria();
arvoreBinaria.Insercao(20);
arvoreBinaria.Insercao(19);
arvoreBinaria.Insercao(10);
arvoreBinaria.Insercao(51);
arvoreBinaria.Insercao(5);
arvoreBinaria.Insercao(4);
arvoreBinaria.Insercao(2);
const raiz = arvoreBinaria.EncontrarNoRaiz();
const altura = arvoreBinaria.altura(raiz);
const fatorB = arvoreBinaria.fatorBalanceamento(raiz);
console.log(altura);

arvoreBinaria.PreOrdem(raiz);


export default ArvoreBuscaBinaria;