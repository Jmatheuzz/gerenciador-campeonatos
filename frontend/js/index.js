const sair = document.querySelector('.sair');
    const image = document.querySelector('.image');
    const bemVindo = document.querySelector('.bemvindo');
    const torneios = document.querySelector('.torneios');
    const criarTorneio = document.querySelector('#criar-torneio');
    const api = axios.create({
    headers: {'Content-Type': 'application/json'},
    baseURL: "http://localhost:3001",
    });

    async function inicio(){
        const response = await api.get("clientes/index", {
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
    bemVindo.innerHTML = 'Seja bem vindo, '+response.data.nome;
    const isImg = response.data.fotoUrl? response.data.fotoUrl:false;
    image.innerHTML += isImg? `<img src="${isImg}">`: "<a href='http://127.0.0.1:5500/frontend/imagem-user.html'>Colocar avatar</a>"  + `<img src="img/user-not-img">` ;
    const response1 = await api.get("torneios/index", {
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
    /*  */
    response1.data.torneios.forEach(torneio => {
        torneios.innerHTML += `<div><a onclick="criarTime(this)" href="http://127.0.0.1:5500/frontend/show-torneio.html "><h3 id = "nome-torneio"> ${torneio.nome} </h3></a><button onclick="apagar(this)"> Apagar </button> <button onclick="atualizar(this)"> Atualizar </button></div>`
    });
    return torneios;
    }
    
    inicio();
    
    criarTorneio.addEventListener('click', async ()=>{

        window.location.href = "http://127.0.0.1:5500/frontend/criar-torneio.html"
    })
    sair.addEventListener('click', ()=>{
        localStorage.removeItem("token");
        window.location.href = "http://127.0.0.1:5500/frontend/login.html"
    });
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

    function apagarAvatar(){
        console.log('ola')
    }