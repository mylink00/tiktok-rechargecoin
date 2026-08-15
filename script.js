/* =========================
   ELEMENTS
========================= */

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


const modalUsername =
    document.getElementById("modal-username");


const modalPrice =
    document.getElementById("modal-price");


const modalPayment =
    document.getElementById("modal-payment");


const successIcon =
    document.getElementById("success-icon");


/* =========================
   VARIABLES
========================= */

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
         * Username:
         * a-z
         * A-Z
         * 0-9
         * _
         * .
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

                /*
                 * Remove selected state
                 * from every coin card
                 */

                coinCards.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                /*
                 * Select current card
                 */

                card.classList.add(
                    "selected"
                );


                /*
                 * CUSTOM COIN
                 */

                if (
                    card === customCard
                ) {

                    isCustom = true;

                    selectedCoins = 0;

                    selectedPrice = 0;


                    totalCoins.textContent =
                        "0";


                    customPrice.textContent =
                        "$0.00";


                    customSection.classList.remove(
                        "hidden"
                    );


                    customCoinsInput.focus();

                }


                /*
                 * NORMAL COIN PACKAGE
                 */

                else {

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


        /*
         * Invalid quantity
         */

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


        /*
         * Only whole coins
         */

        selectedCoins =
            Math.floor(coins);


        /*
         * Prototype pricing
         */

        selectedPrice =
            selectedCoins * 0.01247;


        /*
         * Display price
         */

        customPrice.textContent =
            "$" +
            selectedPrice.toFixed(2);


        /*
         * Display total coins
         */

        totalCoins.textContent =
            selectedCoins.toLocaleString(
                "en-US"
            );

    }
);


/* =========================
   PAYMENT SELECTION
========================= */

paymentCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                /*
                 * Remove previous selection
                 */

                paymentCards.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                /*
                 * Select current payment
                 */

                card.classList.add(
                    "selected"
                );


                /*
                 * Save payment name
                 */

                selectedPayment =
                    card.dataset.payment;

            }
        );

    }
);


/* =========================
   SUCCESS CHECK ANIMATION
========================= */

function playSuccessAnimation() {

    /*
     * Remove previous animation
     */

    successIcon.classList.remove(
        "success-animate"
    );


    /*
     * Force browser to
     * restart animation
     */

    void successIcon.offsetWidth;


    /*
     * Start animation
     */

    successIcon.classList.add(
        "success-animate"
    );

}


/* =========================
   CONFIRM
========================= */

confirmButton.addEventListener(
    "click",
    function () {

        /*
         * Get username
         */

        const username =
            usernameInput.value.trim();


        /*
         * Username validation
         */

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


        /*
         * Coin validation
         */

        if (
            selectedCoins <= 0
        ) {

            alert(
                "Please select a coin package."
            );

            return;

        }


        /*
         * Payment validation
         */

        if (
            selectedPayment === ""
        ) {

            alert(
                "Please select a payment method."
            );

            return;

        }


        /*
         * Disable button
         */

        confirmButton.disabled = true;


        /*
         * Show loading
         */

        loadingOverlay.classList.remove(
            "hidden"
        );


        /*
         * Simulate processing
         */

        setTimeout(
            function () {

                /*
                 * Hide loading
                 */

                loadingOverlay.classList.add(
                    "hidden"
                );


                /*
                 * Update modal data
                 */

                modalCoins.textContent =
                    selectedCoins.toLocaleString(
                        "en-US"
                    );


                /*
                 * THIS FIXES
                 * @username PROBLEM
                 */

                modalUsername.textContent =
                    "@" + username;


                /*
                 * Update price
                 */

                modalPrice.textContent =
                    "$" +
                    selectedPrice.toFixed(2);


                /*
                 * Update payment

                 */

                modalPayment.textContent =
                    selectedPayment;


                /*
                 * Show success modal
                 */

                successOverlay.classList.remove(
                    "hidden"
                );


                /*
                 * Play animated
                 * green check
                 */

                playSuccessAnimation();


                /*
                 * Enable confirm button
                 */

                confirmButton.disabled = false;

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


/* =========================
   CLICK OUTSIDE MODAL
========================= */

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
