async function init(){
    carregaAnotacoes();
}

const ulAnotacoes = document.querySelector('#anotacoes');
const formCriarAnotacao = document.querySelector('#criar-anotacao-form');

formCriarAnotacao.onsubmit = async (event) => {
    event.preventDefault();
    const campoTexto = document.querySelector('#criar-anotacao-form-texto');
    const texto = campoTexto.value;

    const resposta = await fetch("http://127.0.0.1:5500/anotacoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({texto})
    });

    const mensagem = (await resposta.json()).info;
    console.log(mensagem);

    campoTexto.value = "";
    await carregaAnotacoes();
}

async function carregaAnotacoes(){
    const resposta = await fetch("http://127.0.0.1:5500/anotacoes");
    const anotacoes = await resposta.json();

    ulAnotacoes.innerHTML = "";

    anotacoes.forEach(({texto, id}) =>{
        const buttonDeletar = document.createElement('button');
        buttonDeletar.innerHTML = "Deletar";
        buttonDeletar.className = "botao";
        buttonDeletar.onclick = async () => {
            const resposta = await fetch(`http://127.0.0.1:5500/anotacoes/${id}`, {
                method: "DELETE",
            });

            const mensagem = (await resposta.json()).info;
            console.log(mensagem);
            await carregaAnotacoes();
        };

        const liTexto = document.createElement('li');
        liTexto.className = "item";
        liTexto.textContent = texto;
        liTexto.append(buttonDeletar);

        ulAnotacoes.append(liTexto);
    });
}

init();