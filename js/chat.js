const messagesDiv = document.getElementById('messages');
const input = document.getElementById('messageInput');


function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.forEach(msg => addMessage(msg));
}


function sendMessage() {
    const text = input.value.trim();
    if (text === '') return;


    addMessage(text);


    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push(text);
    localStorage.setItem('chatMessages', JSON.stringify(messages));


    input.value = '';
}


function addMessage(text) {
    const div = document.createElement('div');
    div.className = 'message';
    div.textContent = text;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}


loadMessages();

function logout() {
    localStorage.removeItem('auth');
    window.location.replace('index.html');
}