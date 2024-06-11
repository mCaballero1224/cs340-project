const addCharacterForm = document.getElementById('add-inventory-form');

addCharacterForm.addEventListener("submit", function(e) {
	e.preventDefault();

  if (!confirm("Are you sure you want to submit this query?")) {
    return; 
  }

  // get form fields to pull data from
	const inputCharacterId = document.querySelector("#add-inventory-form fieldset #input-character-id");
	const inputItemId = document.querySelector("#add-inventory-form fieldset #input-item-id");
	const inputQuantity = document.querySelector("#add-inventory-form fieldset #input-quantity");

  // pull data from form fields
  let characterIdValue = inputCharacterId.value;
  let itemIdValue = inputItemId.value;
  let quantityValue = inputQuantity.value;

  // put data into an object to prep for sendoff
  let data = {
    character_id: characterIdValue,
    item_id: itemIdValue,
    quantity: quantityValue 
  }

  // prep AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-inventory", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // add new data to the table
      addRowToTable(xhttp.response);
      // clear the input fields for another transaction
      characterIdValue  = '';
      itemIdValue  = '';
      quantityValue  = '';
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
  let itemIdCell = document.createElement("TD");
  let quantityCell = document.createElement("TD");

  // fill cells with correct data
  editCell.innerHTML = `Edit`;
  editCell.classList.add("edit-link");
  deleteCell.classList.add("delete-link");
  deleteCell.innerHTML = `Delete`;
  deleteCell.onclick = function() {
    deleteCharacter(newRow.character_id);
  }

  row.setAttribute("data-value", `${newRow.character_id} ${newRow.item_id}`);
  characterIdCell.innerText = newRow.character_id;
  itemIdCell.innerText = newRow.item_id;
  quantityCell.innerText = newRow.quantity;

  // add the cells to the row
  row.appendChild(editCell);
  row.appendChild(deleteCell);
  row.appendChild(characterIdCell);
  row.appendChild(itemIdCell);
  row.appendChild(quantityCell);
  // add the row to the table
  currentTable.appendChild(row);

  toggleAddForm();
};
