let socket = new SockJS('http://localhost:8080/ws');
let stompClient = Stomp.over(socket);

stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);

    stompClient.subscribe('/chatroom/public', function(message) {
        let messageBody = JSON.parse(message.body);
        displayMessage(messageBody.sender, messageBody.content);
    });

    stompClient.subscribe('/user/queue/private', function(message) {
        let messageBody = JSON.parse(message.body);
        displayMessage(messageBody.sender, messageBody.content);
    });

    document.querySelector('#message-form').addEventListener('submit', function(event) {
        event.preventDefault();
        let sender = document.querySelector('#username').value;
        let content = document.querySelector('#message').value;
        if (!sender || !content) {
            alert("Username and message should not be empty");
        } else {
            stompClient.send("/app/message", {}, JSON.stringify({ 'sender': sender, 'content': content }));
            document.querySelector('#message').value = '';
        }
    });
});

document.querySelector('#username').addEventListener('change', function(event) {
    sessionStorage.setItem('username', event.target.value);
});

let savedUsername = sessionStorage.getItem('username');
if (savedUsername) {
    document.querySelector('#username').value = savedUsername;
}

function displayMessage(sender, content) {
    let messages = document.querySelector('#messages');
    let newMessage = document.createElement('div');
    newMessage.innerHTML = '<strong>' + sender + ':</strong> ' + content;
    messages.appendChild(newMessage);
}




