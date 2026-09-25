const API_URL = "https://gnews.io/api/v4/search";
const API_KEY = "48b69c5d97ba9419dae31c48d2bf5560";

// ======================================
// ELEMENTOS DA PÁGINA
// ======================================

const listaNoticias = document.getElementById("listaNoticias");

const loading = document.getElementById("loading");

const erro = document.getElementById("erro");

const semNoticias = document.getElementById("semNoticias");

const campoPesquisa = document.getElementById("campoPesquisa");

const btnPesquisar = document.getElementById("btnPesquisar");

const btnAtualizar = document.getElementById("btnAtualizar");

const btnTentarNovamente = document.getElementById("btnTentarNovamente");


// ======================================
// BUSCAR NOTÍCIAS
// ======================================

async function buscarNoticias(assunto = "Brasil") {

    // Mostra carregamento
    if (loading) {
        loading.classList.remove("hidden");
    }

    // Esconde mensagens
    if (erro) {
        erro.classList.add("hidden");
    }

    if (semNoticias) {
        semNoticias.classList.add("hidden");
    }

    // Limpa notícias anteriores
    if (listaNoticias) {
        listaNoticias.innerHTML = "";
    }

    try {

        // ======================================
        // PARÂMETROS DA GNEWS
        // ======================================

        const parametros = new URLSearchParams({

            q: assunto,

            lang: "pt",

            country: "br",

            max: "9",

            apikey: API_KEY

        });


        // URL final
        const url = `${API_URL}?${parametros.toString()}`;


        console.log("=================================");
        console.log("CONSULTANDO GNEWS");
        console.log("=================================");
        console.log(url);


        // ======================================
        // FAZ A REQUISIÇÃO
        // ======================================

        const resposta = await fetch(url);


        // ======================================
        // CONVERTE PARA JSON
        // ======================================

        const dados = await resposta.json();


        console.log("Dados recebidos:");
        console.log(dados);


        // ======================================
        // VERIFICA ERRO HTTP
        // ======================================

        if (!resposta.ok) {

            let mensagemErro = `Erro HTTP: ${resposta.status}`;

            if (dados && dados.errors) {

                if (Array.isArray(dados.errors)) {

                    mensagemErro = dados.errors.join(", ");

                } else {

                    mensagemErro = dados.errors;

                }

            }

            throw new Error(mensagemErro);

        }


        // ======================================
        // VERIFICA ERRO DA GNEWS
        // ======================================

        if (dados.errors) {

            let mensagemErro = "Erro ao consultar a GNews.";

            if (Array.isArray(dados.errors)) {

                mensagemErro = dados.errors.join(", ");

            } else if (typeof dados.errors === "string") {

                mensagemErro = dados.errors;

            }

            throw new Error(mensagemErro);

        }


        // ======================================
        // VERIFICA SE EXISTEM NOTÍCIAS
        // ======================================

        if (
            !dados.articles ||
            !Array.isArray(dados.articles) ||
            dados.articles.length === 0
        ) {

            if (semNoticias) {
                semNoticias.classList.remove("hidden");
            }

            return;

        }


        // ======================================
        // CRIA OS CARDS
        // ======================================

        dados.articles.forEach(function (noticia) {

            criarCard(noticia);

        });


    } catch (error) {

        console.error("=================================");
        console.error("ERRO AO BUSCAR NOTÍCIAS");
        console.error("=================================");
        console.error(error);


        if (erro) {
            erro.classList.remove("hidden");
        }

    } finally {

        // Esconde carregamento
        if (loading) {
            loading.classList.add("hidden");
        }

    }

}


// ======================================
// CRIAR CARD DA NOTÍCIA
// ======================================

