const usernameInput =
    document.getElementById("username");

const usernameStatus =
    document.getElementById("username-status");


const coinCards =
    document.querySelectorAll(".coin-card");


const paymentCards =
    document.querySelectorAll(".payment-card");


const customCard =
    document.getElementById("custom-card");


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


const closeModal =
    document.getElementById("close-modal");


const modalCoins =
    document.getElementById("modal-coins");


const modalPrice =
    document.getElementById("modal-price");


const modalPayment =
    document.getElementById("modal-payment");


let selectedCoins = 0;

let selectedPrice = 0;

let selectedPayment = "";

let isCustom = false;


/* =========================
   USERNAME VALIDATION
========================= */

usernameInput.addEventListener(
    "input",
    function () {

        const value =
            usernameInput.value.trim();


        usernameStatus.textContent = "";

        usernameStatus.className =
            "username-status";


        if (value.length === 0) {
            return;
        }


        /*
         * Only:
         * a-z
         * A-Z
         * 0-9
         * underscore
         * period
         */

        const validUsername =
            /^[A-Za-z0-9_.]{4,30}$/;


        if (
            validUsername.test(value)
        ) {

            usernameStatus.textContent =
                "✓";

            usernameStatus.classList.add(
                "valid"
            );

        } else {

            usernameStatus.textContent =
                "×";

            usernameStatus.classList.add(
                "invalid"
            );

        }

    }
);


/* =========================
   COIN SELECTION
========================= */

coinCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                coinCards.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                card.classList.add(
                    "selected"
                );


                if (
                    card === customCard
                ) {

                    isCustom = true;

                    selectedCoins = 0;

                    selectedPrice = 0;

                    totalCoins.textContent =
                        "0";

                    customSection.classList.remove(
                        "hidden"
                    );

                    customCoinsInput.focus();

                } else {

                    isCustom = false;

                    customSection.classList.add(
                        "hidden"
                    );


                    selectedCoins =
                        Number(
                            card.dataset.coins
                        );


                    selectedPrice =
                        Number(
                            card.dataset.price
                        );


                    totalCoins.textContent =
                        selectedCoins.toLocaleString(
                            "en-US"
                        );

                }

            }
        );

    }
);


/* =========================
   CUSTOM COIN
========================= */

customCoinsInput.addEventListener(
    "input",
    function () {

        if (!isCustom) {
            return;
        }


        const coins =
            Number(
                customCoinsInput.value
            );


        if (
            !Number.isFinite(coins) ||
            coins <= 0
        ) {

            selectedCoins = 0;

            selectedPrice = 0;

            totalCoins.textContent =
                "0";

            customPrice.textContent =
                "$0.00";

            return;

        }


        selectedCoins =
            Math.floor(coins);


        /*
         * Prototype pricing.
         * Approximately $0.01247 per coin.
         */

        selectedPrice =
            selectedCoins * 0.01247;


        customPrice.textContent =
            "$" +
            selectedPrice.toFixed(2);


        totalCoins.textContent =
            selectedCoins.toLocaleString(
                "en-US"
            );

    }
);


/* =========================
   PAYMENT
========================= */

paymentCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                paymentCards.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                card.classList.add(
                    "selected"
                );


                selectedPayment =
                    card.dataset.payment;

            }
        );

    }
);


/* =========================
   CONFIRM
========================= */

confirmButton.addEventListener(
    "click",
    function () {

        const username =
            usernameInput.value.trim();


        const validUsername =
            /^[A-Za-z0-9_.]{4,30}$/;


        if (
            !validUsername.test(username)
        ) {

            alert(
                "Please enter a valid username."
            );

            usernameInput.focus();

            return;

        }


        if (
            selectedCoins <= 0
        ) {

            alert(
                "Please select a coin package."
            );

            return;

        }


        if (
            selectedPayment === ""
        ) {

            alert(
                "Please select a payment method."
            );

            return;

        }


        /*
         * Show loading screen
         */

        loadingOverlay.classList.remove(
            "hidden"
        );


        confirmButton.disabled = true;


        setTimeout(
            function () {

                loadingOverlay.classList.add(
                    "hidden"
                );


                confirmButton.disabled = false;


                modalCoins.textContent =
                    selectedCoins.toLocaleString(
                        "en-US"
                    );


                modalPrice.textContent =
                    "$" +
                    selectedPrice.toFixed(2);


                modalPayment.textContent =
                    selectedPayment;


                successOverlay.classList.remove(
                    "hidden"
                );


            },
            1000
        );

    }
);


/* =========================
   CLOSE MODAL
========================= */

closeModal.addEventListener(
    "click",
    function () {

        successOverlay.classList.add(
            "hidden"
        );

    }
);


/* Click outside modal */

successOverlay.addEventListener(
    "click",
    function (event) {

        if (
            event.target === successOverlay
        ) {

            successOverlay.classList.add(
                "hidden"
            );

        }

    }
);
