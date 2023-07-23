document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.getElementById('chat');
  const userInputForm = document.getElementById('user-input');
  const userInputField = document.getElementById('message');

  userInputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const userMessage = userInputField.value.trim();
    if (userMessage !== '') {
      appendMessage('user', userMessage);
      userInputField.value = '';

      // Make an AJAX POST request to the backend
      fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })
        .then((response) => response.json())
        .then((data) => {
          const chatbotReply = data.chatbotReply;
          appendMessage('chatbot', chatbotReply);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  });

  function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
  }
});