function criarCard(noticia) {


    // ======================================
    // CARD PRINCIPAL
    // ======================================

    const card = document.createElement("article");

    card.classList.add("news-card");


    // ======================================
    // IMAGEM
    // ======================================

    const imagem =
        noticia.image ||
        "https://via.placeholder.com/600x350?text=Sem+imagem";


    // ======================================
    // TÍTULO
    // ======================================

    const titulo =
        noticia.title ||
        "Título não disponível";


    // ======================================
    // DESCRIÇÃO
    // ======================================

    const descricao =
        noticia.description ||
        "Descrição não disponível";


    // ======================================
    // FONTE
    // ======================================

    const fonte =
        noticia.source?.name ||
        "Fonte desconhecida";


    // ======================================
    // URL DA NOTÍCIA
    // ======================================

    const url =
        noticia.url ||
        "#";


    // ======================================
    // DATA
    // ======================================

    const dataFormatada =
        formatarData(noticia.publishedAt);


    // ======================================
    // HTML DO CARD
    // ======================================

    card.innerHTML = `

        <img
            src="${escaparAtributo(imagem)}"
            alt="${escaparHTML(titulo)}"
            class="news-image"
            onerror="this.src='https://via.placeholder.com/600x350?text=Sem+imagem'"
        >

        <div class="news-content">

            <span class="news-source">
                ${escaparHTML(fonte)}
            </span>

            <h3 class="news-title">
                ${escaparHTML(titulo)}
            </h3>

            <p class="news-description">
                ${escaparHTML(descricao)}
            </p>

            <div class="news-info">

                <span class="news-date">
                    ${dataFormatada}
                </span>

            </div>

            <a
                href="${escaparAtributo(url)}"
                target="_blank"
                rel="noopener noreferrer"
                class="news-button"
            >
                Ler notícia →
            </a>

        </div>

    `;


    // ======================================
    // ADICIONA O CARD NA PÁGINA
    // ======================================

    if (listaNoticias) {

        listaNoticias.appendChild(card);

    }

}


// ======================================
// FORMATAR DATA
// ======================================

function formatarData(data) {


    if (!data) {

        return "Data não disponível";

    }


    const dataObjeto = new Date(data);


    if (isNaN(dataObjeto.getTime())) {

        return "Data não disponível";

    }


    return dataObjeto.toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}


// ======================================
// PROTEGER TEXTO HTML
// ======================================

function escaparHTML(texto) {


    if (texto === null || texto === undefined) {

        return "";

    }


    const elemento = document.createElement("div");

    elemento.textContent = String(texto);

    return elemento.innerHTML;

}


// ======================================
// PROTEGER ATRIBUTOS HTML
// ======================================

function escaparAtributo(texto) {


    if (texto === null || texto === undefined) {

        return "";

    }


    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}


// ======================================
// PESQUISAR
// ======================================

function pesquisar() {


    if (!campoPesquisa) {

        return;

    }


    const assunto =
        campoPesquisa.value.trim();


    if (assunto === "") {

        buscarNoticias("Brasil");

        return;

    }


    buscarNoticias(assunto);

}


// ======================================
// BOTÃO PESQUISAR
// ======================================

if (btnPesquisar) {

    btnPesquisar.addEventListener(
        "click",
        pesquisar
    );

}


// ======================================
// PESQUISAR COM ENTER
// ======================================

if (campoPesquisa) {

    campoPesquisa.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                pesquisar();

            }

        }
    );

}


// ======================================
// BOTÃO ATUALIZAR
// ======================================

if (btnAtualizar) {

    btnAtualizar.addEventListener(
        "click",
        function () {

            if (!campoPesquisa) {

                buscarNoticias("Brasil");

                return;

            }


            const assunto =
                campoPesquisa.value.trim();


            if (assunto === "") {

                buscarNoticias("Brasil");

            } else {

                buscarNoticias(assunto);

            }

        }
    );

}


// ======================================
// BOTÃO TENTAR NOVAMENTE
// ======================================

if (btnTentarNovamente) {

    btnTentarNovamente.addEventListener(
        "click",
        function () {

            if (!campoPesquisa) {

                buscarNoticias("Brasil");

                return;

            }


            const assunto =
                campoPesquisa.value.trim();


            if (assunto === "") {

                buscarNoticias("Brasil");

            } else {

                buscarNoticias(assunto);

            }

        }
    );

}


