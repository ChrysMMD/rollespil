function choose() {
  const list = ["Kev og offer", "Kev og Larra", "Josef og Diana", "Jason og Sofia", "Jason og Carly", "Elias og Celia", "Sarah og Jonathan", "Larra og anden", "Sexkink", "Reginald og anden"];
  return list[Math.floor(Math.random() * list.length)];
}

console.log(choose());


function visResultat() {
  const resultat = choose();
  const resultatElement = document.getElementById("resultat");
  resultatElement.textContent = `Vi skal spille: ${resultat}`;
}