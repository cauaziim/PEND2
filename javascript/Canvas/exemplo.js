const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const jogadores = {};

const ARENA_LARGURA = 900;
const ARENA_ALTURA = 500;

io.on("connection", (socket) => {

    console.log("Jogador conectado:", socket.id);

    // Só permite dois jogadores
    if (Object.keys(jogadores).length >= 2) {
        socket.emit("salaCheia");
        return;
    }

    const numeroJogador = Object.keys(jogadores).length + 1;

    jogadores[socket.id] = {
        id: socket.id,
        numero: numeroJogador,

        x: numeroJogador === 1 ? 150 : 750,
        y: 250,

        velocidade: 5,

        vida: 100,

        esquerda: false,
        direita: false,
        cima: false,
        baixo: false
    };

    socket.emit("seuJogador", jogadores[socket.id]);

    io.emit("jogadores", jogadores);

    socket.on("movimento", (teclas) => {

        const jogador = jogadores[socket.id];

        if (!jogador) {
            return;
        }

        jogador.esquerda = teclas.esquerda;
        jogador.direita = teclas.direita;
        jogador.cima = teclas.cima;
        jogador.baixo = teclas.baixo;
    });

    socket.on("disconnect", () => {

        console.log("Jogador saiu:", socket.id);

        delete jogadores[socket.id];

        // Reorganiza os números
        const ids = Object.keys(jogadores);

        ids.forEach((id, index) => {
            jogadores[id].numero = index + 1;
        });

        io.emit("jogadores", jogadores);

        io.emit("adversarioSaiu");
    });
});

// Atualização do jogo
setInterval(() => {

    const jogadoresArray = Object.values(jogadores);

    for (const jogador of jogadoresArray) {

        if (jogador.esquerda) {
            jogador.x -= jogador.velocidade;
        }

        if (jogador.direita) {
            jogador.x += jogador.velocidade;
        }

        if (jogador.cima) {
            jogador.y -= jogador.velocidade;
        }

        if (jogador.baixo) {
            jogador.y += jogador.velocidade;
        }

        // Limites da arena
        jogador.x = Math.max(30, Math.min(ARENA_LARGURA - 30, jogador.x));
        jogador.y = Math.max(30, Math.min(ARENA_ALTURA - 30, jogador.y));
    }

    // Detectar colisão entre os jogadores
    if (jogadoresArray.length === 2) {

        const jogador1 = jogadoresArray[0];
        const jogador2 = jogadoresArray[1];

        const distanciaX = jogador1.x - jogador2.x;
        const distanciaY = jogador1.y - jogador2.y;

        const distancia = Math.sqrt(
            distanciaX * distanciaX +
            distanciaY * distanciaY
        );

        if (distancia < 55) {

            // Empurra os jogadores
            if (jogador1.x < jogador2.x) {
                jogador1.x -= 8;
                jogador2.x += 8;
            } else {
                jogador1.x += 8;
                jogador2.x -= 8;
            }

            // Dano
            jogador1.vida -= 1;
            jogador2.vida -= 1;

            jogador1.vida = Math.max(0, jogador1.vida);
            jogador2.vida = Math.max(0, jogador2.vida);

            // Verifica vencedor
            if (jogador1.vida <= 0 || jogador2.vida <= 0) {

                let vencedor = null;

                if (jogador1.vida > jogador2.vida) {
                    vencedor = jogador1.numero;
                } else if (jogador2.vida > jogador1.vida) {
                    vencedor = jogador2.numero;
                }

                io.emit("fimDeJogo", {
                    vencedor
                });

                // Reinicia após 3 segundos
                setTimeout(() => {

                    if (jogadores[jogador1.id]) {
                        jogadores[jogador1.id].x = 150;
                        jogadores[jogador1.id].y = 250;
                        jogadores[jogador1.id].vida = 100;
                    }

                    if (jogadores[jogador2.id]) {
                        jogadores[jogador2.id].x = 750;
                        jogadores[jogador2.id].y = 250;
                        jogadores[jogador2.id].vida = 100;
                    }

                    io.emit("jogadores", jogadores);

                }, 3000);
            }
        }
    }

    io.emit("atualizarJogo", jogadores);

}, 1000 / 60);

server.listen(3000, () => {

    console.log("================================");
    console.log("X1 Multiplayer iniciado!");
    console.log("Acesse:");
    console.log("http://localhost:3000");
    console.log("================================");

});
