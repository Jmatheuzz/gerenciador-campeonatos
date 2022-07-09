
const api = axios.create({
  headers: {'Content-Type': 'application/json'},
  baseURL: "http://localhost:3001",
});

const formLogin = document.querySelector("#login");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
formLogin.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const emailValue = email.value;
  const passwordValue = password.value;

  const response = await api.post("token", {email:emailValue, password:passwordValue});
  localStorage.setItem("token", response.data.token);
  window.location.href = "http://localhost:5500/frontend/index.html"
})

