document.getElementById('form-Task').addEventListener('submit', saveTask);

// Save new To-Do
function saveTask(e) {

    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;

    let task = {
        password,
        email
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3020/sessions', true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var res = JSON.parse(xhr.response);
            alert('Logado');
            console.log(res);
        }
    };

    xhr.send(JSON.stringify(task));




    // // Reset form-Task
    // document.getElementById('form-Task').reset();
    //  e.preventDefault();

}
