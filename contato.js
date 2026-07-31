// =====================================
// NOVAERA CODE - CONTATO
// =====================================


// Espera o HTML carregar totalmente

document.addEventListener("DOMContentLoaded", function(){


    const formulario = document.querySelector("form");

    const campos = formulario.querySelectorAll("input");

    const nome = campos[0];

    const email = campos[1];

    const senha = campos[2];

    const mensagem = formulario.querySelector("textarea");

    const olho = document.querySelector("#olho");



    // ================================
    // OLHO DA SENHA
    // ================================


    if(olho){


        olho.addEventListener("click", function(){


            if(senha.type === "password"){


                senha.type = "text";


                olho.classList.remove("fa-eye");

                olho.classList.add("fa-eye-slash");


            }else{


                senha.type = "password";


                olho.classList.remove("fa-eye-slash");

                olho.classList.add("fa-eye");


            }


        });


    }




    // ================================
    // VALIDAR FORMULÁRIO
    // ================================


    formulario.addEventListener("submit", function(e){


        e.preventDefault();



        let nomeValor = nome.value.trim();

        let emailValor = email.value.trim();

        let senhaValor = senha.value.trim();

        let mensagemValor = mensagem.value.trim();




        // Nome

        if(nomeValor === ""){


            alert("Digite seu nome.");

            nome.focus();

            return;


        }





        // Email

        let emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if(!emailValido.test(emailValor)){


            alert("Digite um email válido.");

            email.focus();

            return;


        }





        // Senha

        if(senhaValor.length < 6){


            alert("A senha deve ter pelo menos 6 caracteres.");

            senha.focus();

            return;


        }





        // Mensagem

        if(mensagemValor === ""){


            alert("Digite sua mensagem.");

            mensagem.focus();

            return;


        }





        // Tudo correto

        alert("✅ Mensagem enviada com sucesso! A NovaEra Code entrará em contato.");



        formulario.reset();



        // volta o olho

        if(olho){

            senha.type = "password";

            olho.classList.remove("fa-eye-slash");

            olho.classList.add("fa-eye");

        }


    });



});
