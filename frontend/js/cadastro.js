const api = axios.create({
    headers: {'Content-Type': 'application/json'},
    baseURL: "http://localhost:3001",
    });

    const formLogin = document.querySelector("#cadastro");
    const nome = document.querySelector("#nome");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    formLogin.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const nomeValue = nome.value;
    const emailValue = email.value;
    const passwordValue = password.value;

    const responseCadastro = await api.post("/clientes/cadastro", {nome: nomeValue, email:emailValue, password:passwordValue});

    const response = await api.post("token", {email:emailValue, password:passwordValue});
    localStorage.setItem("token", response.data.token);
    window.location.href = "http://127.0.0.1:5500/frontend/index.html"
    })