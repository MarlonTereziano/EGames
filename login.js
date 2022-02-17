document.getElementById('form-Task').addEventListener('submit', saveTask);


function saveTask(e) {

    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    let aux=false;

    let task = {
        password,
        email
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3020/sessions', true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.onload = function () {
        if (xhr.status === 200){
            aux=true;
            var res = JSON.parse(xhr.response);
            alert('Usuário Logado com sucesso!');   
            console.log(res);
            window.location.href = "http://localhost:5500/";
            localStorage.setItem('token', res['token']);
            localStorage.setItem('User', JSON.stringify(res['user']));
            console.log(localStorage.getItem('User'));
        }else{
            alert('E-mail ou senha Incorretos!');
        }
    
    };

    xhr.send(JSON.stringify(task));


    document.getElementById('form-Task').reset();
    e.preventDefault();


}
