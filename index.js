document.getElementById('form-Task').addEventListener('submit', saveTask);
document.getElementById('form-Task-Update').addEventListener('submit', updateTask);


function loadTaskToUpdate(schedule, scheduleId) {
  console.log("update", scheduleId)
  //set local storage schedule
  localStorage.setItem('scheduleId', scheduleId);
  console.log(schedule);
  let auxDate = schedule.split(" ");
        let date = auxDate[0];
        let horario = auxDate[1];
        let horario2 = horario.split(":");
        let hora = horario2[0]+":"+horario2[1];
        //change / to -
        let dateFormat = date.split("/");
        let dateFormat2 = dateFormat[2] + "-" + dateFormat[1] + "-" + dateFormat[0];
  document.getElementById("dataUpdate").value = dateFormat2;
  document.getElementById("horarioUpdate").value = hora;
}

function updateTask(){
  console.log("update")
  let data = document.getElementById('dataUpdate').value;
  let hour = document.getElementById('horarioUpdate').value;
  let auxData = data + " " + hour
  console.log(auxData)
  let scheduleId = localStorage.getItem('scheduleId');
  var request = new XMLHttpRequest();
  request.open('PUT', 'http://localhost:3020/schedule/' + scheduleId, true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.send(JSON.stringify({
    date: auxData,
    owner: "5f932006-0024-45ff-b351-04119a2d6de8",
    status: "Pendente",
    rival: null
  }));
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var res = JSON.parse(request.response);
      getTasks();

      //console.log(res);
    } else {
      // We reached our target server, but it returned an error
      console.log('error');
    }
  };
}



function saveTask(e) {
  let data = document.getElementById('data').value;
  let hour = document.getElementById('horario').value;
  let owner_id = "5f932006-0024-45ff-b351-04119a2d6de8";
  var request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:3020/schedule', true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.send(JSON.stringify({
    date: data + " " + hour,
    owner: owner_id,
    status: "Pendente"
  }));
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var res = JSON.parse(request.response);
      getTasks();

      console.log(res);
    } else {
      // We reached our target server, but it returned an error
      console.log('error');
    }
  };

  // if (localStorage.getItem('tasks') === null) {
  //   let tasks = [];
  //   tasks.push(task);
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // } else {
  //   let tasks = JSON.parse(localStorage.getItem('tasks'));
  //   tasks.push(task);
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }



  console.log("temos isso no task do bd", JSON.stringify(task));

  // Reset form-Task
  document.getElementById('form-Task').reset();
  e.preventDefault();

}


function deleteTask(scheduleId) {
  console.log(scheduleId);
  var request = new XMLHttpRequest();
  request.open('DELETE', 'http://localhost:3020/schedule/' + scheduleId, true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.send();
  request.onload = function () {
    console.log("delete")
    // Begin accessing JSON data here
    if (request.status === 204) {
      
      alert("Deletado")
      getTasks();
    } 
  }
}


function getTasks() {

  let tasks = [];
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  var request = new XMLHttpRequest();   
  request.open('GET', 'http://localhost:3020/schedule', true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.send();
  request.onload  = function () {
    console.log("get")
    if (request.status === 200) {
      tasks =  JSON.parse(request.response);
      for (let i = 0; i < tasks.length; i++) {
        // let data = moment(tasks[i].date, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
      let auxDate = tasks[i].dateConverted.split(" ");
        let date = auxDate[0];
        let horario = auxDate[1];
        let team_owner = tasks[i].owner.team;
        let team_rival = tasks[i].rival ? tasks[i].rival.team : "";
        let status = tasks[i].status;
        let scheduleId = tasks[i].id;
        // let horario = data.format('DD-MM-YYYY');      

        tasksView.innerHTML +=
          `<div class="card mb-3">
            <div class="card-body">
            <div class="row">
              <div class="col-sm-3 text-left">
                <p>${team_owner}</p>
                <p>X</p>
                <p>${team_rival}</p>
              </div>
              <div class="col-sm-3 text-left" style="margin-left:-1%; width:30px;">
                 <p background-color="red">${date}</p>
                 <p background-color="red">${horario}</p>
               </div>
              <div class="col-sm-3 text-left"  style="margin-left:-1%">
                <p>${status}</p>
              </div>
              <div class="col-sm-15 text-right"  style="z-index:0">
                <a href="#" onclick="deleteTask('${scheduleId}')" class="btn btn-danger ml-5" style="margin-top:-12%">X</a>
                <a href="#" onclick="loadTaskToUpdate('${tasks[i].dateConverted}','${scheduleId}')" class="btn btn-danger ml-2" style="
                margin-top:-12%; 
                margin-left:4%;
                background-color: #2ef3b1d8;
                color:black; 
                border-color:#2ef3b1d8"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                >
                <img src="/assets/pencil.svg" alt="" style="width: 100%">
                </a>
              </div>
            </div>  
           </div>
          </div>`;
    
      }
    }
  }
  
  // console.log(tasks);



}
getTasks();