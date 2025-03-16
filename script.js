// 1. Hent listen fra localStorage ved sideindlæsning
function loadList() {
  const savedList = localStorage.getItem("myList");
  if (savedList) {
    return JSON.parse(savedList);
  }
  return []; // Returner en tom liste, hvis intet er gemt endnu
}

// 2. Initialiser listen
const list = loadList().length > 0 ? loadList() : [
  { name: "Kevan og offer", setting: "fantasy", mood: ["Vold"] },
  { name: "Josef og Diana", setting: "modern", mood: ["Hårdt", "Lidenskabeligt", "Blidt"] },
  { name: "Kevan og Larra", setting: "fantasy", mood: ["Lidenskabeligt", "Forsigtigt", "Blidt", "Hårdt", "Vold"] },
  { name: "Jason og Sophia", setting: "modern", mood: ["Forsigtigt", "Lidenskabeligt", "Hårdt", "Vold"] },
  { name: "Jason og Carly", setting: "modern", mood: ["Hårdt", "Blidt"] },
  { name: "Elias og Celia", setting: "blandet", mood: ["Lidenskabeligt", "Hårdt", "Blidt", "Forsigtigt"] },
  { name: "Sarah og Jonathan", setting: "modern", mood: ["Hårdt", "Blidt", "Lidenskabeligt", "Forsigtigt"] },
  { name: "Larra og anden", setting: "fantasy", mood: ["Vold", "Forsigtigt", "Blidt", "Hårdt"] },
  { name: "Reginald og anden", setting: "post-apocalypse", mood: ["Hårdt", "Vold"] },
  { name: "Diana og Johan", setting: "modern", mood: ["Vold", "Hårdt"] },
];

// Funktion til at slette et objekt fra listen
function deleteItem(index) {
  list.splice(index, 1); // Fjern elementet fra array'et
  localStorage.setItem("myList", JSON.stringify(list)); // Opdater localStorage
  updateFullList(); // Opdater listen visuelt
}


// 3. Funktion til at gemme listen i localStorage
function saveList() {
  localStorage.setItem("myList", JSON.stringify(list));
}

//-- ASIDE LISTEN --//
function updateFullList() {
  const asideListElement = document.getElementById("arrayList");  // Listen i <aside>

  // Ryd listen først
  asideListElement.innerHTML = "";

  // Vis alle elementer i listen (uden filtrering)
  list.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
    ${item.name}
    <button class="delete-button" data-index="${index}" aria-label="Slet">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2">
        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/>
        <line x1="14" x2="14" y1="11" y2="17"/>
      </svg>
    </button>
    `;
    asideListElement.appendChild(li);
  });

  // Tilføj event listeners til slet-knapper
  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.currentTarget.getAttribute('data-index');
      deleteItem(index);
    });
  });
}

// Dynamisk generering af mood-checkboxes
const allMoods = [...new Set(list.flatMap(obj => obj.mood))];
const moodContainer = document.getElementById('moodCheckboxes');
allMoods.forEach(mood => {
  const label = document.createElement('label');
  label.innerHTML = `
    <input type="checkbox" class="mood-checkbox" value="${mood}"> ${mood}
  `;
  moodContainer.appendChild(label);
});


// Funktion til at tilføje nye elementer til listen
function addToArray() {
  const newItem = document.getElementById("newItem").value;
  const newSetting = document.getElementById("newSetting").value;

  const selectedMoods = Array.from(document.querySelectorAll('.mood-checkbox:checked'))
    .map(checkbox => checkbox.value);

  if (newItem && newSetting && selectedMoods.length > 0) {
    list.push({ name: newItem, setting: newSetting, mood: selectedMoods });

    // Gem den opdaterede liste
    saveList();

    // Opdater visningen
    updateFullList();

    // Tøm inputfelterne
    document.getElementById("newItem").value = "";
    document.getElementById("newSetting").value = "";
    document.querySelectorAll('.mood-checkbox').forEach(checkbox => checkbox.checked = false);

    console.log("Nyt objekt tilføjet:", { name: newItem, setting: newSetting, mood: selectedMoods });
  } else {
    alert("Udfyld venligst alle felter!");
  }
}



let selectedSetting = null;
let selectedMood = null;

// Funktion til at vælge et tilfældigt par
function choose() {
  console.log("selectedSetting:", selectedSetting);
  console.log("selectedMood:", selectedMood);

  // Filtrer listen baseret på både selectedSetting og selectedMood
  let filteredList = list;

  if (selectedSetting && selectedSetting !== 'all') {
    filteredList = filteredList.filter(item => item.setting === selectedSetting);
  }

  if (selectedMood && selectedMood !== 'all') {
    filteredList = filteredList.filter(item => item.mood.includes(selectedMood)); // Tjekker, om mood er i arrayet
  }

  // Vælg et tilfældigt element fra den filtrerede liste
  return filteredList[Math.floor(Math.random() * filteredList.length)];
}


// Event listener for filtrering af setting
document.querySelectorAll(".filter-setting").forEach(button => {
  button.addEventListener("click", () => {
    console.log("Setting button clicked:", button.getAttribute("data-setting"));

    // Fjern 'active' klassen fra alle knapper
    document.querySelectorAll(".filter-setting").forEach(btn => btn.classList.remove("active"));

    // Tilføj 'active' klassen til den valgte knap
    button.classList.add("active");

    // Sæt den valgte setting
    selectedSetting = button.getAttribute("data-setting") || "all";
  });
});

// Event listener for filtrering af mood
document.querySelectorAll(".filter-mood").forEach(button => {
  button.addEventListener("click", () => {
    console.log("Mood button clicked:", button.getAttribute("data-mood"));

    // Fjern 'active' klassen fra alle knapper
    document.querySelectorAll(".filter-mood").forEach(btn => btn.classList.remove("active"));

    // Tilføj 'active' klassen til den valgte knap
    button.classList.add("active");

    // Sæt den valgte mood
    selectedMood = button.getAttribute("data-mood") || "all";
  });
});

// Event listener for at generere resultatet
document.getElementById("chooseButton").addEventListener("click", () => {
  visResultat(); // Nu vil resultatet kun blive opdateret når denne knap trykkes
});

// Funktion til at vise resultatet (vælg par)
function visResultat() {
  const resultat = choose();
  const resultatElement = document.getElementById("resultat");
  if (resultat) {
    resultatElement.textContent = `Vi skal spille: ${resultat.name}`;
  } else {
    resultatElement.textContent = "Ingen par fundet.";
  }
}
// Initial opdatering af visningen ved sideindlæsning (valgt kategori: all)
document.addEventListener("DOMContentLoaded", () => {

  // Sørg for at 'all' er aktiv ved indlæsning
  document.querySelector(".filter-setting[data-setting='all']").classList.add("active");

  document.querySelector(".filter-mood[data-mood='all']").classList.add("active");

  // Vis den fulde liste i <aside> (uden filtrering)
  updateFullList();
});