// ======================================
// EXECUTA AO ABRIR A PÁGINA
// ======================================

buscarNoticias("Brasil");

/* ======================================
CLIMA - OPEN-METEO
====================================== */

// APIs da Open-Meteo
const GEOCODING_URL =
    "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_URL =
    "https://api.open-meteo.com/v1/forecast";


// ======================================
// ELEMENTOS DO CLIMA
// ======================================

const cidadeClima =
    document.getElementById("cidadeClima");

const btnClima =
    document.getElementById("btnClima");

const climaLoading =
    document.getElementById("climaLoading");

const climaErro =
    document.getElementById("climaErro");

const resultadoClima =
    document.getElementById("resultadoClima");

const nomeCidade =
    document.getElementById("nomeCidade");

const iconeClima =
    document.getElementById("iconeClima");

const temperatura =
    document.getElementById("temperatura");

const descricaoClima =
    document.getElementById("descricaoClima");

const sensacao =
    document.getElementById("sensacao");

const umidade =
    document.getElementById("umidade");

const vento =
    document.getElementById("vento");

const chuva =
    document.getElementById("chuva");


// ======================================
// BUSCAR CLIMA
// ======================================

async function buscarClima(cidade) {

    // Verifica se foi digitado alguma coisa
    if (!cidade || cidade.trim() === "") {

        mostrarErroClima(
            "Digite o nome de uma cidade."
        );

        return;

    }


    // ======================================
    // MOSTRA CARREGAMENTO
    // ======================================

    if (climaLoading) {

        climaLoading.classList.remove("hidden");

    }


    // ======================================
    // ESCONDE MENSAGENS ANTERIORES
    // ======================================

    if (climaErro) {

        climaErro.classList.add("hidden");

    }

    if (resultadoClima) {

        resultadoClima.classList.add("hidden");

    }


    try {

        // ======================================
        // 1 - ENCONTRAR A CIDADE
        // ======================================

        const parametrosCidade =
            new URLSearchParams({

                name: cidade,

                count: "1",

                language: "pt",

                format: "json"

            });


        const respostaCidade =
            await fetch(
                `${GEOCODING_URL}?${parametrosCidade}`
            );


        if (!respostaCidade.ok) {

            throw new Error(
                "Erro ao procurar a cidade."
            );

        }


        const dadosCidade =
            await respostaCidade.json();


        // ======================================
        // VERIFICA SE ENCONTROU A CIDADE
        // ======================================

        if (
            !dadosCidade.results ||
            dadosCidade.results.length === 0
        ) {

            throw new Error(
                "Cidade não encontrada."
            );

        }


        // ======================================
        // PRIMEIRA CIDADE ENCONTRADA
        // ======================================

        const cidadeEncontrada =
            dadosCidade.results[0];


        const latitude =
            cidadeEncontrada.latitude;

        const longitude =
            cidadeEncontrada.longitude;


        // ======================================
        // 2 - BUSCAR O CLIMA
        // ======================================

        const parametrosClima =
            new URLSearchParams({

                latitude: latitude,

                longitude: longitude,

                current:
                    "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m",

                timezone: "auto"

            });


        const respostaClima =
            await fetch(
                `${WEATHER_URL}?${parametrosClima}`
            );


        if (!respostaClima.ok) {

            throw new Error(
                "Erro ao consultar o clima."
            );

        }


        const dadosClima =
            await respostaClima.json();


        console.log(
            "Dados do clima:",
            dadosClima
        );


        // ======================================
        // 3 - PEGAR OS DADOS ATUAIS
        // ======================================

        const atual =
            dadosClima.current;


        // ======================================
        // 4 - MOSTRAR OS DADOS NO SITE
        // ======================================

        if (nomeCidade) {

            nomeCidade.textContent =
                `${cidadeEncontrada.name}, ${cidadeEncontrada.country_code || ""}`;

        }


        if (temperatura) {

            temperatura.textContent =
                `${Math.round(atual.temperature_2m)}°C`;

        }


        if (sensacao) {

            sensacao.textContent =
                `${Math.round(atual.apparent_temperature)}°C`;

        }


        if (umidade) {

            umidade.textContent =
                `${atual.relative_humidity_2m}%`;

        }


        if (vento) {

            vento.textContent =
                `${Math.round(atual.wind_speed_10m)} km/h`;

        }


        if (chuva) {

            chuva.textContent =
                `${atual.precipitation} mm`;

        }


        // ======================================
        // DESCRIÇÃO E ÍCONE
        // ======================================

        const informacaoClima =
            obterDescricaoClima(
                atual.weather_code
            );


        if (descricaoClima) {

            descricaoClima.textContent =
                informacaoClima.descricao;

        }


        if (iconeClima) {

            iconeClima.textContent =
                informacaoClima.icone;

        }


        // ======================================
        // MOSTRA RESULTADO
        // ======================================

        if (resultadoClima) {

            resultadoClima.classList.remove("hidden");

        }


    } catch (error) {

        console.error(
            "Erro ao buscar clima:",
            error
        );


        mostrarErroClima(
            "Não foi possível encontrar essa cidade ou consultar o clima."
        );


    } finally {

        // ======================================
        // ESCONDE CARREGAMENTO
        // ======================================

        if (climaLoading) {

            climaLoading.classList.add("hidden");

        }

    }

}


