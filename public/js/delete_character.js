/*
function deleteCharacter(characterId) {
  let link = '/delete-character';
  let data = {
    id: characterId
  };
  
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-character", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      deleteRow(characterId);
    } else if (xhttp.readystate == 4 && xhttp.status != 204) {
      console.log("There was an error with the input");
    }
  };
  xhttp.send(JSON.stringify(data));
};


function deleteRow(characterId) {
  let table = documnet.querySelector("table tbody");
  for (let i = 0, row; row = table.rows[i]; i++) {
    if (table.rows[i].getAttribute("data-value") == characterId) {
      table.deleteRow(i);
      break;
    }
  }
};

*/
