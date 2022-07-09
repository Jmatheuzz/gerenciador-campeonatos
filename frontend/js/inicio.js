const sair = document.querySelector('.sair');
const image = document.querySelector('.image');
const bemVindo = document.querySelector('.bemvindo');
const criarTorneio = document.querySelector('#criar-torneio');
const meuTorneio = document.querySelector('#meu-torneio');
const api = axios.create({
    headers: {'Content-Type': 'application/json'},
    baseURL: "http://localhost:3001",
});

async function inicio(){
    const response = await api.get("clientes/index", {headers:{'authorization': 'Bearer ' + localStorage.getItem("token")}})
    bemVindo.innerHTML = 'Seja bem-vindo, ' + response.data.nome;
    const isImg = response.data.fotoUrl ? response.data.fotoUrl:false;
    image.innerHTML = isImg? `<img src="${isImg}">`: `<img src="img/user-not-img.png"><br>` + "<a href='http://localhost:5500/frontend/imagem-user.html'><h3>Colocar Avatar</h3></a>";
    return;
}

inicio();

criarTorneio.addEventListener('click', async ()=>{
    window.location.href = "http://localhost:5500/frontend/criar-torneio.html"
})
meuTorneio.addEventListener('click', async ()=>{
    window.location.href = "http://localhost:5500/frontend/meus-torneios.html"
})
sair.addEventListener('click', ()=>{
    localStorage.removeItem("token");
    window.location.href = "http://localhost:5500/frontend/home.html"
});