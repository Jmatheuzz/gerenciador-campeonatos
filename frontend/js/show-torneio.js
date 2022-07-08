const informacoes = document.querySelector('.informations');
const times = document.querySelector('.times');


const api = axios.create({
    headers: {'Content-Type': 'application/json'},
    baseURL: "http://localhost:3001",
    });
let contaTimes = 0;
let qtdTimes;
const nomeTorneio = localStorage.getItem("torneio").replace(/ /g, '-');
async function inicio(){

    const response = await api.get(`torneios/show/${nomeTorneio}`, {
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
    response.data.torneio.forEach(torneio => {
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
/*  */

response1.data.Times.forEach(torneio => {
    contaTimes++;
    times.innerHTML += `<div><h3 id = "nome-torneio"> ${torneio.nome} </h3><button onclick="apagar(this)"> Apagar </button> <button onclick="atualizar(this)"> Atualizar </button></div>`
});
times.innerHTML += contaTimes < qtdTimes? '<button onclick="criarTime()"> Criar time </button>': '';

}
function criarTime(){

    window.location.href = "http://127.0.0.1:5500/frontend/criar-time.html"

}
inicio();



