// Startdata til listen
const list = [
  { name: "Kevan og offer", setting: "fantasy", mood: ["vold"] },
  { name: "Josef og Diana", setting: "modern", mood: ["hårdt", "lidenskabeligt", "blidt"] },
  { name: "Kevan og Larra", setting: "fantasy", mood: ["lidenskabeligt", "forsigtigt", "blidt", "hårdt", "vold"] },
  { name: "Jason og Sophia", setting: "modern", mood: ["forsigtigt", "lidenskabeligt", "hårdt", "vold"] },
  { name: "Jason og Carly", setting: "modern", mood: ["hårdt", "blidt"] },
  { name: "Elias og Celia", setting: "blandet", mood: ["lidenskabeligt", "hårdt", "blidt", "forsigtigt"] },
  { name: "Sarah og Jonathan", setting: "modern", mood: ["hårdt", "blidt", "lidenskabeligt", "forsigtigt"] },
  { name: "Larra og anden", setting: "fantasy", mood: ["vold", "forsigtigt", "blidt", "hårdt"] },
  { name: "Reginald og anden", setting: "post-apocalypse", mood: ["hårdt", "vold"] },
  { name: "Diana og Johan", setting: "modern", mood: ["vold", "hårdt"] },
];

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
    updateFullList(); // Opdater listen i <aside>
  } else {
    alert("Udfyld alle felter og vælg mindst én mood.");
  }
}

// Funktion til at vise den fulde liste i <aside>
function updateFullList() {
  const asideListElement = document.getElementById("arrayList");

  // Ryd listen først
  asideListElement.innerHTML = "";

  if (list.length === 0) {
    asideListElement.innerHTML = "<li>Ingen elementer i listen endnu.</li>";
  } else {
    // Vis alle elementer i listen
    list.forEach(item => {
      let li = document.createElement("li");
      li.textContent = item.name;
      asideListElement.appendChild(li);
    });
  }
}

// Opdater listen ved load
updateFullList();
