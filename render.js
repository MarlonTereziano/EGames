if (localStorage.getItem('token') != null) {
    document.getElementById("render").innerHTML = `Bem vindo, ${JSON.parse(localStorage.getItem("User")).name}`;
    // desativar click do render
    document.getElementById("render").onclick = function () {
        return false;
    } 
    
    document.getElementById("cadastro").innerHTML = `Logout`;
    //limpar o localStorage se cadastro for clicado
    document.getElementById("cadastro").onclick = function () {
        localStorage.clear();
        window.location.href = "index.html";
    }
} else {
    document.getElementById("render").innerHTML = `Login`;
}
