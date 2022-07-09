const informacoes = document.querySelector('.informations');
const times = document.querySelector('.times');
const partidas = document.querySelector('.partidas');


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

const response2 = await api.get(`partidas/${nomeTorneio}/index`, {
    headers:{
        'authorization': 'Bearer ' + localStorage.getItem("token")
    }
})
/*  */

response1.data.Times.forEach(torneio => {
    contaTimes++;
    times.innerHTML += `<div><h3 id = "nome-torneio"> ${torneio.nome} </h3><button onclick="apagar(this)"> Apagar </button> <button onclick="atualizar(this)"> Atualizar </button></div>`
});
times.innerHTML += contaTimes < qtdTimes? '<button onclick="criarTime()"> Adicionar time </button>': '';

if(!response2.partidas && contaTimes == qtdTimes){
    partidas.innerHTML = `<button onclick="criarPartidasAleatorias()"> Criar partidas aleatórias </button>`
}

}
function criarTime(){

    window.location.href = "http://localhost:5500/frontend/criar-time.html"

}

async function criarPartidasAleatorias(){
    const response1 = await api.get(`times/${nomeTorneio}/index`, {
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
    const times = response1.data.Times

    for (let i = 0; i < times.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [times[i], times[j]] = [times[j], times[i]];
    }
    console.log(times)
    while(times.length > 0){
        const partida = {
            time1: times.pop(),
            time2: times.pop(),
            local: "Crie o local",
            data_hora: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
        await api.post(`partidas/${nomeTorneio}/${partida.time1.nome.replace(/ /g, '-')}/${partida.time2.nome.replace(/ /g, '-')}/create`, partida, {
            headers:{
                'authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
    }
    
}
inicio();



