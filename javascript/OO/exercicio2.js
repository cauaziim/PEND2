// CLASSE
class Aluno {

    // construtor
    constructor(nome, idade, curso, nota) {
        // this
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.nota = nota;
    }

    // método
    estudar() {
        console.log(`${this.nome} está estudando`);
    }

    // método
    fazerProva() {
        console.log(`${this.nome} está fazendo a prova`);
    }

    // método
    mostrarNota() {
        console.log(`${this.nome} tirou a nota ${this.nota}`);
    }
}

// OBJETOS

const aluno1 = new Aluno("Cauãzim", 18, "Desenvolvimento de Sistemas", 9);
console.log("Aluno 1: ", aluno1);

const aluno2 = new Aluno("João Carlos", 70, "Informática", 8);
console.log("Aluno 2: ", aluno2);

const aluno3 = new Aluno("Tati", 47, "Programação", 10);
console.log("Aluno 3: ", aluno3);


// ALUNO 1

console.log("----------------------");
console.log("Atributos do aluno 1: ");
console.log("- ", aluno1.nome);
console.log("- ", aluno1.idade);
console.log("- ", aluno1.curso);
console.log("- ", aluno1.nota);
console.log("----------------------");

aluno1.estudar();
aluno1.fazerProva();
aluno1.mostrarNota();


// ALUNO 2

console.log("----------------------");
console.log("Atributos do aluno 2: ");
console.log("- ", aluno2.nome);
console.log("- ", aluno2.idade);
console.log("- ", aluno2.curso);
console.log("- ", aluno2.nota);
console.log("----------------------");

aluno2.estudar();
aluno2.fazerProva();
aluno2.mostrarNota();


// ALUNO 3

console.log("----------------------");
console.log("Atributos do aluno 3: ");
console.log("- ", aluno3.nome);
console.log("- ", aluno3.idade);
console.log("- ", aluno3.curso);
console.log("- ", aluno3.nota);
console.log("----------------------");

aluno3.estudar();
aluno3.fazerProva();
aluno3.mostrarNota();