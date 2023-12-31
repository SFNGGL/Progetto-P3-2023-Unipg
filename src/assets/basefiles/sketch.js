var canvas;
var body;
var miniGames = [];
var nuovoColore = "";


var canvas;
var body;
var miniGames = [];
var nuovoColore = "";
var gameIndex = 0;


function preload() {
  // miniGames.push(gioco_liz);
  // miniGames[gameIndex].loadRes();
}

function setup() {

  body = select("body");
  canvas = createCanvas(body.width, body.height);
  calcScaleAttr(body.width, body.height);

  miniGames[gameIndex].constructor();
}

function draw() {
  translate(getTranslation().x, getTranslation().y);
  scale(getScale().w, getScale().h);

  miniGames[gameIndex].draw(Canvas_resized);
  Canvas_resized = false;
}

function keyPressed() {
  if (miniGames[gameIndex].keyPressed !== undefined) {
    miniGames[gameIndex].keyPressed();
  }

  if (keyCode == ESCAPE) {
    quitGame();
  }
}

function quitGame() {
  window.location.href = "index.html";
}

function mousePressed() {
  if (miniGames[gameIndex].mousePressed !== undefined) {
    miniGames[gameIndex].mousePressed();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function gameCompleted(success) {

  if (success) {
    confirm("YOU DID IT! DO YOU WANNA PLAY AGAIN?");
    miniGames[gameIndex].constructor();
  }
  else {
    confirm("RIP, DO YOU WANNA PLAY AGAIN?");
    miniGames[gameIndex].constructor();
  }
}


function setup() {

  body = select("body");
  canvas = createCanvas(body.width, body.height);
  calcScaleAttr(body.width, body.height);

  miniGames[gameIndex].constructor();
}

function draw() {
  translate(getTranslation().x, getTranslation().y);
  scale(getScale().w, getScale().h);

  miniGames[gameIndex].draw(Canvas_resized);
  Canvas_resized = false;
}

function keyPressed() {
  if (miniGames[gameIndex].keyPressed !== undefined) {
    miniGames[gameIndex].keyPressed();
  }

  if (keyCode == ESCAPE) {
    quitGame();
  }
}

function quitGame() {
  window.location.href = "index.html";
}

function mousePressed() {
  if (miniGames[gameIndex].mousePressed !== undefined) {
    miniGames[gameIndex].mousePressed();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Riceve il nome del gioco e i due colori ad esso associati
function addVictoryToDb(gameName, c1, c2) {
  /*
  Effetua una chiamata ajax la quale aggiunge un punto personale.
  Se il tuo punteggio � ora == 1, sblocca il primo colore,
  se � == 2 sblocca il secondo
  altrimenti non sblocca colori
  */
  var request = $.ajax({
    url: "database.php",
    method: "POST",
    data: { game: gameName, color1: c1, color2: c2, action: 'victory' },
    dataType: "json",
    success: function(msg) {
      nuovoColore = msg;
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert("Errore. Contatta gli amministratori: " + errorThrown);
      quitGame();
    }
  });
}
