const modal = document.getElementById("modal");
const closeModal = document.querySelector(".modal .close");

// Fermer modal quand on clique sur la croix
if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// Fermer modal quand on clique en dehors
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Redirection automatique après 5 secondes
// newFunction();
// function newFunction() {
//   if (modal && modal.classList.contains("show")) {
//     setTimeout(() => {
//       window.location.href = "/";
//     }, 10000);
//   }
// }
