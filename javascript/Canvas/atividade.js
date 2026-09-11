const canvas = document.querySelector("#canvas");
const contexto = canvas.getContext("2d");

//cabeça
contexto.beginPath(); // Desenhando um círculo //
contexto.arc(335, 100, 20, 0, Math.PI * 2);
contexto.lineWidth = 5;
contexto.stroke();

//corpo
contexto.beginPath(); 
contexto.moveTo(325, 120);
contexto.lineTo(325, 200);
contexto.stroke();

//braço esquerdo
contexto.beginPath();
contexto.moveTo(325, 120);
contexto.lineTo(300, 150);
contexto.lineTo(330, 160);
contexto.lineCap = "round";
contexto.lineJoin = "round";
contexto.stroke();

//braço direito
contexto.beginPath();
contexto.moveTo(325, 120);
contexto.lineTo(350, 150);
contexto.lineTo(370, 115);
contexto.lineCap = "round";
contexto.lineJoin = "round";
contexto.stroke();

//perna esquerda
contexto.beginPath();
contexto.moveTo(325, 200);
contexto.lineTo(300, 220);
contexto.lineTo(300, 270);
contexto.lineCap = "round";
contexto.lineJoin = "round";
contexto.stroke();

//perna direita
contexto.beginPath();
contexto.moveTo(325, 200);
contexto.lineTo(350, 220);
contexto.lineTo(350, 270);
contexto.lineCap = "round";
contexto.lineJoin = "round";
contexto.stroke();