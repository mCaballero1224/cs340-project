const addCharacterForm = document.getElementById('add-player-form');

addCharacterForm.addEventListener("submit", function(e) {
	e.preventDefault();

  if (!confirm("Are you sure you want to submit this query?")) {
    return; 
  }

  // get form fields to pull data from
	const inputSessionId = document.querySelector("#add-player-form fieldset #input-session-id");
	const inputUsername = document.querySelector("#add-player-form fieldset #input-player-username");

  // pull data from form fields
  let sessionIdValue = inputSessionId.value;
  let usernameValue = inputUsername.value;

  if (isNaN(sessionIdValue)) {
    sessionIdValue = 'NULL';
  }

  // put data into an object to prep for sendoff
  let data = {
    session_id: sessionIdValue,
    username: usernameValue,
  }

  // prep AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-player", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // add new data to the table
      addRowToTable(xhttp.response);
      // clear the input fields for another transaction
      sessionIdValue = '';
      usernameValue = '';
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
  let playerIdCell = document.createElement("TD");
  let usernameCell = document.createElement("TD");
  let sessionIdCell = document.createElement("TD");

  // fill cells with correct data
  editCell.innerHTML = `Edit`;
  editCell.classList.add("edit-link");
  deleteCell.classList.add("delete-link");
  deleteCell.innerHTML = `Delete`;
  deleteCell.onclick = function() {
    deletePlayer(newRow.player_id);
  }
  playerIdCell.innerText = newRow.player_id;
  usernameCell.innerText = newRow.username;
  sessionIdCell.innerText = newRow.session_id;

  // add the cells to the row
  row.appendChild(editCell);
  row.appendChild(deleteCell);
  row.appendChild(playerIdCell);
  row.appendChild(usernameCell);
  row.appendChild(sessionIdCell);
  // add the row to the table
  currentTable.appendChild(row);
};
