"use strict";
var Props = {
    mask: "+I(III)XII-I*-I*"
};
var tel = "+7(923)445-00-12";
var comb = "";

var maskArr = Props.mask.replace(/[\+\-\(\)]/g, "").split(""); // удаляем +()-- из маски и помещаем все в массив
var telArr = tel.replace(/[\+\-\(\)]/g, "").split(""); // удаляем +()-- из полного номера и помещаем все в массив

let j = 0; // составляем строку из значений массива маски
let maskString = Props.mask.replace(/[\+\-\(\)]/g, "");

var regexp = /I/gi; // соcnавляем массив из позиций, на которых стоят символы "I"
var result;
var posIsArr = [];
let i = 0;
while ((result = regexp.exec(maskString))) {
    posIsArr[i] = result.index;
    i++;
}
let posIsArrLength = posIsArr.length; // соcnавляем комбинацию, которую должен ввести пользователь
for (let i = 0; i < posIsArrLength; i++) {
    comb += telArr[posIsArr[i]];
}

window.onload = function () {
    fillingInputs(maskArr); // функция подставляет в инпуты символы из Props.mask

    function fillingInputs(mas) {
        let i = 0;
        let elem = document.getElementById("num0");
        do {
            if (elem.getAttribute("class") != "test") {
                if (mas[i] >= "0" && mas[i] <= "9") {
                    elem.setAttribute("value", mas[i]);
                    elem.setAttribute("readonly", true);
                    elem.setAttribute("class", "occupied");
                    elem = elem.nextSibling;
                    i++;
                } else if (mas[i] == "*") {
                    elem.setAttribute("value", mas[i]);
                    elem.setAttribute("type", "password");
                    elem.setAttribute("readonly", true);
                    elem.setAttribute("class", "occupied");
                    elem = elem.nextSibling;
                    i++;
                } else if (mas[i] == "X") {
                    elem.setAttribute("value", mas[i]);
                    elem.setAttribute("class", "occupied");
                    elem = elem.nextSibling;
                    i++;
                } else if (mas[i] == "I") {
                    elem = elem.nextSibling;
                    i++;
                } else {
                    elem.setAttribute("value", mas[i]);
                    elem = elem.nextSibling;
                    i++;
                }
            } else {
                elem = elem.nextSibling;
            }
        } while (elem);
    }
};

function validNumber() {
    // проверка введенной пользователем комбинации символов
    var string = "";
    var inp;
    var arrLength = posIsArr.length;
    //var elems = document.getElementsByClassName("vacant");

    var elems = document.querySelectorAll("vacant");

    for (let j = 0; j < arrLength; j++) {
        inp = document.getElementById("num" + posIsArr[j]); //считываем символы с доступных пользователю инпутов и составляем пользовательскую комбинацию
        if (inp.value !== "") {
            string = string + inp.value;
        }
    }

    if (string === comb) {
        // сама проверка
        document.getElementById("done").innerHTML = "correct";
        for (let i = 0, cnt = elems.length; i < cnt; i++) {
            elems[i].style.borderColor = "#e4e4e4";
        }
    } else {
        if (string.length == arrLength) {
            document.getElementById("done").innerHTML =
                "Неверный номер, попробуйте еще раз";
            for (let i = 0, cnt = elems.length; i < cnt; i++) {
                elems[i].style.borderColor = "#ff4c40";
            }
        } else {
            document.getElementById("done").innerHTML = "";
            for (let i = 0, cnt = elems.length; i < cnt; i++) {
                elems[i].style.borderColor = "#e4e4e4";
            }
        }
    }
}

function testJump(x) { // переход к следующей вакантной ячейке
    var ml = ~~x.getAttribute("maxlength");
    if (ml && x.value.length >= ml) {
        do {
            x = x.nextSibling;
            if (
                x.getAttribute("class") == "test" ||
                x.getAttribute("class") == "occupied"
            ) {
                do {
                    x = x.nextSibling;
                } while (x.getAttribute("class") !== "vacant");
            }
        } while (x && !/text/.test(x.type));
        if (x && /text/.test(x.type)) {
            x.focus();
        }
    }
}