const PASSWORD = "28112025";

function checkPassword() {
    const input = document.getElementById('password').value;
    const error = document.getElementById('error');

    if (input === PASSWORD) {
        localStorage.setItem('auth', 'true');
        window.location.replace('chat.html');
    } else {
        error.textContent = 'Senha incorreta';
    }
}


window.onload = () => {
    document.getElementById('password').value = '';
};