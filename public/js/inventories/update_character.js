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

  if (isNaN(playerIdValue)) {
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
  xhttp.open("PUT", "/put-character", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // tell ajax request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // add the new data to the table
      updateRow(xhttp.response, characterIdValue); 
    }
    else if (xhttp.readyState == 4&& xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  xhttp.send(JSON.stringify(data));
  toggleUpdateForm();
  alert(`Character #${characterIdValue} has been updated.`);
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

  updateCharacterForm.scrollIntoView();
};


function updateRow(data, characterId) {
  let parsedData = JSON.parse(data);

  let table = document.querySelector('table tbody');
  
  for (let i = 0, row; row = table.rows[i]; i++) {
    if (table.rows[i].getAttribute("data-value") == characterId) {
      let updateRowIndex = table.getElementsByTagName("tr")[i];
      let playerIdCell = updateRowIndex.getElementsByTagName("td")[3]
      let nameCell = updateRowIndex.getElementsByTagName("td")[4]
      let levelCell = updateRowIndex.getElementsByTagName("td")[5]
      let experienceCell = updateRowIndex.getElementsByTagName("td")[6]
      let agilityCell = updateRowIndex.getElementsByTagName("td")[7]
      let strengthCell = updateRowIndex.getElementsByTagName("td")[8]
      let magicCell = updateRowIndex.getElementsByTagName("td")[9]
      let healthCell = updateRowIndex.getElementsByTagName("td")[10]

      playerIdCell.innerText = parsedData[0].player_id;
      nameCell.innerText = parsedData[0].name;
      levelCell.innerText = parsedData[0].level;
      experienceCell.innerText = parsedData[0].experience;
      agilityCell.innerText = parsedData[0].agility;
      strengthCell.innerText = parsedData[0].strength;
      magicCell.innerText = parsedData[0].magic;
      healthCell.innerText = parsedData[0].health;

    }
  }
}
