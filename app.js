document.getElementById('form-Task').addEventListener('submit', saveTask);

// Save new To-Do
function saveTask(e) {

  let modalidade = document.getElementById('modalidade').value;
  let id_lider = document.getElementById('id_lider').value;
  let data= parseInt(document.getElementById('data').value);
  let horario = document.getElementById('horario').value;

  let task = {
    modalidade,
    id_lider,
    data,
    horario,
  };

  // var data = { titulo, valor, tipo, categoria };

  //   var xhr = new XMLHttpRequest();
  //   xhr.open('POST', 'http://localhost:3000/transacao', true);
  //   xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  //   xhr.onreadystatechange = function () {
  //       if (xhr.readyState === 4 && xhr.status === 200) {
  //           var res = JSON.parse(xhr.response);
  //           console.log(res);
  //       }
  //  };

  //   xhr.send(JSON.stringify(task));


  // console.log("temos isso no task do bd", JSON.stringify(task));

  //

  if (localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();

    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://localhost:3000/transacao', true);
    // xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         var res = JSON.parse(xhr.response);
    //         console.log(res);
    //     }
    // };

    // xhr.send(JSON.stringify(task));


  console.log("temos isso no task do bd", JSON.stringify(task));

  // Reset form-Task
  document.getElementById('form-Task').reset();
  e.preventDefault();

}

// Delete To-Do 
function deleteTask(id_lider) {

  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id_lider == id_lider) {
      tasks.splice(i, 1);
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();

  //   var xhr = new XMLHttpRequest();
  //   xhr.open('DELETE', 'http://localhost:3000/transacao/:14', true);
  //   xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  //   xhr.onreadystatechange = function () {
  //       if (xhr.readyState === 4 && xhr.status === 200) {
  //           var res = JSON.parse(xhr.response);
  //           console.log(res);
  //       }
  //   };

  //   xhr.send();


  // console.log("temos isso no task do bd", JSON.stringify(task));
}

// Show To-Do List
function getTasks() {

  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';


  // var xhr = new XMLHttpRequest();
  // xhr.open('GET', 'http://localhost:3000/transacao', true);
  // xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  // xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //         var res = JSON.parse(xhr.response);
  //         console.log(res);


  //     }
  // };

  // xhr.send();


  for (let i = 0; i < tasks.length; i++) {
    let modalidade = tasks[i].modalidade;
    let data = tasks[i].data;
    let id_lider = tasks[i].id_lider;
    let horario = tasks[i].horario;

    console.log();

    // var xhr = new XMLHttpRequest();

    // xhr.open('POST', 'http://localhost:3000/transacao', true);
    // xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     var res = JSON.parse(xhr.response);
    //     console.log(res);
    //   }
    // };

    // xhr.send(JSON.stringify(task));

    console.log(modalidade, data, id_lider, horario);


    // console.log("temos isso no task do bd", JSON.stringify(task));

    tasksView.innerHTML +=
      `<div class="card mb-3">
        <div class="card-body">
        <div class="row">
          <div class="col-sm-3 text-left">
            <p>${modalidade}</p>
          </div>
          <div class="col-sm-3 text-left"  style="margin-left:-1%">
            <p>${data}</p>
          </div>
          <div class="col-sm-3 text-left"  style="margin-left:-1%; z-index:0">
            <p>${id_lider}</p>
          </div>
          <div class="col-sm-3 text-left" style="margin-left:-1%; width:30px;">
             <p background-color="red">${horario}</p>
           </div>
          <div class="col-sm-15 text-right"  style="z-index:0">
            <a href="#" onclick="deleteTask('${id_lider}')" class="btn btn-danger ml-5" style="margin-top:-12%">X</a>
            <a href="#" onclick="deleteTask('${id_lider}')" class="btn btn-danger ml-2" style="
            margin-top:-12%; 
            margin-left:4%;
            background-color: #2ef3b1d8;
            color:black; 
            border-color:#2ef3b1d8">
            <img src="/assets/pencil.svg" alt="" style="width: 100%">
            </a>
          </div>
        </div>  
       </div>
      </div>`;

  }

  // console.log(tasks);



}

getTasks();