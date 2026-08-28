const nome = document.getElementById("nome");
const salvar = document.getElementById("salvar");
const recuperar = document.getElementById("recuperar");
const remover = document.getElementById("remover");

const resultado = document.getElementById("resultado");

salvar.addEventListener("click", function() {
    localStorage.setItem("nome", nome.value);
    resultado.textContent = "Nome salvo!";
});

recuperar.addEventListener("click", function() {
    const nomeRecuperado = localStorage.getItem("nome");
    resultado.textContent = `Nome recuperado: ${nomeRecuperado}`
});

remover.addEventListener("click", function() {
    localStorage.removeItem("nome");
    resultado.textContent = "Nome removido.";
});

