const form = document.querySelector(".form");
const name = document.getElementById("name");
const number = document.getElementById("number");
const date = document.getElementById("date");
const cvv = document.getElementById("cvv");
const infoMsg = document.getElementById("infoMsg");

/*SHOW AND HIDE THE CVV INFO*/
function showMsg() {
    infoMsg.style.display = "inline";
}
function hideMsg() {
    infoMsg.style.display = "none";
}

const visa = document.querySelector(".card");

/*  SHOW ERROR  */
function showError(element, error) {
    if (error === true) {
        element.style.opacity = "1";
    } else {
        element.style.opacity = "0";
    }
}

/*  CHANGE THE FORMAT NAME  */
name.addEventListener("input", function () {
    let alert1 = document.getElementById("alert-1");
    let error = this.value === "";
    showError(alert1, error);
    document.getElementById("card-name").textContent = this.value;

    if (this.value.length == 0) {
        document.querySelector("#card-name").textContent =
            "Baher Hossam Tolba Ali";
    }
});

/*  CHANGE THE FORMAT CARD NUMBER*/
number.addEventListener("input", function (e) {
    this.value = numberAutoFormat();

    //show error when is different of 16 numbers and 3 white space
    let error = this.value.length !== 19;
    let alert2 = document.getElementById("alert-2");
    showError(alert2, error);

    document.querySelector(".card__number").textContent = this.value;

    // return to the original value if the input is emptied
    if (number.value.length == 0) {
        document.querySelector(".card__number").innerHTML =
            "0000&nbsp;0000&nbsp;0000&nbsp;0000";
    }
});

function numberAutoFormat() {
    let valueNumber = number.value;
    // if white space change to ''. If is not a number between 0-9 change to ''
    let v = valueNumber.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    // the value got min of 4 digits and max of 16
    let matches = v.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];

    for (i = 0; i < match.length; i += 4) {
        // after 4 digits add a new element to the Array
        // e.g. "4510023" -> [4510, 023]
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
        // add a white space after 4 digits
        return parts.join(" ");
    } else {
        return valueNumber;
    }
}

/*  CHANGE THE FORMAT DATE  */
date.addEventListener("input", function (e) {
    // return to the original value if the input is emptied
    if (this.value.length == 0) {
        document.getElementById("month").innerHTML = "MM";
        document.getElementById("year").innerHTML = "YY";
    }
    this.value = dateAutoFormat();

    // show error if is not a valid date
    let alert3 = document.getElementById("alert-3");
    showError(alert3, isNotDate(this));

    let dateNumber = date.value.match(/\d{2,4}/g);
    document.getElementById("month").textContent = dateNumber[0];
    document.getElementById("year").textContent = dateNumber[1];
});

/* CHANGE THE FORMAT CVV */
cvv.addEventListener("input", function (e) {
    document.querySelector("#cardCVV").textContent = this.value;

    // return to the original value if the input is emptied
    if (this.value.length == 0) {
        document.querySelector("#cardCVV").textContent = "****";
    }
});

function isNotDate(element) {
    let actualDate = new Date();
    let month = actualDate.getMonth() + 1; // start january 0 we need to add + 1
    let year = Number(actualDate.getFullYear().toString().substr(-2)); // 2022 -> 22
    let dateNumber = element.value.match(/\d{2,4}/g);
    let monthNumber = Number(dateNumber[0]);
    let yearNumber = Number(dateNumber[1]);

    if (
        element.value === "" ||
        monthNumber < 1 ||
        monthNumber > 12 ||
        yearNumber < year ||
        (monthNumber <= month && yearNumber === year)
    ) {
        return true;
    } else {
        return false;
    }
}

function dateAutoFormat() {
    let dateValue = date.value;
    // if white space -> change to ''. If is not a number between 0-9 -> change to ''
    let v = dateValue.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    // min of 2 digits and max of 4
    let matches = v.match(/\d{2,4}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];

    for (i = 0; i < match.length; i += 2) {
        // after 4 digits add a new element to the Array
        // e.g. "4510023" -> [4510, 023]
        parts.push(match.substring(i, i + 2));
    }

    if (parts.length) {
        // add a white space after 4 digits
        return parts.join("/");
    } else {
        return dateValue;
    }
}

/*  CHANGE THE FORMAT CVV  */
cvv.addEventListener("input", function (e) {
    let alert4 = document.getElementById("alert-4");
    let error = this.value.length < 3;
    showError(alert4, error);
});

/* CHECK IF KEY PRESSED IS A NUMBER (input of card number, date and cvv) */
function isNumeric(event) {
    if (event.keyCode < 48 || event.keyCode > 57) {
        return false;
    }
}

/*  VALIDATION FORM WHEN PRESS THE BUTTON   */
form.addEventListener("submit", function (e) {
    // 1. if there is not any name
    // 2. if the length of the number card is not valid (16 numbers and 3 white space)
    // 3. if is not a valid date (4 number and "/" or is not a valid date)
    // 4. if is not a valid cvv

    if (
        name.value === "" ||
        number.value.length !== 19 ||
        date.value.length !== 5 ||
        isNotDate(date) === true ||
        cvv.value.length < 3
    ) {
        e.preventDefault();
    }

    // 5. if any input is empty show the alert of that input
    let input = document.querySelectorAll("input");
    for (i = 0; i < input.length; i++) {
        if (input[i].value === "") {
            input[i].nextElementSibling.style.opacity = "1";
        }
    }
});

// Select the button element by its ID
let cardFront = document.getElementById("cardFront");
let cardBack = document.getElementById("cardBack");

// Add a click event listener to the button
cvv.addEventListener("focusin", function () {
    cardFront.style.transform = "rotateY(-180deg)";
    cardBack.style.transform = "rotateY(0)";
});
cvv.addEventListener("focusout", function () {
    cardFront.style.transform = "rotateY(0)";
    cardBack.style.transform = "rotateY(180deg)";
});