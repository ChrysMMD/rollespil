let list = [
  "Kev og offer",
  "Kev og Larra",
  "Josef og Diana",
  "Jason og Sophia",
  "Jason og Carly",
  "Elias og Celia",
  "Sarah og Jonathan",
  "Larra og anden",
  "Sexkink",
  "Reginald og anden"
];

// Kør updateList() ved sideindlæsning, så listen vises korrekt
document.addEventListener("DOMContentLoaded", updateList);

function choose() {
  return list[Math.floor(Math.random() * list.length)];
}

function visResultat() {
  const resultat = choose();
  const resultatElement = document.getElementById("resultat");
  resultatElement.textContent = `Vi skal spille: ${resultat}`;
}

function addToArray() {
  let newItem = document.getElementById("newItem").value;
  if (newItem.trim() !== "") {
    list.push(newItem);
    document.getElementById("newItem").value = "";
    visResultat();
    updateList(); // Opdater listen på siden
  } else {
    alert("Du skal skrive noget!");
  }
}

function updateList() {
  const listElement = document.getElementById("arrayList");
  listElement.innerHTML = ""; // Ryd listen først

  list.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    listElement.appendChild(li);
  });
}

function toggleList() {
  const listElement = document.getElementById("arrayList");
  if (listElement.style.display === "none" || listElement.style.display === "") {
    listElement.style.display = "block"; // Vis listen
  } else {
    listElement.style.display = "none"; // Skjul listen
  }
}
