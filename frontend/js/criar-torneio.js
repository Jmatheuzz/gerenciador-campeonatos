const api = axios.create({
    headers: {'Content-Type': 'application/json'},
    baseURL: "http://localhost:3001",
      });
      const formCriaTorneio = document.querySelector('#form-torneio');
      const nomeTorneio = document.querySelector('#nome-torneio');
      const descricaoTorneio = document.querySelector('#descricao-torneio');
      const qtdTimesTorneio = document.querySelector('#qtd-torneio');
      const premiacaoTorneio = document.querySelector('#premiacao-torneio');
      formCriaTorneio.addEventListener('submit', async(e)=>{
          e.preventDefault();
          console.log(nomeTorneio.value)
          const response = await api.post("/torneios/create", {nome:nomeTorneio.value, descricao:descricaoTorneio.value, qtd_times:qtdTimesTorneio.value, premiacao: premiacaoTorneio.value}, {
              headers:{
                  'authorization': 'Bearer ' + localStorage.getItem("token")
              }
          });
          window.location.href = "http://localhost:5500/frontend/index.html"
      })