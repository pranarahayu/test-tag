var eventType = "Pass"

var eventButtons = document.getElementsByClassName("event-button");

var changeEvent = function() {
    eventType = this.innerHTML;
    };

for (var i = 0; i < eventButtons.length; i++){
    eventButtons[i].onclick = changeEvent;
};

var addEventButton = function(){
    var buttonText = document.getElementById("add-event").value;
    var buttonHTML = "<button class=\"event-button\" id=\"" +buttonText+ "\">"+buttonText+"</button>"
    document.getElementById("event-container").innerHTML += buttonHTML;
    for (var i = 0; i < eventButtons.length; i++){
        eventButtons[i].onclick = changeEvent;
    };
}

var handler = function(e) {
    var key = e.keyCode;
    
    if (key==13){
        addEventButton();
    };
    
};

var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext("2d");
context.strokeStyle = "white";

//Pitch, box, 6-yard rectangles
context.strokeRect(10,10,200,260);

context.strokeRect(66,10,88,36);
context.strokeRect(66,234,88,36);

context.strokeRect(90, 10, 40, 12);
context.strokeRect(90, 258, 40, 12);

//Centre circle & line

context.moveTo(10,140);
context.lineTo(210,140);
context.stroke();

context.beginPath()
context.arc(110, 140, 20, 0, 2*Math.PI);
context.stroke();
context.closePath();

//Pen & centre spots

context.beginPath();
context.arc(110, 34, 1, 0, 2*Math.PI);
context.fillStyle = "white";
context.fill();
context.closePath();

context.beginPath();
context.arc(110, 244, 1, 0, 2*Math.PI);
context.fillStyle = "white";
context.fill();
context.closePath();  

context.beginPath();
context.arc(110, 140, 1, 0, 2*Math.PI);
context.fillStyle = "white";
context.fill();
context.closePath();

//Pen area D

context.beginPath();
context.arc(110,34,20,0.69,2.45);
context.stroke();
context.closePath();

context.beginPath();
context.arc(110,244,20,3.7,5.75);
context.stroke();
context.closePath

function getMousePos(canvas, evt) {
        var rect = myCanvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

	  
//Function adds x/y location & event. At standard size, 0,0 is centre spot
myCanvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(myCanvas, evt);
        var table = document.getElementById("data-body");
		var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		cell1.innerHTML = eventType;
		cell2.innerHTML = ((Math.floor(mousePos.x)-10)-100);
		cell3.innerHTML = ((Math.floor(mousePos.y)-10)-133);
		document.getElementById("table-container").scrollTop = document.getElementById("table-container").scrollHeight;
});

document.getElementById("undo").onclick = function(){
    
    var table = document.getElementById("data");
    if (table.rows.length > 1){
    table.deleteRow((table.rows.length)-1);
    };
    
};

document.getElementById("clear").onclick = function(){
    
    var table = document.getElementById("data");
    document.getElementById("data").innerHTML = 
        "<thead><tr><th>Event Name</th><th>X Location</th><th>Y Location</th></tr></thead><tbody id=\"data-body\"></tbody>";    
    
};


function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}


function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}
