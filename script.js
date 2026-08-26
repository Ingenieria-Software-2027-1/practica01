let clics = 0;
const contador = document.getElementById("contador");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  clics++;
  contador.textContent = clics;
});