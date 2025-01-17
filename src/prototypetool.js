function createToolPalette(){
  
    var toolPalette = document.createElement("div");
    toolPalette.setAttribute("id", "tool-palette");

    var addButtonButton = document.createElement("button");
    addButtonButton.setAttribute("id", "addButtonButton");
    addButtonButton.setAttribute("numberofbuttons","0");
    addButtonButton.setAttribute("onclick", "addButtonClicked(this)");
    addButtonButton.innerHTML = "New Button";

    toolPalette.appendChild(addButtonButton);

    var deleteButtonButton = document.createElement("button");
    deleteButtonButton.setAttribute("id", "deleteButtonButton");
    deleteButtonButton.setAttribute("onclick", "deleteButtonClicked(this)");
    deleteButtonButton.innerHTML = "Delete Button";

    toolPalette.appendChild(deleteButtonButton);

    var newLinkButton = document.createElement("button");
    newLinkButton.setAttribute("id", "newLinkButton");
    newLinkButton.setAttribute("onclick", "newLinkButtonClicked(this)");
    newLinkButton.innerHTML = "New Link";

    toolPalette.appendChild(newLinkButton);

    var addFileButton = document.createElement("input");
    addFileButton.setAttribute("id", "addFileButton");
    addFileButton.setAttribute("type", "file");
    addFileButton.setAttribute("accept", "image/*");
    addFileButton.setAttribute("onchange", "pictureSelected(this)");

    toolPalette.appendChild(addFileButton);

    var deleteScreenButton = document.createElement("button");
    deleteScreenButton.setAttribute("id", "deleteScreenButton");
    deleteScreenButton.setAttribute("onclick", "deleteScreenButtonClicked(this)");
    deleteScreenButton.innerHTML = "Delete Screen";

    toolPalette.appendChild(deleteScreenButton);

    document.body.appendChild(toolPalette);
}

function createData(){
  var data = document.createElement("div");
  data.setAttribute("id", "data");

  document.body.appendChild(data);

  var linkoverlay = document.createElementNS("http://www.w3.org/2000/svg","svg");
  linkoverlay.setAttribute("id","linkoverlay");

  document.body.appendChild(linkoverlay);
}

function refreshDraggable(){
  $( ".draggable" ).draggable({ 
    containment: "parent",
    stop: function( event, ui ) {
             createLines();
          }
  });
}

function createLines(){

  var elements = document.getElementsByTagName('line');
  for (var i=0; i<elements.length; i++) {
    var currentLine = elements[i];
    var pos1 = $('#'+currentLine.getAttribute("from")).offset();
    var pos2 = $('#'+currentLine.getAttribute("to")).offset();
    
    currentLine.setAttribute('x1', pos1.left);
    currentLine.setAttribute('y1',pos1.top);
    currentLine.setAttribute('x2', pos2.left);
    currentLine.setAttribute('y2',pos2.top);
  }    
}

//ADD BUTTON FUNCTIONALITY

function addButtonClicked(clickedButton){

  if(clickedButton.innerHTML == "New Button"){
    clickedButton.setAttribute("numberofbuttons", parseInt(clickedButton.getAttribute("numberofbuttons")) + 1);

    elements = document.getElementsByClassName("imgcontainer");
    for (var i=0; i<elements.length; i++) {
      elements[i].classList.add('selectable');
      
      elements[i].addEventListener("click", divSelectedForAddButton, false);
    }

    clickedButton.innerHTML = "Cancel";

  }

  else if(clickedButton.innerHTML == "Cancel"){
    
    elWithEL = document.getElementsByClassName("imgcontainer");
    for (var k=0; k<elWithEL.length; k++) {
      elWithEL[k].removeEventListener("click", divSelectedForAddButton, false);
      elWithEL[k].classList.remove("selectable");
    }

    clickedButton.innerHTML = "New Button";

  }
}

function divSelectedForAddButton(){
  console.log(this.id);

  var newButton = document.createElement("div");
  newButton.classList.add("linkbutton");
  newButton.classList.add("draggable");

  var addButtonButton = document.getElementById("addButtonButton");
  newButton.id = "b" + addButtonButton.getAttribute("numberofbuttons"); 

  this.appendChild(newButton);
  refreshDraggable();
  //remove evenlisteners again

  el = document.getElementsByClassName("imgcontainer");
  for (var j=0; j<el.length; j++) {
    el[j].removeEventListener("click", divSelectedForAddButton, false);
    el[j].classList.remove("selectable");
  }

  addButtonButton.innerHTML = "New Button";    
}


