// get the ojbects we need to modify
let updateCharacterForm = document.getElementById('update-character-form');

// modify the objects we need 
updateCharacterForm.addEventListener("submit", function(e) {
  // prevent the form from submitting
  e.preventDefault();

  // get the form fields we need to pull data from
  let inputCharacterId = document.getElementById("mySelect");
  let inputPlayerId = document.getElementById("update-player-id");
  let inputName = document.getElementById("update-character-name");
  let inputLevel = document.getElementById("update-character-level");
  let inputExperience = document.getElementById("update-character-experience");
  let inputAgility = document.getElementById("update-character-agility");
  let inputStrength = document.getElementById("update-character-strength");
  let inputMagic = document.getElementById("update-character-magic");
  let inputHealth = document.getElementById("update-character-health");

  // get the values from the form fields
  let characterIdValue = inputCharacterId.value;
  let playerIdValue = inputPlayerId.value;
  let nameValue = inputName.value;
  let levelValue = inputLevel.value;
  let experienceValue = inputExperience.value;
  let agilityValue = inputAgility.value;
  let strengthValue = inputStrength.value;
  let magicValue = inputMagic.value;
  let healthValue = inputHealth.value;

  if (isNaN(playerId)) {
    return;
  }

  // slap data into object
  let data = {
    characterId: characterIdValue,
    playerId: playerIdValue,
    name: nameValue,
    level: levelValue,
    experience: experienceValue,
    agility: agilityValue,
    strength: strengthValue,
    magic: magicValue,
    health: healthValue
  };

  // setup ajax request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "put-character", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // tell ajax request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // add the new data to the table
      updateRow(xhttp.response, characterIdValue); 
    }
  };
});

function setupCharacterEdit(characterId) {
  showUpdateForm();
 // get the form fields we need to enter data into 
  let inputCharacterId = document.getElementById("mySelect");
  let inputPlayerId = document.getElementById("update-player-id");
  let inputName = document.getElementById("update-character-name");
  let inputLevel = document.getElementById("update-character-level");
  let inputExperience = document.getElementById("update-character-experience");
  let inputAgility = document.getElementById("update-character-agility");
  let inputStrength = document.getElementById("update-character-strength");
  let inputMagic = document.getElementById("update-character-magic");
  let inputHealth = document.getElementById("update-character-health");


  let table = document.querySelector("table tbody");
  for (let i = 0, row; row = table.rows[i]; i++) {
   if (table.rows[i].getAttribute("data-value") == characterId) {
     inputCharacterId.value = row.cells[2].innerText;
     inputPlayerId.value = row.cells[3].innerText;
     inputName.value = row.cells[4].innerText;
     inputLevel.value = row.cells[5].innerText;
     inputExperience.value = row.cells[6].innerText;
     inputAgility.value = row.cells[7].innerText;
     inputStrength.value = row.cells[8].innerText;
     inputMagic.value = row.cells[9].innerText;
     inputHealth.value = row.cells[10].innerText;
   }
  }
};


function updateRow(characterIdvalue) {
  console.log('To be implemented');
}
