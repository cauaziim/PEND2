const canvas = document.querySelector("#canvas");
const contexto = canvas.getContext("2d");

contexto.beginPath(); // Desenhando uma linha //
contexto.moveTo(10, 0);
contexto.lineTo(11, 200);
contexto.lineTo(200, 200);
contexto.stroke();

contexto.fillRect(50, 50, 150, 100); // Desenhando um retângulo // 
contexto.strokeRect(250, 50, 150, 100); // Desenhando a borda do retângulo //

contexto.beginPath(); // Desenhando um círculo //
contexto.arc(325, 100, 40, 0, Math.PI * 2);
contexto.fillStyle = "red";
contexto.fill();
contexto.stroke();