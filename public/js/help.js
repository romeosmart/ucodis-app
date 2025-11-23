// Sélection des éléments
const helpBtn = document.querySelector(".help-btn");
const helpBox = document.querySelector(".help-box");
const helpClose = document.querySelector(".help-close");
const chatForm = document.getElementById("chatForm");
const chatMessage = document.getElementById("chatMessage");
const chatBody = document.getElementById("chatBody");

// Ouvrir le chat
helpBtn.addEventListener("click", () => {
  helpBox.style.display = "flex";
  chatMessage.focus();
});

// Fermer le chat
helpClose.addEventListener("click", () => {
  helpBox.style.display = "none";
});

// Envoi message
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = chatMessage.value.trim();
  if (!text) return;

  addMessage(text, "user"); // message utilisateur
  chatMessage.value = "";

  // Envoi au serveur Flask
  // code local fetch("http://127.0.0.1:10000/chatbot"
  try {
    const res = await fetch("https://ucodis-app-chat.onrender.com/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();

    // Si le bot renvoie "commande" ou "prêt", on ajoute un bouton
    if (data.replyType === "commande") {
      const buttonHTML = `<p>Si vous êtes prêt à commander, cliquez ci-dessous :</p><button class="bot-order-btn" onclick="window.location.href='/commande'">
        Passer une commande
      </button>`;
      addMessage(buttonHTML, "auto", true);
    } else {
      addMessage(data.reply, "auto");
    }
  } catch (err) {
    addMessage("Le serveur ne répond pas.", "auto");
  }
});

// Ajouter un message
function addMessage(content, type, isHTML = false) {
  const msg = document.createElement("div");
  msg.classList.add("msg", type); // type = user ou auto
  if (isHTML) {
    msg.innerHTML = content; // si on veut ajouter un bouton ou HTML
  } else {
    msg.textContent = content; // texte simple
  }
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}