//DELETE BUTTON FUNCTIONALITY

function deleteButtonClicked(clickedButton){
  if(clickedButton.innerHTML == "Delete Button"){

    elements = document.getElementsByClassName("linkbutton");
    for (var i=0; i<elements.length; i++) {
      elements[i].classList.add('selectable');
      elements[i].addEventListener("click", buttonSelectedForDelete, false);
    }

    clickedButton.innerHTML = "Cancel";

  }

  else if(clickedButton.innerHTML == "Cancel"){
    
    elWithEL = document.getElementsByClassName("linkbutton");
    for (var k=0; k<elWithEL.length; k++) {
      elWithEL[k].removeEventListener("click", buttonSelectedForDelete, false);
      elWithEL[k].classList.remove("selectable");
    }

    clickedButton.innerHTML = "Delete Button";

  }
}  

function buttonSelectedForDelete(){
  console.log(this.id);

  adherentLine = document.getElementById("lineFrom" + this.id);
  if(adherentLine){
    adherentLine.parentNode.removeChild(adherentLine);
  }

  this.parentNode.removeChild( this );

  el = document.getElementsByClassName("linkbutton");
  for (var j=0; j<el.length; j++) {
    el[j].removeEventListener("click", buttonSelectedForDelete, false);
    el[j].classList.remove("selectable");
  }

  document.getElementById("deleteButtonButton").innerHTML = "Delete Button";
}


//NEW LINK BUTTON FUNCTIONALITY

function newLinkButtonClicked(clickedButton){

  if(clickedButton.innerHTML == "New Link"){

    elements = document.getElementsByClassName("linkbutton");
    for (var i=0; i<elements.length; i++) {
      elements[i].classList.add('selectable');
      elements[i].addEventListener("click", buttonSelectedForLink, false);
    }

    clickedButton.innerHTML = "Cancel";

  }

  else if(clickedButton.innerHTML == "Cancel"){
    
    elWithEL = document.getElementsByClassName("linkbutton");
    for (var k=0; k<elWithEL.length; k++) {
      elWithEL[k].removeEventListener("click", buttonSelectedForLink, false);
      elWithEL[k].classList.remove("selectable");
    }

    elWithEL2 = document.getElementsByClassName("imgcontainer");
    for (var j=0; j<elWithEL2.length; j++) {
      elWithEL2[j].removeEventListener("click", endDivSelectedForLink, false);
      elWithEL2[j].classList.remove("selectable");
    }

    var allLines = document.getElementsByTagName("line");
    if(allLines != null && allLines.length != 0){
      lastLine = allLines[allLines.length-1];
      if(lastLine.getAttribute("to") == null){
        lastLine.parentNode.removeChild(lastLine);
      } 
    }
    

    document.removeEventListener("mousemove", updateLineWithMouse, false);

    clickedButton.innerHTML = "New Link";

  }
}

function buttonSelectedForLink(){
  console.log("buutonselectedThis: " + this);


  el = document.getElementsByClassName("linkbutton");
  for (var j=0; j<el.length; j++) {
    el[j].removeEventListener("click", buttonSelectedForLink, false);
    el[j].classList.remove("selectable");
  }

  if(this.getAttribute("linkTo") != null && this.getAttribute("linkTo") != "null"){
    var existingLine = document.getElementById("lineFrom" + this.id);
    existingLine.parentElement.removeChild(existingLine);
  }

  var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute("from", this.id);
  line.setAttribute("x1", $(this).offset().left);
  line.setAttribute("y1", $(this).offset().top);
  line.id = "lineFrom" + this.id;
  document.getElementById("linkoverlay").appendChild(line);

  document.addEventListener("mousemove", updateLineWithMouse, false);

  elements = document.getElementsByClassName("imgcontainer");
  for (var i=0; i<elements.length; i++) {
    if(this.parentElement.id != elements[i].id){
      elements[i].classList.add('selectable');
      elements[i].addEventListener("click", endDivSelectedForLink, false);
    }
  }
}

function updateLineWithMouse(e){
  var allLines = document.getElementsByTagName("line");
  var line = allLines[allLines.length-1];
  line.setAttribute("x2", e.pageX);
  line.setAttribute("y2", e.pageY);
}

