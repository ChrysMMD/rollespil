let list = ["Kev og offer", "Kev og Larra", "Josef og Diana", "Jason og Sophia", "Jason og Carly", "Elias og Celia", "Sarah og Jonathan", "Larra og anden", "Sexkink", "Reginald og anden"];

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
    list.push(newItem);  // Tilføj det nye element til arrayet
    document.getElementById("newItem").value = "";  // Ryd inputfeltet
    visResultat();  // Vis et tilfældigt resultat
    updateList();  // Opdater listen på siden
  } else {
    alert("Du skal skrive noget!");
  }
}

function updateList() {
  const listElement = document.getElementById("arrayList");
  listElement.innerHTML = ""; // Ryd listen først

  list.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;  // Tilføj hvert array-element som en <li> i HTML'en
    listElement.appendChild(li);
  });
}

function toggleList() {
  const listElement = document.getElementById("arrayList");
  if (listElement.style.display === "none" || listElement.style.display === "") {
    listElement.style.display = "block";  // Vis listen
  } else {
    listElement.style.display = "none";  // Skjul listen
  }
}

// Initial opdatering af listen, så den vises korrekt ved sideindlæsning
document.addEventListener("DOMContentLoaded", updateList);
