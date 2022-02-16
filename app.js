document.getElementById('form-Task').addEventListener('submit', saveTask);

// Save new To-Do
function saveTask(e) {

  let titulo = document.getElementById('title').value;
  let categoria = document.getElementById('category').value;
  let valor = parseInt(document.getElementById('value').value);
  let tipo = document.getElementById('type').value;

  let task = {
    titulo,
    valor,
    tipo,
    categoria,
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
  //   };

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

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/transacao', true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var res = JSON.parse(xhr.response);
            console.log(res);
        }
    };

    xhr.send(JSON.stringify(task));


  console.log("temos isso no task do bd", JSON.stringify(task));

  // Reset form-Task
  document.getElementById('form-Task').reset();
  e.preventDefault();

}

// Delete To-Do 
function deleteTask(titulo) {

  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].titulo == titulo) {
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
    let titulo = tasks[i].titulo;
    let categoria = tasks[i].categoria;
    let valor = parseInt(tasks[i].valor);
    let tipo = tasks[i].tipo;

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


    // console.log("temos isso no task do bd", JSON.stringify(task));

    tasksView.innerHTML +=
      `<div class="card mb-3">
        <div class="card-body">
        <div class="row">
          <div class="col-sm-3 text-left">
            <p>${titulo}</p>
          </div>
          <div class="col-sm-3 text-left"  style="margin-left:-1%">
            <p>${categoria}</p>
          </div>
          <div class="col-sm-3 text-left"  style="margin-left:-1%; z-index:0">
            <p>${valor}</p>
          </div>
          <div class="col-sm-3 text-left" style="margin-left:-1%; width:30px;">
            <p>${tipo}</p>
          </div>
          <div class="col-sm-15 text-right"  style="z-index:0">
            <a href="#" onclick="deleteTask('${titulo}')" class="btn btn-danger ml-5" style="margin-top:-12%">X</a>
          </div>
        </div>  
       </div>
      </div>`;

  }

  // console.log(tasks);



}

getTasks();