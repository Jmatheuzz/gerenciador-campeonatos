const api = axios.create({
    headers: {'Content-Type': 'application/json'},
    baseURL: "http://localhost:3001",
});
const formAtualizaTime = document.querySelector('#form-atualizar');
const nome = document.querySelector('#nome');
const abrev = document.querySelector('#abrev');

formAtualizaTime.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const nomeTimeAtualizar = localStorage.getItem("nomeTimeAtualizar");
    const nomeTimeTorneio = localStorage.getItem("nomeTorneioAtualizar");

    const response = await api.put(`/times/${nomeTimeTorneio}/update/${nomeTimeAtualizar}`, {nome:nome.value, abrev:abrev.value}, {
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });
    window.location.href = "http://localhost:5500/frontend/show-torneios.html"
})