// ======================================
// DESCRIÇÃO DO WEATHER CODE
// ======================================

function obterDescricaoClima(codigo) {

    switch (codigo) {

        case 0:

            return {
                descricao: "Céu limpo",
                icone: "☀️"
            };


        case 1:

            return {
                descricao: "Principalmente limpo",
                icone: "🌤️"
            };


        case 2:

            return {
                descricao: "Parcialmente nublado",
                icone: "⛅"
            };


        case 3:

            return {
                descricao: "Nublado",
                icone: "☁️"
            };


        case 45:
        case 48:

            return {
                descricao: "Neblina",
                icone: "🌫️"
            };


        case 51:
        case 53:
        case 55:

            return {
                descricao: "Garoa",
                icone: "🌦️"
            };


        case 56:
        case 57:

            return {
                descricao: "Garoa congelante",
                icone: "🌧️"
            };


        case 61:
        case 63:
        case 65:

            return {
                descricao: "Chuva",
                icone: "🌧️"
            };


        case 66:
        case 67:

            return {
                descricao: "Chuva congelante",
                icone: "🌧️"
            };


        case 71:
        case 73:
        case 75:

            return {
                descricao: "Neve",
                icone: "🌨️"
            };


        case 77:

            return {
                descricao: "Granizo",
                icone: "🌨️"
            };


        case 80:
        case 81:
        case 82:

            return {
                descricao: "Pancadas de chuva",
                icone: "🌦️"
            };


        case 85:
        case 86:

            return {
                descricao: "Pancadas de neve",
                icone: "🌨️"
            };


        case 95:

            return {
                descricao: "Trovoada",
                icone: "⛈️"
            };


        case 96:
        case 99:

            return {
                descricao: "Trovoada com granizo",
                icone: "⛈️"
            };


        default:

            return {
                descricao: "Condição desconhecida",
                icone: "🌡️"
            };

    }

}


// ======================================
// MOSTRAR ERRO
// ======================================

function mostrarErroClima(mensagem) {

    if (climaErro) {

        climaErro.textContent =
            mensagem;

        climaErro.classList.remove("hidden");

    }


    if (resultadoClima) {

        resultadoClima.classList.add("hidden");

    }

}


// ======================================
// BOTÃO DO CLIMA
// ======================================

if (btnClima) {

    btnClima.addEventListener(
        "click",
        function () {

            const cidade =
                cidadeClima.value.trim();

            buscarClima(cidade);

        }
    );

}


// ======================================
// ENTER NO CAMPO DO CLIMA
// ======================================

if (cidadeClima) {

    cidadeClima.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                const cidade =
                    cidadeClima.value.trim();

                buscarClima(cidade);

            }

        }
    );

}

