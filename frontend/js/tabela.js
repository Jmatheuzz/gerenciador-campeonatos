const voltar = document.querySelector('#voltar');
const partida = document.querySelector('.partida');
const fase = document.querySelector('.fase');

const api = axios.create({
    headers: {'Content-Type': 'application/json'},
    baseURL: "http://localhost:3001",
});

const nomeTorneio = localStorage.getItem("torneio").replace(/ /g, '-');

async function inicio(){
    
    const response = await api.get(`partidas/${nomeTorneio}/index`, {
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })

    const response1 = await api.get(`times/${nomeTorneio}/index`, {
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });



    let time1, time2, nometime1, nometime2;
    response.data.partidas.forEach(partidas => {
        let noeliminated = 0;
        response1.data.Times.forEach(time =>{
            if(partidas.id_time1 == time.id){
                time1 = time.abrev;
                nometime1 = time.nome;
            }
            if(partidas.id_time2 == time.id){
                time2 = time.abrev;
                nometime2 = time.nome;
            }
            if(time.eliminado == 0){
                noeliminated++;
            }
        });

        const placar = partidas.placar != null ? partidas.placar :' x ';
        
        if(noeliminated > 4){
            fase.innerHTML = `<h1>${noeliminated}°-de-final</h1>`;
        }
        else if(noeliminated == 4){
            fase.innerHTML = `<h1>Semifinal</h1>`;
        }
        else if(noeliminated == 2){
            fase.innerHTML = `<h1>Final</h1>`;
        }

        console.log(partidas)
        const datahora = partidas.data_hora != null ? partidas.data_hora.replace(/Z/g, '').split('T'): 'NÃO DEFINIDO';
        let data, hora;
        if(partidas.data_hora != null ){
            data = datahora[0].replace(/-/g, "/");
            hora = datahora[1].slice(0, -7);
        }else{
            data = 'NAO DEFINIDO';
            hora = 'NAO DEFINIDO';
        }
        console.log(data, hora)
        const id = partidas.id;
        partida.innerHTML += `<h2>${time1} ${placar} ${time2}</h2>`
        partida.innerHTML += `<button onclick=infoJogo(${partidas.id}).toString()> Adicionar informações do jogo </button>`;
        partida.innerHTML += `<h3>Data: ${data + " " + "Hora: " + hora}</h3><h3>Local: ${partidas.local}</h3><h3>Estado: ${partidas.estado}</h3>`;
        /*partida.innerHTML += `<h3>Estado:<select id="estados">
            <option value="ni">NAO INICIADO</option>
            <option value="ea">EM ANDAMENTO</option>
            <option value="fi">FINALIZADO</option>
        </select></h3><button id="btnInfo${partidas.id}">Confirmar Estado<button/>`;
        const btnestado = document.querySelector(`#btnInfo${partidas.id}`);
        btnestado.addEventListener('click', async ()=>{
            const estadoesc = document.getElementById("estados");
            console.log(estadoesc.options[estadoesc.selectedIndex].text);
            const nomeTorneioAtualizar = localStorage.getItem("nomeTorneioAtualizar");
            await api.put(`/${nomeTorneioAtualizar}/${nometime1}+${nometime2}/update`, {id: partidas.id, id_torneio: partidas.id_torneio, id_time1: partidas.id_time1, id_time2: partidas.id_time2, data_hora: partidas.data_hora, local: partidas.local, qtd_chutes_time1: partidas.qtd_chutes_time1, qtd_chutes_time2: partidas.qtd_chutes_time2, qtd_faltas_time1: partidas.qtd_faltas_time1, qtd_faltas_time2: partidas.qtd_faltas_time2, placar: partidas.placar, estado: estadoesc.options[estadoesc.selectedIndex].text}, {
                headers:{
                    'authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
        })*/
    });
}

inicio();

voltar.addEventListener('click', async ()=>{
    window.location.href = "http://localhost:5500/frontend/meus-torneios.html"
})

async function infoJogo(id){
    const response = await api.get(`partidas/${nomeTorneio}/index`, {
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });

    const response1 = await api.get(`times/${nomeTorneio}/index`, {
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });

    response.data.partidas.forEach(partidas => {
        if(partidas.id == id){
            response1.data.Times.forEach(time =>{
                if(partidas.id_time1 == time.id){
                    nometime1 = String(time.nome).replace(/ /g, '-');
                }
                if(partidas.id_time2 == time.id){
                    nometime2 = String(time.nome).replace(/ /g, '-');
                }
            });
            partida.innerHTML += `
            <form id="form-partida" >
                <label for="">Local:</label>
                <input type="text" name="local" id="local-partida"><br>
                <label for="">Placar</label>
                <input type="text" name="placar" id="placar-partida"><br>
                <label for="">Data</label>
                <input type="date" name="data" id="data-partida"><br>
                <label for="">Hora</label>
                <input type="time" name="time" id="time-partida"><br>
                <label for="">Estado</label>
                <select name="estado" id="estado">
                    <option value="EM ANDAMENTO">Em andamento</option>
                    <option value="FINALIZADA">Finalizada</option>
                </select>
                <button type="submit">Aplicar Alterações</button>
            </form>
            `;
            const formPartida = document.querySelector('#form-partida');
            const localPartida = document.querySelector('#local-partida');
            const placarPartida = document.querySelector('#placar-partida');
            const dataPartida = document.querySelector('#data-partida');
            const horaPartida = document.querySelector('#time-partida');
            const estado = document.querySelector('#estado');

            formPartida.addEventListener('submit', async(e)=>{
                e.preventDefault();
                const time = horaPartida.value;
                const data = dataPartida.value;
                await api.put(`partidas/${nomeTorneio}/${nometime1}+${nometime2}/update`, {id_torneio: partidas.id_torneio, id_time1: partidas.id_time1, id_time2: partidas.id_time2, data_hora: data + time || partidas.data_hora.replace(/Z/g, '').replace(/T/g, ' ').slice(0, -1), local: localPartida.value, qtd_chutes_time1: partidas.qtd_chutes_time1, qtd_chutes_time2: partidas.qtd_chutes_time2, qtd_faltas_time1: partidas.qtd_faltas_time1, qtd_faltas_time2: partidas.qtd_faltas_time2, placar: placarPartida.value, estado: estadoPartida || partidas.estado}, {
                    headers:{
                        'authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                });
                window.location.reload(true);
            });
        }
    })
}