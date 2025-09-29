// DEFINIR LOS OBJETOS DEL HTML
let txbNameObj = document.querySelector(".player");
let spanNameObj = document.querySelector(".player-name");
let spanDateObj = document.querySelector(".player-data");
let spanScoreObj = document.querySelector(".player-score");
let spanHighscore = document.querySelector(".player-highscore");
let spanLlistaObj = document.querySelector(".player-llista");
let pMessageObj = document.querySelector(".message");
let divNumberObj = document.querySelector(".number");
let btnJugar = document.querySelector("header .btn");
let btnProvar = document.querySelector("section .btn");
btnProvar.disabled = true;

let numSecret;

// INPUT NUMEROS
let numeros = document.querySelector(".guess");

// FECHA
const date = new Date();
// PONER FECHA DEL DIA
spanDateObj.textContent = date.getDate() + "/" + (date.getMonth() + 1 )+ "/" + date.getFullYear();
// PONER JUGADAS
spanScoreObj.textContent = "10";

// CSS
let fonsCss = document.querySelector("body");

let llistaNumeros = [];

// EVENTO PARA EL BOTON JUGAR
btnJugar.addEventListener('click', function(){
   jugar(); 
});

// EVENTO PARA EL BOTON JUGAR
btnProvar.addEventListener('click', function(){
   provar(); 
});

function jugar() {
    if (txbNameObj.value != "") {
        btnJugar.disabled = true;
    }
    divNumberObj.textContent = "?";
    spanLlistaObj.textContent = "";
    llistaNumeros = [];
    numeros.value = "";
    fonsCss.style.backgroundColor = "#222";
    btnProvar.disabled = false;

    spanScoreObj.textContent = "10";

    if(txbNameObj.value == "") {
        alert("Has de posar un nom al jugador!");
    } else {
        console.log("Jugant");
        let valorMax = prompt("Escull el número maxim que vulguis");
        if (valorMax === null) {
        valorMax = 20;
        }
        numSecret = Math.floor(Math.random() * (valorMax - 1 + 1) + 1);
        // PONER NOMBRE JUGADOR
        spanNameObj.textContent = txbNameObj.value;
        // CAMBIAR MENSAJE DE PISTAS
        pMessageObj.textContent = "Comencem la partida";
    }

    // FUNCION PARA DARLE A PROVAR (PRESIONANDO LA TECLA ENTER)
        // input numeros
        numeros.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            provar();
        }
        });
}

function provar() {

    currentScore = parseInt(spanScoreObj.textContent);
    currentScore--; 
    spanScoreObj.textContent = currentScore;

    if (currentScore <= 0) {  
        pMessageObj.textContent = "Has perdut!!";
        fonsCss.style.backgroundColor = "red";
        divNumberObj.textContent = numSecret;
        btnJugar.disabled = false;
        btnProvar.disabled = true;
    }

    if (numeros.value.length === 0) {
        alert("El número introduït no és correcte.");
        return;
    }


    llistaNumeros.push(numeros.value);
    spanLlistaObj.textContent = llistaNumeros.join(", ");

    if (parseInt(numeros.value) > numSecret) {
        pMessageObj.textContent = "El número secret és més petit";
        } else if (parseInt(numeros.value) < numSecret) {
            pMessageObj.textContent = "El número secret és més gran";
        } else if (parseInt(numeros.value) === numSecret) {
            pMessageObj.textContent = "L’has encertat!!";
            divNumberObj.textContent = numSecret;
            fonsCss.style.backgroundColor = "green";
            btnJugar.disabled = false;
            let highScore = parseInt(spanHighscore.textContent);
            highScore++; 
            spanHighscore.textContent = highScore;
            btnProvar.disabled = true;
        }

    numeros.value = "";
    numeros.focus();
}