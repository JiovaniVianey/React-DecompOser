var app = {
  
  direction: 0,
  currentRow: 1,
  currentCol: 1,
  
  init: function() {
    console.log('init');

    // TODO
    app.drawBoard();
    // Event listeners - TODO
    const launchButton = document.getElementById('launchScript');
    launchButton.addEventListener('click', app.handleLaunchScriptButton);
  },
  randomNumber: function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  drawBoard: function() {
    board = document.querySelector('#board');
    // Nombre de lignes et de colonnes
    const numRows = 4;
    const numCols = 6;

    const startRow = app.randomNumber(1, 4);
    const startCol = app.randomNumber(1, 6);

    app.currentRow = startRow;
    app.currentCol = startCol;

    const endRow = app.randomNumber(1, 4);
    const endCol = app.randomNumber(1, 6);

    // Boucle pour créer les lignes
    for (let i = 1; i <= numRows; i++) {
      // Crée un élément div pour chaque ligne
      const row = document.createElement('div');
      row.classList.add('cellRow');
      row.id = 'row' + i; // Crée un ID unique pour chaque ligne

      // Boucle pour créer les colonnes dans chaque ligne
      for (let j = 1; j <= numCols; j++) {
        // Crée un élément div pour chaque cellule
        const cell = document.createElement('div');
        cell.classList.add('cell');

        if (i === startRow && j === startCol)
        {
          cell.classList.add('cellStart');
          cell.classList.add('cellCurrent');
        }
        
        if ((i === endRow && j === endCol) && (i != startRow || j != startCol))
        {
          cell.classList.add('cellEnd');
        }

        // Ajoutez la cellule à la ligne
        row.appendChild(cell);
      }

      // Ajoutez la ligne au tableau
      board.appendChild(row);
    }
    app.updateCursor();
  },
  moveForward: function() {
    const currentCell = document.querySelector(`#row${app.currentRow} .cell:nth-child(${app.currentCol})`);

    // Supprime la classe "cellCurrent" de la cellule actuelle
    currentCell.classList.remove('cellCurrent');

    // Avance la position du curseur en fonction de la direction
    switch(app.direction)
    {
      case 0:
        // Droite
        app.currentCol++;
        break;
      case 1:
        // Bas
        app.currentRow++;
        break;
      case 2:
        // Gauche
        app.currentCol--;
        break;
      case 3:
        // Haut
        app.currentRow--;
    }

    // Vérifier que la nouvelle position est valide
    if (app.currentRow < 1) app.currentRow = 1;
    if (app.currentRow > 4) app.currentRow = 4;
    if (app.currentCol < 1) app.currentCol = 1;
    if (app.currentCol > 6) app.currentCol = 6;

    const newCell = document.querySelector(`#row${app.currentRow} .cell:nth-child(${app.currentCol})`);
    console.log(`X: ${app.currentCol} / Y: ${app.currentRow}`)

    // Ajoute la classe "cellCurrent" à la nouvelle cellule
    newCell.classList.add('cellCurrent');
    app.updateCursor();
  },
  turnLeft: function() {
    app.direction = (app.direction - 1 + 4) % 4;
    app.updateCursor();
  },
  turnRight: function() {
    app.direction = (app.direction + 1) % 4;
    app.updateCursor();
  },
  updateCursor: function() {
    const currentCell = document.querySelector('.cellCurrent');

    currentCell.classList.remove('cellCurrent-right');
    currentCell.classList.remove('cellCurrent-left');
    currentCell.classList.remove('cellCurrent-top');
    currentCell.classList.remove('cellCurrent-bottom');

    switch (app.direction) {
      case 0: // Vers la droite
        currentCell.classList.add("cellCurrent-right");
        break;
      case 1: // Vers le bas
        currentCell.classList.add("cellCurrent-bottom");
        break;
      case 2: // Vers la gauche
        currentCell.classList.add("cellCurrent-left");
        break;
      case 3: // Vers le haut
        currentCell.classList.add("cellCurrent-top");
        break;
    }
  },
  handleLaunchScriptButton: function(event) {
    event.preventDefault();
    // TODO
    const textarea = document.getElementById('userCode');
    const textareaContent = textarea.value;
    // TODO : get all lines as an array
    const codeLines = textareaContent.split('\n');
    window.setTimeout(function() {
      app.codeLineLoop(codeLines, 0);
    }, 500);
  },
  codeLineLoop: function(codeLines, index) {
    // Getting currentLine
    var currentLine = codeLines[index];
    console.log(currentLine);

    switch(currentLine)
    {
      case "turn left":
        app.turnLeft();
        break;
      case "turn right":
        app.turnRight();
        break;
      case "move forward":
        app.moveForward();
        break;
      default:
        if (!currentLine.startsWith("//") && currentLine.trim() != "") {
          alert("Commande Inconnue !");
        }
    }

    // Increment
    index++;

    // if still a line to interpret
    if (index < codeLines.length) {
      // Recall same method (=> make a loop)
      window.setTimeout(function() {
        app.codeLineLoop(codeLines, index);
      }, 1000);
    } else {
      window.setTimeout(function() {
        app.checkSuccess();
      }, 1000);
    }
  },
  checkSuccess: function() {
    // TODO display if the game is won or not

    div = document.querySelector('.cellEnd');

    if (div.classList.contains('cellCurrent'))
    {
      alert("You win !!!");
    }
  }
};

document.addEventListener('DOMContentLoaded', app.init);
