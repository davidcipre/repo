const arrGame = ["keni", "manuelita", "canela", "gilberto"];
const boton = document.querySelector(".button");
const puntos = document.querySelector(".puntos");
const palabra = document.querySelector(".palabra");
const letras = document.querySelector(".letras");
const obj = {
    puntos: 0,
    act: "",
    sol: "",
    arrSol: []
};



function comenzarPartida() {
    if (arrGame.length > 0){
        boton.style.display = "none";
        obj.sol = "";
        obj.arrSol = [];
        obj.puntos = 0;
        obj.act = arrGame.shift();
        obj.sol = obj.act.split("");
        construir();

    } else {
        puntos.textContent = "No quedan más palabras";
    }
}

function crearEl(tipo, padre, salida, clase) {
    let temp = document.createElement(tipo);
    temp.textContent = salida;
    temp.classList.add(clase);
    padre.appendChild(temp);
    return temp;
}

function construir() {
    letras.innerHTML = "";
    palabra.innerHTML = "";
    obj.sol.forEach((ele) => {
        let div = crearEl("div", palabra, "-", "box");
        obj.arrSol.push(div);
        obj.puntos++;
    });
    for (let i = 0; i < 26; i++){
        let temp = String.fromCharCode(65 + i);
        let div = crearEl("div", letras, temp, "boxD");
        let chequear = function() {
            div.style.backgroundColor = "#FF00FF";
            div.removeEventListener("click", chequear);
            chequearLetra(temp);
        }
        div.addEventListener("click", chequear);
    }

    actualizarPuntos();
}

function chequearLetra(letra) {
    obj.sol.forEach((ele, index) => {
        if (ele.toUpperCase() == letra){
            obj.arrSol[index].textContent = letra;
            obj.puntos--;
        }
        actualizarPuntos();
    });
}

function actualizarPuntos() {
    puntos.textContent = `Quedan ${obj.puntos} letras`;
    if (obj.puntos <= 0){
        boton.style.display = "block";
    }
}

boton.addEventListener("click", comenzarPartida);