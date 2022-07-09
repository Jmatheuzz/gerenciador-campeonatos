const image = document.querySelector('.image');
const bemVindo = document.querySelector('.bemvindo');
const torneios = document.querySelector('.torneios');
const voltar = document.querySelector('#voltar');

const api = axios.create({
    headers: {'Content-Type': 'application/json'},
    baseURL: "http://localhost:3001",
});

async function inicio(){
    const response1 = await api.get("torneios/index", {
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
    response1.data.torneios.forEach(torneio => {
        torneios.innerHTML += `<div><a onclick="criarTime(this)" href="http://localhost:5500/frontend/show-torneio.html "><h3 id = "nome-torneio"> ${torneio.nome} </h3></a><button onclick="apagar(this)"> Apagar </button> <button onclick="atualizar(this)"> Atualizar </button></div>`
    });
    return torneios;
}

inicio();

async function apagar(elemento){
    const nomeTorneio = String(elemento.parentNode.firstChild.innerHTML).trim().replace(/ /g, '-');
    await api.delete(`torneios/delete/${nomeTorneio.slice(23, -6)}`, {
    headers:{
        'authorization': 'Bearer ' + localStorage.getItem("token")
    }
    })
    document.location.reload(true);
}
async function atualizar(elemento){
    const nomeTorneio = String(elemento.parentNode.firstChild.innerHTML).trim().replace(/ /g, '-');
    localStorage.setItem("nomeTorneioAtualizar", nomeTorneio.slice(23, -6));
    window.location.href = "http://localhost:5500/frontend/atualizar-torneio.html"
    /* await api.delete(`torneios/delete/${nomeTorneio}`, {
    headers:{
        'authorization': 'Bearer ' + localStorage.getItem("token")
    }
    })
    document.location.reload(true); */
}
function criarTime(torneio){
    localStorage.setItem("torneio", torneio.innerHTML.slice(23, -6));
}

voltar.addEventListener('click', async ()=>{
    window.location.href = "http://localhost:5500/frontend/inicio.html"
  })