(function(){
	var canvas = document.getElementById('hexmap');	
    var hexHeight,
        hexRadius,
        hexRectangleHeight,
        hexRectangleWidth,
        hexagonAngle = 0.523598776,
        sideLength = 12,													//Hexagon edge length
        boardWidth = 39,													//Map width in number of tiles
        boardHeight = 39;													//Map height in number of tiles

    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;

	if (localStorage.getItem("mapLabels") === null) {						//Check if label data already exists
		resetLabels(boardWidth, boardHeight);}								//Create label data file
	if (localStorage.getItem("mapMatrix") === null) {						//Check if map data already exists
		resetMap(boardWidth, boardHeight);}									//Create map data
	if (localStorage.getItem("mapSel") === null) {							//Check if map selections already exists
		resetSel(boardWidth, boardHeight);}									//Create selection data
	var labelArray = JSON.parse(localStorage.getItem("mapLabels"));			//Fetch label data from local storage
	var mapArray = JSON.parse(localStorage.getItem("mapMatrix"));			//Fetch map data from local storage
	var selArray = JSON.parse(localStorage.getItem("mapSel"));				//Fetch selection data from local storage
	
	function resetLabels(width, height){									//FUNCTION: Creates a 2D array of empty strings and saves in local storage
        var i,
            j;
		var mapLab=new Array();
		for(i = 0; i < width; ++i) {
			mapLab[i]=new Array();
			for(j = 0; j < height; ++j) {
				mapLab[i][j]="";
			}
		}
		localStorage.setItem("mapLabels", JSON.stringify(mapLab));
	}

	function resetMap(width, height){										//FUNCTION: Creates a 2D array of #FFFFFF and saves in local storage
        var i,
            j;
		var mapArray=new Array();
		for(i = 0; i < width; ++i) {
			mapArray[i]=new Array();
			for(j = 0; j < height; ++j) {
				mapArray[i][j]=0;
			}
		}
		localStorage.setItem("mapMatrix", JSON.stringify(mapArray));
	}
	
	function resetSel(width, height){										//FUNCTION: Creates a 2D array of false and saves in local storage
        var i,
            j;
		var selArray=new Array();
		for(i = 0; i < width; ++i) {
			selArray[i]=new Array();
			for(j = 0; j < height; ++j) {
				selArray[i][j]=false;
			}
		}
		localStorage.setItem("mapSel", JSON.stringify(selArray));
	}
	
	function displayModal(i, j, x, y) {
		var modal = document.getElementById('labModal');
		if(labelArray[i][j].length>1) {
			x=x+15;
			document.getElementById('labModText').innerHTML=labelArray[i][j];
			modal.style.top=y + 'px';
			modal.style.left=x + 'px';
			modal.style.display = "block";										//Display modal
		}
		else{modal.style.display = "none";}
	}
	
	function setTile(mapMatrix, c, i, j){									//FUNCTION: Sets relevant cell to colour hex value and saves
		mapMatrix[i][j]=c;
		localStorage.setItem("mapMatrix", JSON.stringify(mapMatrix));
	}
	
	function selectTile(selArray, i, j){									//FUNCTION: Sets relevant cell to colour hex value and saves
		selArray[i][j]=!selArray[i][j];
		localStorage.setItem("mapSel", JSON.stringify(selArray));
	}

    if (canvas.getContext){
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = "#000000";											//Canvas background colour
        ctx.strokeStyle = "#CCCCCC";										//Hexagon line colour
        ctx.lineWidth = 1;													//Hexagon line thickness

        drawBoard(ctx, boardWidth, boardHeight);

        canvas.addEventListener("mousemove", function(eventInfo) {			//Detects mouse location
            var x,
                y,
                hexX,
                hexY,
                screenX,
                screenY;

            x = eventInfo.offsetX || eventInfo.layerX;						//Mouse x location
            y = eventInfo.offsetY || eventInfo.layerY;						//mouse y location

            
            hexY = Math.floor(y / (hexHeight + sideLength));						//Finds which hex cell the mouse is in
            hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);	//Finds which hex cell the mouse is in

            screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
            screenY = hexY * (hexHeight + sideLength);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawBoard(ctx, boardWidth, boardHeight);

            if(hexX >= 0 && hexX < boardWidth) {							//Checks that the hex is within the board
                if(hexY >= 0 && hexY < boardHeight) {
                    ctx.fillStyle = "#ef4f4f";								//Sets current cell colour
                    drawHexagon(ctx, screenX, screenY, true);				//Refreshes board
					displayModal(hexX, hexY, event.clientX, event.clientY);
                }
            }
        });
        canvas.addEventListener("click", function(eventInfo) {				//Detects mouse click
            var x,
                y,
                hexX,
                hexY,
                screenX,
                screenY;

            x = eventInfo.offsetX || eventInfo.layerX;
            y = eventInfo.offsetY || eventInfo.layerY;

            
            hexY = Math.floor(y / (hexHeight + sideLength));
            hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);

            screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
            screenY = hexY * (hexHeight + sideLength);

            if(hexX >= 0 && hexX < boardWidth) {
                if(hexY >= 0 && hexY < boardHeight) {
					var c=document.getElementById("hiddenColour").innerHTML;	//Get currently selected colour
					if(document.getElementById("typeLabel").checked){			//If setting is for labels
						setLabel(labelArray, hexX, hexY);}						//Set cell to label
					else if(document.getElementById("typeSelect").checked){		//If setting is for selection
						selectTile(selArray, hexX, hexY);}					//Select cell
					else{setTile(mapArray, c, hexX, hexY);}						//Else, set cell to colour
                }
            }
        });
    }

    function drawBoard(canvasContext, width, height) {
        var i,
            j;
        for(i = 0; i < width; ++i) {
            for(j = 0; j < height; ++j) {
				ctx.fillStyle = mapArray[i][j];
				if(selArray[i][j]){
					ctx.fillStyle = "#42f1f4";}
                drawHexagon(
                    ctx, 
                    i * hexRectangleWidth + ((j % 2) * hexRadius), 
                    j * (sideLength + hexHeight), 
                    true
                );
            }
        }
    }

    function drawHexagon(canvasContext, x, y, fill) {           
        var fill = fill || false;

        canvasContext.beginPath();
        canvasContext.moveTo(x + hexRadius, y);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
        canvasContext.lineTo(x, y + sideLength + hexHeight);
        canvasContext.lineTo(x, y + hexHeight);
        canvasContext.closePath();

        if(fill) {
            canvasContext.fill();
        } else {
            canvasContext.stroke();
        }
    }
	
	function setLabel(labelArray,i,j){
		p=prompt("Label for tile. [Max 40 characters][Do NOT use the tilde(~) it will break your seed]", labelArray[i][j]);	//Get label
		labelArray[i][j]=p.substr(0, 40);																					//Set array cell to label
		localStorage.setItem("mapLabels", JSON.stringify(labelArray));														//Save label array
	}

})();