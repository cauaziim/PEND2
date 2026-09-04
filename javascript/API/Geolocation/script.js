navigator.geolocation.getCurrentPosition(

    function (posicao) {

        console.log("Latitude:", posicao.coords.latitude);

        console.log("Longitude:", posicao.coords.longitude);

        console.log("Precisão:", posicao.coords.accuracy);


        // Coloca os dados na página
        document.getElementById("latitude").textContent =
            posicao.coords.latitude;

        document.getElementById("longitude").textContent =
            posicao.coords.longitude;

        document.getElementById("precisao").textContent =
            posicao.coords.accuracy + " metros";


        // Esconde a tela inicial
        document.getElementById("telaInicial").style.display = "none";

        // Mostra o conteúdo
        document.getElementById("conteudo").style.display = "block";

    },

    function (erro) {

        console.log(
            "Não foi possivel obter a localização. Erro:",
            erro
        );


        // Esconde a tela inicial
        document.getElementById("telaInicial").style.display = "none";

        // Mostra mensagem de erro
        document.getElementById("erro").style.display = "flex";

    }

);
