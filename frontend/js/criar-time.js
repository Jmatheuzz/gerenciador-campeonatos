const api = axios.create({
    headers: {'Content-Type': 'application/json'},
    baseURL: "http://localhost:3001",
      });
      const formCriaTime = document.querySelector('#form-time');
      const nomeTime = document.querySelector('#nome');
      const abrev = document.querySelector('#abrev');

      formCriaTime.addEventListener('submit', async(e)=>{
          e.preventDefault();
          const nomeTorneio = localStorage.getItem("torneio").replace(/ /g, '-');
          const response = await api.post(`/times/${nomeTorneio}/create`, {nome:nomeTime.value, abrev:abrev.value}, {
              headers:{
                  'authorization': 'Bearer ' + localStorage.getItem("token")
              }
          });
          document.querySelector('.message').innerHTML = '<p> Time criado com sucesso </p>'
          document.querySelector('.message').innerHTML += '<button onclick="criarJ()"> Criar jogadores </button>';

          
      })

      function criarJ(){
        localStorage.setItem("time", nomeTime.value);
        window.location.href = "http://localhost:5500/frontend/criar-jogador.html" 
      }