const api = axios.create({
    headers: {'Content-Type': 'application/json'},
    baseURL: "http://localhost:3001",
});
const formAtualiza = document.querySelector('#form-atualizar');
const nomeCliente = document.querySelector('#nome');
const email = document.querySelector('#email');
const senha = document.querySelector('#senha');

formAtualiza.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const response = await api.put(`/clientes/atualizar/`, {nome:nomeCliente.value, email:email.value, password:senha.value}, {
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });
    localStorage.removeItem("token");
    window.location.href = "http://localhost:5500/frontend/login.html"
})