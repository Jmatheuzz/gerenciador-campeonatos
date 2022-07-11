const api = axios.create({
    headers: {'Content-Type': 'application/json'},
    baseURL: "http://localhost:3001",
});

const formLogin = document.querySelector("#foto-user");
    
formLogin.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    const imagefile = document.querySelector('#foto');
    formData.append("avatar-cliente", imagefile.files[0]);

    await api.post(`avatar-cliente/create`, formData, {
        headers:{
            'Content-Type': 'multipart/form-data',
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
        })

    
    window.location.href = "http://localhost:5500/frontend/inicio.html"
})