function endDivSelectedForLink(){
  console.log("endDivSelectedThis: " + this.id);

  document.removeEventListener("mousemove", updateLineWithMouse, false);

  var allLines = document.getElementsByTagName("line");
  var line = allLines[allLines.length-1];
  line.setAttribute("to", this.id);
  line.setAttribute("x2", $(this).offset().left);
  line.setAttribute("y2", $(this).offset().top);

  document.getElementById(line.getAttribute("from")).setAttribute("linkTo", this.id);

  elWithEL = document.getElementsByClassName("imgcontainer");
  for (var j=0; j<elWithEL.length; j++) {
    elWithEL[j].removeEventListener("click", endDivSelectedForLink, false);
    elWithEL[j].classList.remove("selectable");
  }

  document.getElementById("newLinkButton").innerHTML = "New Link";
}

//ADD PICTURE BUTTON FUNCTIONALITY
function pictureSelected(inputField){
  var newImg = document.createElement('img');

  var file    = inputField.files[0];
  //var reader  = new FileReader();
  //reader.addEventListener("load", function () {

  var formData = new FormData();
  formData.append("file", file, file.name);
  
  var req = new XMLHttpRequest();
  req.open("POST", window.location.pathname);
  req.send(formData);
  req.onload = function(e) {
    //var img = document.createElement("img");
      //img.style.width = "100%";
      //img.setAttribute("src", file.name);
      //document.querySelector("#images").appendChild(img);
  

  

    //newImg.src = reader.result;
    newImg.setAttribute("src", file.name);

    newImg.style.maxWidth = "200px";
    newImg.style.height = "auto";
    var newDiv = document.createElement('div');
    newDiv.classList.add('imgcontainer');
    newDiv.classList.add('draggable');
    newDiv.id = makeid();
    newDiv.appendChild(newImg);

    //add nem element
    document.getElementById("data").appendChild(newDiv);

    refreshDraggable();
  };
  //}, false);

  //if (file) {
  //  reader.readAsDataURL(file);
  //}

}

function makeid(){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

//DELETE SCREEN BUTTON FUNCTIONALITY
function deleteScreenButtonClicked(clickedButton){
  if(clickedButton.innerHTML == "Delete Screen"){

    elements = document.getElementsByClassName("imgcontainer");
    for (var i=0; i<elements.length; i++) {
      elements[i].classList.add('selectable');
      elements[i].addEventListener("click", screenSelectedForDelete, false);
    }

    clickedButton.innerHTML = "Cancel";

  }

  else if(clickedButton.innerHTML == "Cancel"){
    
    elWithEL = document.getElementsByClassName("imgcontainer");
    for (var k=0; k<elWithEL.length; k++) {
      elWithEL[k].removeEventListener("click", screenSelectedForDelete, false);
      elWithEL[k].classList.remove("selectable");
    }

    clickedButton.innerHTML = "Delete Screen";

  }
}

function screenSelectedForDelete(){
  console.log(this.id);

  //Delete svg lines from buttons at screen
  var childrenInScreen = this.childNodes;

  for(var i = 0; i < childrenInScreen.length; i++){
    var adherentLine = document.getElementById("lineFrom" + childrenInScreen[i].id);
    if(adherentLine){
      adherentLine.parentNode.removeChild(adherentLine);
    }  
  }

  //delte svg lines pointing towards screen
  var lines = document.getElementsByTagName("line");
  var buttonsPointingToScreen = [];

  for(var k = 0; k < lines.length; k++){
    if(lines[k].getAttribute("to") == this.id){
      buttonsPointingToScreen.push(lines[k].getAttribute("from"));
      lines[k].parentNode.removeChild(lines[k]);
    }
  }

  //delete pointer at button
  for(var l = 0; l <buttonsPointingToScreen.length; l++){
    document.getElementById(buttonsPointingToScreen[l]).setAttribute("linkTo", null);
  }

  //finally remove the screen    
  this.parentNode.removeChild( this );

  el = document.getElementsByClassName("imgcontainer");
  for (var j=0; j<el.length; j++) {
    el[j].removeEventListener("click", screenSelectedForDelete, false);
    el[j].classList.remove("selectable");
  }

  document.getElementById("deleteScreenButton").innerHTML = "Delete Screen";
}