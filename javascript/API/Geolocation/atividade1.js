// =========================
// LOCALIZAÇÃO
// =========================

navigator.geolocation.getCurrentPosition(

    function (posicao) {

        const latitude = posicao.coords.latitude;
        const longitude = posicao.coords.longitude;
        const precisao = posicao.coords.accuracy;


        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        console.log("Precisão:", precisao);


        // =========================
        // MOSTRA OS DADOS
        // =========================

        document.getElementById("latitude").textContent =
            latitude.toFixed(6);

        document.getElementById("longitude").textContent =
            longitude.toFixed(6);

        document.getElementById("precisao").textContent =
            precisao.toFixed(2) + " metros";


        // =========================
        // ESCONDE TELA INICIAL
        // =========================

        document.getElementById("telaInicial").style.display =
            "none";


        // =========================
        // MOSTRA CONTEÚDO
        // =========================

        document.getElementById("conteudo").style.display =
            "block";

    },


    function (erro) {

        console.log(
            "Não foi possível obter a localização. Erro:",
            erro
        );


        // Esconde tela inicial

        document.getElementById("telaInicial").style.display =
            "none";


        // Mostra tela de erro

        document.getElementById("erro").style.display =
            "flex";

    }

);



// =========================
// CÂMERA
// =========================

let streamCamera = null;


function abrirCamera() {

    // Verifica se o navegador suporta câmera

    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {

        alert(
            "Seu navegador não suporta acesso à câmera."
        );

        return;
    }


    // Solicita acesso à câmera

    navigator.mediaDevices.getUserMedia({

        video: true,
        audio: false

    })


    .then(function (stream) {

        streamCamera = stream;


        const camera =
            document.getElementById("camera");


        // Coloca a câmera no vídeo

        camera.srcObject = stream;


        // Remove mensagem

        document.getElementById(
            "mensagemCamera"
        ).style.display = "none";


        // Atualiza status

        document.getElementById(
            "statusCamera"
        ).textContent = "✅ Câmera ativada";


        // Ativa botão de captura

        document.getElementById(
            "botaoCapturar"
        ).disabled = false;


        // Muda texto do botão

        document.getElementById(
            "botaoCamera"
        ).textContent = "📷 Câmera ativada";


        console.log(
            "Câmera ativada com sucesso!"
        );

    })


    .catch(function (erro) {

        console.log(
            "Não foi possível acessar a câmera:",
            erro
        );


        document.getElementById(
            "statusCamera"
        ).textContent = "❌ Acesso negado";


        alert(
            "Não foi possível acessar a câmera. " +
            "Verifique se você permitiu o acesso."
        );

    });

}



// =========================
// CAPTURAR IMAGEM
// =========================

function capturarImagem() {

    const camera =
        document.getElementById("camera");


    const canvas =
        document.getElementById("canvas");


    const fotoCapturada =
        document.getElementById("fotoCapturada");


    // Verifica se a câmera está ativa

    if (!camera.srcObject) {

        alert(
            "Primeiro ative a câmera."
        );

        return;
    }


    // =========================
    // DEFINE O TAMANHO DO CANVAS
    // =========================

    canvas.width = camera.videoWidth;
    canvas.height = camera.videoHeight;


    // Pega o contexto 2D

    const contexto =
        canvas.getContext("2d");


    // =========================
    // DESENHA O VÍDEO NO CANVAS
    // =========================

    contexto.drawImage(

        camera,

        0,
        0,

        canvas.width,
        canvas.height

    );


    // =========================
    // TRANSFORMA CANVAS EM IMAGEM
    // =========================

    const imagem =
        canvas.toDataURL("image/png");


    // Coloca a imagem no elemento <img>

    fotoCapturada.src = imagem;


    // =========================
    // MOSTRA A ÁREA DA FOTO
    // =========================

    document.getElementById(
        "areaFoto"
    ).style.display = "block";


    console.log(
        "Imagem capturada com sucesso!"
    );

}



// =========================
// PARAR CÂMERA
// =========================

function pararCamera() {

    if (streamCamera) {

        streamCamera
            .getTracks()
            .forEach(function (track) {

                track.stop();

            });


        streamCamera = null;


        document.getElementById(
            "camera"
        ).srcObject = null;


        document.getElementById(
            "mensagemCamera"
        ).style.display = "flex";


        document.getElementById(
            "botaoCapturar"
        ).disabled = true;

    }

}