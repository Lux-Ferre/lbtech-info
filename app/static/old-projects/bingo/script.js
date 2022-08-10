var tileLib = ['Mentions how the overlay is in the way.',
'"This could be a legend video"',
'Mangonel or onager gets a multikill on screen.',
'Mispronounces a players name.',
'"... really needs this castle"',
'Mentions the existence of this bingo.',
'Calls of t90Emote spam in the chat.',
'A poll appears.',
'"I dont think he can recover from this."',
'Calls out how wood will run low soon.',
'Asks where people found him from.',
'Roots for the underdog.',
'Says the name of any player correctly.',
'Roots for the most aggressive guy.',
'Asks the host not to leave if they die.',
'Introduces a player twice.',
'Calls out that there are idle villagers or how it should never happen.',
'Reads a donation or chat message of a story about how someone found him.',
'Expresses his gratitude for being able to do this.',
'Someone in the chat asks something about AoE2 HD.',
'"11" spam in the chat.',
'Is afraid that opening a menu will crash the game.',
'Yawns.',
'At least one setting is wrong.',
'Calls the "gg" before the player dies.',
'"Sorry for the sniffles."', //Javier
'"Who is new to the stream today?"', //Will
'*Tries* to look something up in the tech tree.', //Robrecht
'Misses a king dying.', //Robrecht
'Answers multiple questions in a row with t90Depends.', //Robrecht
'Makes a prediction for a scout fight in dark age.', //Robrecht
'Gets trolled by a mod with a poll', //Robrecht
'Denies hating the Korean people.',
'Claims farm placement mastery.',
'Someone asks about AoE2 DE in chat.',
'Tells the chat to "shh" for a sneak attack.',
'"We dont rig games here."',
'Doesnt know real world geography.',
'Hi YouTube!',
'"Hes doing a fatslob"',
'"They need to play the objective!"',
'"Just passing."',
'*69* "Nice."',
'Does a Stronghold impression.',
'*Camel noise*',
'Someone in chat asks "Wheres Capture Age?"', //BLorax
'Complains about how loud Baby Shark is.', //Alian713
'"Pro streamer btw"', //Alian713
'A king snipe fails.', //Alian713
'Mentions people falling asleep to his streams.', //Alian713
'"Malay need to delay"', //subgame_perfect
'No need to be upset. t90Seal',
'Harold update. t90Duck'
];

var tileBackColour='';

var shuffleLib = function (tileLib){
	var currentIndex = tileLib.length;
	var tempValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex=Math.floor(Math.random()*currentIndex);
		currentIndex-=1;
		tempValue=tileLib[currentIndex];
		tileLib[currentIndex]=tileLib[randomIndex];
		tileLib[randomIndex]=tempValue;
	}
	return tileLib;
}
function doThing(){
	console.log("ping");
}
function clickFunc(obj) {
	if (tileBackColour == 'rgb(80, 48, 80)') {
		tileBackColour = '#222222';}
	else  {tileBackColour='#503050';
			obj.style.backgroundColor='#503050';}
}

function mouseoverFunc(obj){
	tileBackColour=obj.style.backgroundColor;
	obj.style.backgroundColor='#800080';
}

function mouseoutFunc(obj){
	obj.style.backgroundColor=tileBackColour;
}

function drawTable(tileLib){
	var table = document.querySelector("table");
	for (i=0; i<5; i++) {
		var row=document.createElement("tr");
		for (j=0; j<5; j++) {
			var cell=document.createElement("td");
			var text=document.createTextNode(tileLib[(5*i)+j]);
			cell.addEventListener('click', function(event) {clickFunc(this);});
			cell.addEventListener('mouseover', function(event) {mouseoverFunc(this);});
			cell.addEventListener('mouseout', function(event) {mouseoutFunc(this);});
			cell.appendChild(text);
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
}

shuffleLib(tileLib);
drawTable(tileLib);

// document.querySelector('td').addEventListener('click', function(event) {doThing();});
// cell.addEventListener('click', function(event) {this.style.backgroundColor = 'Purple';});
// mouseover=800080=rgb(128, 0, 128)
// default tile=222222
// selected=503050=rgb(80, 48, 80)