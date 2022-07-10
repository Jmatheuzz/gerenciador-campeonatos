const voltar = document.querySelector('#voltar');

const api = axios.create({
    headers: {'Content-Type': 'application/json'},
    baseURL: "http://localhost:3001",
});

const nomeTorneio = localStorage.getItem("torneio").replace(/ /g, '-');

async function inicio(){
    const response = await api.get(`${nomeTorneio}/index`, {
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
    
    console.log(response);
    
    /*response.data.torneio.forEach(torneio => {
        qtdTimes = torneio.qtd_times;
        informacoes.innerHTML += `<div><h3 id = "nome-torneio"> ${torneio.nome} </h3>
        <p> Descrição: ${torneio.descricao} </p> <span>Premiação: R$ ${torneio.premiacao} </span>
        <span> Quantidade de times: ${torneio.qtd_times} </span></div>`
    });


    const response1 = await api.get(`times/${nomeTorneio}/index`, {
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })

    const response2 = await api.get(`partidas/${nomeTorneio}/index`, {
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })

    response1.data.Times.forEach(torneio => {
        contaTimes++;
        times.innerHTML += `<div><h3 id = "nome-torneio"> ${torneio.nome} </h3><button onclick="apagar(this)"> Apagar </button> <button onclick="atualizar(this)"> Atualizar </button></div>`
    });
    times.innerHTML += contaTimes < qtdTimes ? '<button onclick="criarTime()"> Adicionar time </button>': '';

    if(!response2.partidas && contaTimes == qtdTimes){
        partidas.innerHTML = `<button onclick="criarPartidasAleatorias()"> Criar partidas aleatórias </button>`;
        partidas.innerHTML = `<button onclick="mostrarTabela()">Mostrar Tabela</button>`;
    }else{
        alert(`Faltam ${qtdTimes - contaTimes} times serem adicionados para gerar partidas.`);
    }*/

}

inicio();

voltar.addEventListener('click', async ()=>{
    window.location.href = "http://localhost:5500/frontend/meus-torneios.html"
})