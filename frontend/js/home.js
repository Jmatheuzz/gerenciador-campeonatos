const login = document.querySelector('#entrar');
const cadastrar = document.querySelector('#cadastrar');
const api = axios.create({
    headers: {'Content-Type': 'application/json'},
    baseURL: "http://localhost:3001",
});

login.addEventListener('click', async ()=>{
    window.location.href = "http://localhost:5500/frontend/login.html"
})

cadastrar.addEventListener('click', async ()=>{
    window.location.href = "http://localhost:5500/frontend/cadastro.html"
})