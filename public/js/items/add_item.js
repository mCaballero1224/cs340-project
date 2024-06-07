const addItemForm = document.getElementById('add-item-form');

addItemForm.addEventListener("submit", function(e) {
	e.preventDefault();

  if (!confirm("Are you sure you want to submit this query?")) {
    return; 
  }

  // get form fields to pull data from
	const inputItemDesc = document.querySelector("#add-item-form fieldset #add-item-desc");
	const inputItemType = document.querySelector("#add-item-form fieldset #add-item-type");
	const inputStat = document.querySelector("#add-item-form fieldset #add-item-stat");

  // pull data from form fields
  let itemDescValue = inputItemDesc.value;
  let itemTypeValue = inputItemType.value;
  let statValue = inputStat.value || 'NULL' ;

  // put data into an object to prep for sendoff
  let data = {
    item_desc: itemDescValue,
    item_type: itemTypeValue,
    item_stat: statValue
  }

  // prep AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-item", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // add new data to the table
      addRowToTable(xhttp.response);
      // clear the input fields for another transaction
      itemDescValue = '';
      itemTypeValue = '';
      statValue  = '';
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
  console.log(newRow);

  // create a row and cells
  let row = document.createElement("TR");
  let editCell = document.createElement("TD");
  let deleteCell = document.createElement("TD");
  let itemIdCell = document.createElement("TD");
  let itemDescCell = document.createElement("TD");
  let itemTypeCell = document.createElement("TD");
  let itemStatCell = document.createElement("TD");

  // fill cells with correct data
  editCell.innerHTML = `Edit`;
  editCell.classList.add("edit-link");
  deleteCell.classList.add("delete-link");
  deleteCell.innerHTML = `Delete`;
  deleteCell.onclick = function() {
    deleteCharacter(newRow.character_id);
  }

  row.setAttribute("data-value", newRow.item_id);
  itemIdCell.innerText = newRow.item_id;
  itemDescCell.innerText = newRow.item_desc;
  itemTypeCell.innerText = newRow.item_type;
  itemStatCell.innerText = newRow.item_stat;

  // add the cells to the row
  row.appendChild(editCell);
  row.appendChild(deleteCell);
  row.appendChild(itemIdCell);
  row.appendChild(itemDescCell);
  row.appendChild(itemTypeCell);
  row.appendChild(itemStatCell);
  // add the row to the table
  currentTable.appendChild(row);

  toggleAddForm();
};
