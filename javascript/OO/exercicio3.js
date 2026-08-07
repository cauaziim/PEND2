// CLASSE
class Produto {

    // construtor
    constructor(nome, preco, estoque) {
        // this
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    // método
    vender(quantidade) {
        if (quantidade <= this.estoque) {
            this.estoque -= quantidade;
            console.log(`${quantidade} unidade(s) de ${this.nome} vendida(s)`);
        } else {
            console.log(`Não há estoque suficiente de ${this.nome}`);
        }
    }

    // método
    repor(quantidade) {
        this.estoque += quantidade;
        console.log(`${quantidade} unidade(s) de ${this.nome} reposta(s)`);
    }

    // método
    alterarPreco(novoPreco) {
        this.preco = novoPreco;
        console.log(`O novo preço do ${this.nome} é R$ ${this.preco}`);
    }
}

// OBJETOS

const produto1 = new Produto("Camisa", 50, 20);
console.log("Produto 1: ", produto1);

const produto2 = new Produto("Air max tn", 200, 15);
console.log("Produto 2: ", produto2);

const produto3 = new Produto("Boné", 80, 10);
console.log("Produto 3: ", produto3);


// PRODUTO 1

console.log("----------------------");
console.log("Atributos do produto 1: ");
console.log("- ", produto1.nome);
console.log("- R$", produto1.preco);
console.log("- ", produto1.estoque);
console.log("----------------------");

produto1.vender(2);
produto1.repor(5);
produto1.alterarPreco(55);


// PRODUTO 2

console.log("----------------------");
console.log("Atributos do produto 2: ");
console.log("- ", produto2.nome);
console.log("- R$", produto2.preco);
console.log("- ", produto2.estoque);
console.log("----------------------");

produto2.vender(3);
produto2.repor(10);
produto2.alterarPreco(220);


// PRODUTO 3

console.log("----------------------");
console.log("Atributos do produto 3: ");
console.log("- ", produto3.nome);
console.log("- R$", produto3.preco);
console.log("- ", produto3.estoque);
console.log("----------------------");

produto3.vender(1);
produto3.repor(5);
produto3.alterarPreco(90);