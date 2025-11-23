const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Middleware pour lire le body des formulaires
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pour servir les fichiers dans /public
app.use(express.static(path.join(__dirname, "public")));

// Vue moteur
app.set("view engine", "ejs");

// Routes GET
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/commande", (req, res) => res.render("commande", { success: false }));

app.get("/commande", (req, res) => {
  res.render("commande", { success: false });
});

// Route POST (une seule !)
app.post("/commande", (req, res) => {
  const { name, email, phone, product, quantity, message } = req.body;

  console.log("Nouvelle commande reçue : ", req.body);

  // Renvoie la page avec modal + nom du client
  res.render("commande", { success: true, name });
});

// Démarrage du serveur
app.listen(port, () =>
  console.log(`Notre application est lancée sur http://localhost:${port}`)
);
