const addCharacterForm = document.getElementById('add-character-form');

addCharacterForm.addEventListener("submit", function(e) {
	e.preventDefault();

  if (!confirm("Are you sure you want to submit this query?")) {
    return; 
  }

  // get form fields to pull data from
	const inputPlayerId = document.querySelector("#add-character-form fieldset #input-player-id");
	const inputName = document.querySelector("#add-character-form fieldset #input-character-name");
	const inputLevel = document.querySelector("#add-character-form fieldset #input-character-level");
	const inputExperiencePoints = document.querySelector("#add-character-form fieldset #input-character-experience");
	const inputAgility = document.querySelector("#add-character-form fieldset #input-character-agility");
	const inputStrength = document.querySelector("#add-character-form fieldset #input-character-strength");
	const inputMagic = document.querySelector("#add-character-form fieldset #input-character-magic");
	const inputHealth = document.querySelector("#add-character-form fieldset #input-character-health");

  // pull data from form fields
  let playerIdValue = inputPlayerId.value;
  let nameValue = inputName.value;
  let levelValue = inputLevel.value;
  let experiencePointsValue = inputExperiencePoints.value;
  let agilityValue  = inputAgility.value;
  let strengthValue  = inputStrength.value;
  let magicValue  = inputMagic.value;
  let healthValue  = inputHealth.value;

  // put data into an object to prep for sendoff
  let data = {
    player_id: playerIdValue,
    name: nameValue,
    level: levelValue,
    experience: experiencePointsValue,
    agility: agilityValue,
    strength: strengthValue,
    magic: magicValue,
    health: healthValue
  }

  // prep AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-character", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // add new data to the table
      addRowToTable(xhttp.response);
      // clear the input fields for another transaction
      playerIdValue = '';
      nameValue = '';
      levelValue = '';
      experiencePointsValue = '';
      agilityValue  = '';
      strengthValue  = '';
      magicValue  = '';
      healthValue  = '';
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    } 
  };
  // send the request and wait for the response
  xhttp.send(JSON.stringify(data));

});

// creates a single row from an Object representing a single record from Characters
addRowToTable = (data) => {
  // get reference to the current table on the page and clear it out
  let currentTable = document.querySelector("table tbody");

  // get the location where we should inser the new row (end of table)
  let newRowIndex = currentTable.rows.length;

  // get reference to the new row from the database query (last object)
  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  // create a row and 9 cells
  let row = document.createElement("TR");
  let editCell = document.createElement("TD");
  let deleteCell = document.createElement("TD");
  let characterIdCell = document.createElement("TD");
  let playerIdCell = document.createElement("TD");
  let nameCell = document.createElement("TD");
  let levelCell = document.createElement("TD");
  let experiencePointsCell = document.createElement("TD");
  let agilityCell = document.createElement("TD");
  let strengthCell = document.createElement("TD");
  let magicCell = document.createElement("TD");
  let healthCell = document.createElement("TD");

  console.log(newRow.player_id);
  // fill cells with correct data
  editCell.innerHTML = `Edit`;
  editCell.classList.add("edit-link");
  deleteCell.classList.add("delete-link");
  deleteCell.innerHTML = `Delete`;
  characterIdCell.innerText = newRow.character_id;
  playerIdCell.innerText = newRow.player_id;
  nameCell.innerText = newRow.name;
  levelCell.innerText = newRow.level;
  experiencePointsCell.innerText = newRow.experience;
  agilityCell.innerText = newRow.agility;
  strengthCell.innerText = newRow.strength;
  magicCell.innerText = newRow.magic;
  healthCell.innerText = newRow.health;

  // add the cells to the row
  row.appendChild(editCell);
  row.appendChild(deleteCell);
  row.appendChild(characterIdCell);
  row.appendChild(playerIdCell);
  row.appendChild(nameCell);
  row.appendChild(levelCell);
  row.appendChild(experiencePointsCell);
  row.appendChild(agilityCell);
  row.appendChild(strengthCell);
  row.appendChild(magicCell);
  row.appendChild(healthCell);
  // add the row to the table
  currentTable.appendChild(row);
};
