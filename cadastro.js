document.getElementById('form-Task').addEventListener('submit', saveTask);

// Save new To-Do
function saveTask(e) {

    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let password = document.getElementById('password').value;
    let team = document.getElementById('team').value;
    let acronym = document.getElementById('acronym').value;
    let email = document.getElementById('email').value;

    let task = {
        name,
        lastName,
        password,
        team,
        acronym,
        email
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3020/user', true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var res = JSON.parse(xhr.response);
            console.log(res);
            alert('Usuário cadastrado com sucesso!');
        }
    };

    xhr.send(JSON.stringify(task));




    // // Reset form-Task
    // document.getElementById('form-Task').reset();
     e.preventDefault();

}
