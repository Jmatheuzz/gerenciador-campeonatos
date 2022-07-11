const api = axios.create({
    headers: {'Content-Type': 'application/json'},
    baseURL: "http://localhost:3001",
      });
      const formCriaTime = document.querySelector('#form-jogador');
      const nomeJogador = document.querySelector('#nome');

      formCriaTime.addEventListener('submit', async(e)=>{
          e.preventDefault();
          const nomeTime = localStorage.getItem("time").replace(/ /g, '-');

          const response = await api.post(`/jogador/${nomeTime}/create`, {nome:nomeJogador.value}, {
              headers:{
                  'authorization': 'Bearer ' + localStorage.getItem("token")
              }
          });
          document.querySelector('.message').innerHTML = '<p> Jogador criado com sucesso </p>';
          document.querySelector('.message').innerHTML += '<button onclick="criarP()"> Criar próximo </button>';

          
      })

      function criarP(){
        window.location.href = "http://localhost:5500/frontend/criar-jogador.html"
      }