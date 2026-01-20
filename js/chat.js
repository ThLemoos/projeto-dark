const firebaseConfig = {
    apiKey: "AIzaSyCHhGYceXMmvvBgrozXVSaGSHivQw8fC1A",
    authDomain: "chat-secreto-thbruna.firebaseapp.com",
    projectId: "chat-secreto-thbruna",
    storageBucket: "chat-secreto-thbruna.firebasestorage.app",
    messagingSenderId: "197645756975",
    appId: "1:197645756975:web:ae7399ad4e11e8fe22b4da"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let user = localStorage.getItem('user');
if (!user) {
    user = prompt("Você é Thiago ou Bruna?");
    localStorage.setItem('user', user);
}

const messagesDiv = document.getElementById('messages');
const input = document.getElementById('messageInput');

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    db.collection('messages').add({
        user: user,
        text: text,
        created: firebase.firestore.FieldValue.serverTimestamp()
    });

    input.value = '';
}

db.collection('messages')
    .orderBy('created')
    .onSnapshot(snapshot => {
        messagesDiv.innerHTML = '';

        snapshot.forEach(doc => {
            const msg = doc.data();
            const div = document.createElement('div');
            div.classList.add('message');

            if (msg.user === user) {
                div.classList.add('me');
                div.textContent = msg.text;
            } else {
                div.classList.add('other');
                div.textContent = `${msg.user}: ${msg.text}`;
            }

            messagesDiv.appendChild(div);
        });

        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });

function logout() {
    localStorage.removeItem('user');
    window.location.replace('index.html');
}
