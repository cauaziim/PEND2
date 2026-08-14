class Produto {

    constructor(nome, preco, categoria, desconto) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.desconto = desconto;
    }

    aplicarDesconto() {
        this.preco = this.preco - (this.preco * this.desconto / 100);
    }

    exibir() {
        document.getElementById("resultado").innerHTML = `
            <h2>Produto cadastrado</h2>
            <p>Nome: ${this.nome}</p>
            <p>Preço: R$ ${this.preco.toFixed(2)}</p>
            <p>Categoria: ${this.categoria}</p>
            <p>Desconto: ${this.desconto}%</p>
        `;
    }
}

document.getElementById("formProduto").addEventListener("submit", function(event) {

    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let preco = parseFloat(document.getElementById("preco").value);
    let categoria = document.getElementById("categoria").value;
    let desconto = parseFloat(document.getElementById("desconto").value);

    let produto = new Produto(nome, preco, categoria, desconto);

    produto.aplicarDesconto();
    produto.exibir();
});