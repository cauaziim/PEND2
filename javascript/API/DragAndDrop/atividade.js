const produtos = document.querySelectorAll(".produto");

const areaDrop = document.querySelector("#areaDrop");

const itensCarrinho = document.querySelector("#itensCarrinho");

const totalElemento = document.querySelector("#total");

let total = 0;

// =====================================
// DRAG START
// =====================================

produtos.forEach(function (produto) {


produto.addEventListener("dragstart", function (event) {

    event.dataTransfer.setData(
        "text/plain",
        produto.id
    );

    event.dataTransfer.effectAllowed = "copy";

});


});

// =====================================
// DRAG OVER
// =====================================

areaDrop.addEventListener("dragover", function (event) {


event.preventDefault();

event.dataTransfer.dropEffect = "copy";

areaDrop.classList.add("ativo");


});

// =====================================
// DRAG LEAVE
// =====================================

areaDrop.addEventListener("dragleave", function () {


areaDrop.classList.remove("ativo");


});

// =====================================
// DROP
// =====================================

areaDrop.addEventListener("drop", function (event) {


event.preventDefault();

areaDrop.classList.remove("ativo");


const idProduto =
    event.dataTransfer.getData("text/plain");


console.log("Produto:", idProduto);


const produto =
    document.getElementById(idProduto);


if (!produto) {

    console.log("Produto não encontrado!");

    return;

}


adicionarProduto(produto);


});

// =====================================
// ADICIONAR PRODUTO
// =====================================

function adicionarProduto(produto) {


const id = produto.id;


// Não permite duplicar
if (document.getElementById("item-" + id)) {

    alert("Este produto já está no carrinho!");

    return;

}


const nome =
    produto.textContent.trim();


let preco = 0;


if (id === "produto1") {

    preco = 3500;

}

else if (id === "produto2") {

    preco = 3999;

}

else if (id === "produto3") {

    preco = 4399;

}

else if (id === "produto4") {

    preco = 800;

}

else if (id === "produto5") {

    preco = 1200;

}

else if (id === "produto6") {

    preco = 1500;

}


// Criar item
const item =
    document.createElement("div");


item.classList.add("item-carrinho");

item.id = "item-" + id;


item.innerHTML = `
    <span>
        ${nome} - R$ ${formatarPreco(preco)}
    </span>

    <button class="remover">
        Remover
    </button>
`;


itensCarrinho.appendChild(item);


// Atualizar total
total += preco;

totalElemento.textContent =
    formatarPreco(total);


// Remover produto
item.querySelector(".remover")
    .addEventListener("click", function () {

        item.remove();

        total -= preco;

        totalElemento.textContent =
            formatarPreco(total);

    });


}

// =====================================
// FORMATAR PREÇO
// =====================================

function formatarPreco(valor) {


return valor.toLocaleString("pt-BR", {

    minimumFractionDigits: 2,

    maximumFractionDigits: 2

});


}