// ======================================
// BOLSA - BRAPI
// ======================================

const BRAPI_URL =
    "https://brapi.dev/api/quote";


// ======================================
// ELEMENTOS DA BOLSA
// ======================================

const tickerBolsa =
    document.getElementById("tickerBolsa");

const btnBolsa =
    document.getElementById("btnBolsa");

const bolsaLoading =
    document.getElementById("bolsaLoading");

const bolsaErro =
    document.getElementById("bolsaErro");

const resultadoBolsa =
    document.getElementById("resultadoBolsa");

const bolsaTicker =
    document.getElementById("bolsaTicker");

const bolsaNome =
    document.getElementById("bolsaNome");

const bolsaPreco =
    document.getElementById("bolsaPreco");

const bolsaVariacao =
    document.getElementById("bolsaVariacao");

const bolsaMaxima =
    document.getElementById("bolsaMaxima");

const bolsaMinima =
    document.getElementById("bolsaMinima");

const bolsaVolume =
    document.getElementById("bolsaVolume");

const bolsaIcone =
    document.getElementById("bolsaIcone");


// ======================================
// FORMATAR VALOR EM REAIS
// ======================================

function formatarReais(valor) {

    if (
        valor === null ||
        valor === undefined ||
        isNaN(valor)
    ) {

        return "R$ --";

    }


    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ======================================
// FORMATAR NÚMEROS
// ======================================

function formatarNumero(valor) {

    if (
        valor === null ||
        valor === undefined ||
        isNaN(valor)
    ) {

        return "--";

    }


    return Number(valor).toLocaleString(
        "pt-BR"
    );

}


// ======================================
// BUSCAR AÇÃO
// ======================================

async function buscarBolsa(ticker = "PETR4") {

    if (!ticker) {

        return;

    }


    // Remove espaços e transforma
    // em letras maiúsculas

    ticker =
        ticker
            .trim()
            .toUpperCase()
            .replace(
                /[^A-Z0-9.-]/g,
                ""
            );


    if (ticker === "") {

        return;

    }


    // ======================================
    // MOSTRA CARREGAMENTO
    // ======================================

    if (bolsaLoading) {

        bolsaLoading.style.display =
            "block";

    }


    // ======================================
    // LIMPA ERRO
    // ======================================

    if (bolsaErro) {

        bolsaErro.textContent = "";

    }


    // ======================================
    // ESCONDE RESULTADO ANTERIOR
    // ======================================

    if (resultadoBolsa) {

        resultadoBolsa.style.display =
            "none";

    }


    try {

        // ======================================
        // CONSULTA A BRAPI
        // ======================================

        const resposta =
            await fetch(
                `${BRAPI_URL}/${encodeURIComponent(ticker)}`
            );


        const dados =
            await resposta.json();


        // ======================================
        // VERIFICA ERRO HTTP
        // ======================================

        if (!resposta.ok) {

            throw new Error(
                "Não foi possível encontrar esse ativo."
            );

        }


        // ======================================
        // VERIFICA SE ENCONTROU O ATIVO
        // ======================================

        if (
            !dados.results ||
            !Array.isArray(dados.results) ||
            dados.results.length === 0
        ) {

            throw new Error(
                "Ativo não encontrado."
            );

        }


        // ======================================
        // PEGA O PRIMEIRO RESULTADO
        // ======================================

        const ativo =
            dados.results[0];


        // ======================================
        // DADOS DA AÇÃO
        // ======================================

        const simbolo =
            ativo.symbol ||
            ticker;


        const nome =
            ativo.longName ||
            ativo.shortName ||
            "Empresa não informada";


        const preco =
            ativo.regularMarketPrice;


        const variacao =
            ativo.regularMarketChangePercent;


        const maxima =
            ativo.regularMarketDayHigh;


        const minima =
            ativo.regularMarketDayLow;


        const volume =
            ativo.regularMarketVolume;


        // ======================================
        // MOSTRA TICKER
        // ======================================

        if (bolsaTicker) {

            bolsaTicker.textContent =
                simbolo;

        }


        // ======================================
        // MOSTRA NOME
        // ======================================

        if (bolsaNome) {

            bolsaNome.textContent =
                nome;

        }


        // ======================================
        // MOSTRA PREÇO
        // ======================================

        if (bolsaPreco) {

            bolsaPreco.textContent =
                formatarReais(preco);

        }


        // ======================================
        // MÁXIMA DO DIA
        // ======================================

        if (bolsaMaxima) {

            bolsaMaxima.textContent =
                formatarReais(maxima);

        }


        // ======================================
        // MÍNIMA DO DIA
        // ======================================

        if (bolsaMinima) {

            bolsaMinima.textContent =
                formatarReais(minima);

        }


        // ======================================
        // VOLUME
        // ======================================

        if (bolsaVolume) {

            bolsaVolume.textContent =
                formatarNumero(volume);

        }


        // ======================================
        // VARIAÇÃO DA AÇÃO
        // ======================================

        if (bolsaVariacao) {

            if (
                variacao !== null &&
                variacao !== undefined &&
                !isNaN(variacao)
            ) {

                const valorVariacao =
                    Number(variacao);


                const sinal =
                    valorVariacao > 0
                        ? "+"
                        : "";


                bolsaVariacao.textContent =
                    `${sinal}${valorVariacao.toFixed(2)}%`;


                // ======================================
                // AÇÃO SUBIU
                // ======================================

                if (valorVariacao > 0) {

                    bolsaVariacao.style.color =
                        "#4ade80";


                    if (bolsaIcone) {

                        bolsaIcone.textContent =
                            "📈";

                    }

                }


                // ======================================
                // AÇÃO CAIU
                // ======================================

                else if (valorVariacao < 0) {

                    bolsaVariacao.style.color =
                        "#f87171";


                    if (bolsaIcone) {

                        bolsaIcone.textContent =
                            "📉";

                    }

                }


                // ======================================
                // AÇÃO ESTÁVEL
                // ======================================

                else {

                    bolsaVariacao.style.color =
                        "#d1d5db";


                    if (bolsaIcone) {

                        bolsaIcone.textContent =
                            "➖";

                    }

                }

            }

            else {

                bolsaVariacao.textContent =
                    "--";

                bolsaVariacao.style.color =
                    "#d1d5db";


                if (bolsaIcone) {

                    bolsaIcone.textContent =
                        "📊";

                }

            }

        }


        // ======================================
        // MOSTRA O RESULTADO
        // ======================================

        if (resultadoBolsa) {

            resultadoBolsa.style.display =
                "block";

        }


    } catch (error) {

        console.error(
            "Erro ao consultar a brapi:",
            error
        );


        // ======================================
        // MOSTRA ERRO
        // ======================================

        if (bolsaErro) {

            bolsaErro.textContent =
                "Não encontramos esse ativo. " +
                "Tente PETR4, VALE3, ITUB4 ou MGLU3.";

        }

    } finally {

        // ======================================
        // ESCONDE CARREGAMENTO
        // ======================================

        if (bolsaLoading) {

            bolsaLoading.style.display =
                "none";

        }

    }

}


// ======================================
// BOTÃO BUSCAR BOLSA
// ======================================

if (btnBolsa) {

    btnBolsa.addEventListener(
        "click",
        function () {

            const ticker =
                tickerBolsa.value.trim();


            // Se estiver vazio,
            // pesquisa PETR4

            if (ticker === "") {

                buscarBolsa("PETR4");

                return;

            }


            buscarBolsa(ticker);

        }
    );

}


// ======================================
// ENTER NO CAMPO DA BOLSA
// ======================================

if (tickerBolsa) {

    tickerBolsa.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();


                const ticker =
                    tickerBolsa.value.trim();


                if (ticker === "") {

                    buscarBolsa("PETR4");

                }

                else {

                    buscarBolsa(ticker);

                }

            }

        }
    );

}


// ======================================
// EXECUTA AO ABRIR A PÁGINA
// ======================================

// Começa mostrando PETR4

buscarBolsa("PETR4");