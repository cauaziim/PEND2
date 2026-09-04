navigator.geolocation.getCurrentPosition(

    function (posicao) {

        const latitude = posicao.coords.latitude;

        const longitude = posicao.coords.longitude;

        const precisao = posicao.coords.accuracy;


        console.log("Latitude:", latitude);

        console.log("Longitude:", longitude);

        console.log("Precisão:", precisao);


        // Mostra os dados na página

        document.getElementById("latitude").textContent =
            latitude;

        document.getElementById("longitude").textContent =
            longitude;

        document.getElementById("precisao").textContent =
            precisao + " metros";


        // Esconde a tela inicial

        document.getElementById("telaInicial").style.display =
            "none";


        // Mostra o conteúdo

        document.getElementById("conteudo").style.display =
            "block";

    },


    function (erro) {

        console.log(
            "Não foi possível obter a localização. Erro:",
            erro
        );


        // Esconde a tela inicial

        document.getElementById("telaInicial").style.display =
            "none";


        // Mostra o X

        document.getElementById("erro").style.display =
            "flex";

    }

);


// =========================
// CÂMERA
// =========================

function abrirCamera() {

    navigator.mediaDevices.getUserMedia({

        video: true

    })

    .then(function (stream) {

        const camera =
            document.getElementById("camera");

        camera.srcObject = stream;


        // Remove a mensagem da câmera

        document.getElementById("mensagemCamera").style.display =
            "none";

    })

    .catch(function (erro) {

        console.log(
            "Não foi possível acessar a câmera:",
            erro
        );

        alert("Não foi possível acessar a câmera.");

    });

}