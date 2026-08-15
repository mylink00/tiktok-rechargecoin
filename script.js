```javascript
/* =========================================
   ELEMENTS
========================================= */

const usernameInput =
    document.getElementById("username");

const usernameStatus =
    document.getElementById("username-status");

const usernameError =
    document.getElementById("username-error");

const coinPackages =
    document.querySelectorAll(".coin-package");

const paymentMethods =
    document.querySelectorAll(".payment-method");

const customPackage =
    document.getElementById("custom-package");

const customSection =
    document.getElementById("custom-section");

const customCoinsInput =
    document.getElementById("custom-coins");

const customPrice =
    document.getElementById("custom-price");

const totalCoins =
    document.getElementById("total-coins");

const confirmButton =
    document.getElementById("confirm-button");

const loadingOverlay =
    document.getElementById("loading-overlay");

const successOverlay =
    document.getElementById("success-overlay");

const okButton =
    document.getElementById("ok-button");

const successCoins =
    document.getElementById("success-coins");

const successUsername =
    document.getElementById("success-username");

const successPrice =
    document.getElementById("success-price");

const successPayment =
    document.getElementById("success-payment");


/* =========================================
   VARIABLES
========================================= */

let selectedCoins = 0;
let selectedPrice = 0;
let selectedPayment = "";


// Approximate rate:
// around 80 Coins = $1
const CUSTOM_RATE = 0.012466;


/* =========================================
   LOAD SAVED TOTAL
========================================= */

let savedTotal =
    Number(localStorage.getItem("demoCoinTotal")) || 0;

totalCoins.textContent =
    savedTotal.toLocaleString();


/* =========================================
   USERNAME VALIDATION
========================================= */

/*
    Rules:

    1. More than 3 characters
    2. Only English letters
    3. Numbers allowed
    4. "." allowed
    5. "_" allowed
    6. No Vietnamese accented characters
    7. No spaces
*/

function validateUsername() {

    const username =
        usernameInput.value.trim();

    // Empty
    if (username.length === 0) {

        usernameStatus.className =
            "username-status";

        usernameStatus.textContent = "";

        usernameError.textContent = "";

        return false;
    }


    // More than 3 characters
    if (username.length <= 3) {

        usernameStatus.className =
            "username-status invalid";

        usernameStatus.textContent = "×";

        usernameError.textContent =
            "Username must contain more than 3 characters.";

        return false;
    }


    // Allowed characters only
    const validPattern =
        /^[A-Za-z0-9._]+$/;

    if (!validPattern.test(username)) {

        usernameStatus.className =
            "username-status invalid";

        usernameStatus.textContent = "×";

        usernameError.textContent =
            "Use only English letters, numbers, dots or underscores.";

        return false;
    }


    // Valid
    usernameStatus.className =
        "username-status valid";

    usernameStatus.textContent = "✓";

    usernameError.textContent = "";

    return true;
}


usernameInput.addEventListener(
    "input",
    validateUsername
);


/* =========================================
   SELECT COIN PACKAGE
========================================= */

coinPackages.forEach(packageButton => {

    packageButton.addEventListener(
        "click",
        () => {

            // Remove previous selection
            coinPackages.forEach(item => {
                item.classList.remove("selected");
            });


            // Select current package
            packageButton.classList.add(
                "selected"
            );


            // Custom package
            if (
                packageButton ===
                customPackage
            ) {

                customSection.classList.add(
                    "show"
                );

                selectedCoins = 0;
                selectedPrice = 0;

                customCoinsInput.focus();

                updateTotal();

                return;
            }


            // Normal package
            customSection.classList.remove(
                "show"
            );

            const coins =
                Number(
                    packageButton.dataset.coins
                );

            const price =
                Number(
                    packageButton.dataset.price
                );

            selectedCoins = coins;

            selectedPrice = price;

            updateTotal();
        }
    );

});


/* =========================================
   CUSTOM COIN
========================================= */

customCoinsInput.addEventListener(
    "input",
    () => {

        let coins =
            Number(
                customCoinsInput.value
            );


        if (!coins || coins < 1) {

            selectedCoins = 0;
            selectedPrice = 0;

            customPrice.textContent =
                "$0.00";

            updateTotal();

            return;
        }


        // Limit to 1,000,000 coins
        if (coins > 1000000) {

            coins = 1000000;

            customCoinsInput.value =
                coins;
        }


        selectedCoins =
            Math.floor(coins);


        /*
            Custom price calculation.

            Example:

            5,000 coins
            × $0.012466
            ≈ $62.33
        */

        selectedPrice =
            selectedCoins *
            CUSTOM_RATE;


        customPrice.textContent =
            "$" +
            selectedPrice.toFixed(2);


        updateTotal();
    }
);


/* =========================================
   UPDATE TOTAL
========================================= */

function updateTotal() {

    totalCoins.textContent =
        selectedCoins.toLocaleString();
}


/* =========================================
   PAYMENT METHODS
========================================= */

paymentMethods.forEach(paymentButton => {

    paymentButton.addEventListener(
        "click",
        () => {

            paymentMethods.forEach(item => {

                item.classList.remove(
                    "selected"
                );

            });


            paymentButton.classList.add(
                "selected"
            );


            selectedPayment =
                paymentButton.dataset.payment;
        }
    );

});


/* =========================================
   CONFIRM
========================================= */

confirmButton.addEventListener(
    "click",
    () => {

        const validUsername =
            validateUsername();


        // Username error
        if (!validUsername) {

            usernameInput.focus();

            return;
        }


        // Coin error
        if (selectedCoins <= 0) {

            alert(
                "Please select a Coin package."
            );

            return;
        }


        // Payment error
        if (!selectedPayment) {

            alert(
                "Please select a payment method."
            );

            return;
        }


        /*
            START LOADING
        */

        loadingOverlay.classList.add(
            "show"
        );


        /*
            Wait approximately 1 second
            before showing the result.
        */

        setTimeout(
            () => {

                loadingOverlay.classList.remove(
                    "show"
                );


                showSuccessModal();

            },
            1000
        );

    }
);


/* =========================================
   SUCCESS MODAL
========================================= */

function showSuccessModal() {

    const username =
        usernameInput.value.trim();


    successCoins.textContent =
        selectedCoins.toLocaleString();


    successUsername.textContent =
        "@" + username;


    successPrice.textContent =
        "$" + selectedPrice.toFixed(2);


    successPayment.textContent =
        selectedPayment;


    successOverlay.classList.add(
        "show"
    );
}


/* =========================================
   OK BUTTON
========================================= */

okButton.addEventListener(
    "click",
    () => {

        /*
            Add purchased coins
            to the simulated balance.
        */

        savedTotal += selectedCoins;


        localStorage.setItem(
            "demoCoinTotal",
            savedTotal
        );


        totalCoins.textContent =
            savedTotal.toLocaleString();


        successOverlay.classList.remove(
            "show"
        );


        /*
            Reset current selection
        */

        selectedCoins = 0;
        selectedPrice = 0;
        selectedPayment = "";


        coinPackages.forEach(item => {

            item.classList.remove(
                "selected"
            );

        });


        paymentMethods.forEach(item => {

            item.classList.remove(
                "selected"
            );

        });


        customSection.classList.remove(
            "show"
        );


        customCoinsInput.value = "";

        customPrice.textContent =
            "$0.00";
    }
);


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

successOverlay.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            successOverlay
        ) {

            successOverlay.classList.remove(
                "show"
            );

        }

    }
);
```
