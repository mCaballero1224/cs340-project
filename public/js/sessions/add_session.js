const addSessionForm = document.getElementById('add-session-form');

addSessionForm.addEventListener("submit", function(e) {
	e.preventDefault();

  if (!confirm("Are you sure you want to submit this query?")) {
    return; 
  }

  // get form fields to pull data from
  const inputMapLocation = document.querySelector("#add-session-form fieldset #input-map-location");

  const startTime = new Date();
  // pull data from form fields
  let mapLocationValue = inputMapLocation.value;
  let startTimeValue = startTime.toISOString().slice(0, 19).replace('T', ' ');

  // put data into an object to prep for sendoff
  let data = {
    map_location: mapLocationValue,
    start_time: startTimeValue,
    numPlayers: 0
  }

  // prep AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-session", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // add new data to the table
      addRowToTable(xhttp.response);
      // clear the input fields for another transaction
      mapLocationValue = '';
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
  let sessionIdCell = document.createElement("TD");
  let startTimeCell = document.createElement("TD");
  let numPlayersCell = document.createElement("TD");
  let mapLocationCell = document.createElement("TD");

  // fill cells with correct data
  editCell.innerHTML = `Edit`;
  editCell.classList.add("edit-link");
  deleteCell.classList.add("delete-link");
  deleteCell.innerHTML = `Delete`;
  deleteCell.onclick = function() {
    deleteCharacter(newRow.session_id);
  }

  let startTime = new Date(newRow.start_time);
  console.log(startTime.toString());

  sessionIdCell.innerText = newRow.session_id;
  startTimeCell.innerText = startTime.toString();
  numPlayersCell.innerText = newRow.num_players;
  mapLocationCell.innerText = newRow.map_location;

  // add the cells to the row
  row.appendChild(editCell);
  row.appendChild(deleteCell);
  row.appendChild(sessionIdCell);
  row.appendChild(startTimeCell);
  row.appendChild(numPlayersCell);
  row.appendChild(mapLocationCell);
  // add the row to the table
  currentTable.appendChild(row);

  toggleAddForm();
};
