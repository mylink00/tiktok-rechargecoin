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
   ERROR POPUP
========================= */

/*
 * Create error popup automatically.
 * No changes are required in index.html.
 */

function showErrorPopup(
    title,
    message,
    targetElement = null
) {

    /*
     * Remove existing error popup
     */

    const oldPopup =
        document.getElementById(
            "validation-error-popup"
        );

    if (oldPopup) {
        oldPopup.remove();
    }


    /*
     * Overlay
     */

    const overlay =
        document.createElement("div");

    overlay.id =
        "validation-error-popup";


    /*
     * Popup box
     */

    const popup =
        document.createElement("div");

    popup.className =
        "validation-error-box";


    /*
     * Error icon
     */

    const icon =
        document.createElement("div");

    icon.className =
        "validation-error-icon";

    icon.textContent =
        "!";


    /*
     * Title
     */

    const titleElement =
        document.createElement("h3");

    titleElement.className =
        "validation-error-title";

    titleElement.textContent =
        title;


    /*
     * Message
     */

    const messageElement =
        document.createElement("p");

    messageElement.className =
        "validation-error-message";

    messageElement.textContent =
        message;


    /*
     * OK button
     */

    const button =
        document.createElement("button");

    button.type =
        "button";

    button.className =
        "validation-error-button";

    button.textContent =
        "OK";


    /*
     * Put everything together
     */

    popup.appendChild(icon);

    popup.appendChild(titleElement);

    popup.appendChild(messageElement);

    popup.appendChild(button);

    overlay.appendChild(popup);

    document.body.appendChild(overlay);


    /*
     * Show animation
     */

    requestAnimationFrame(
        function () {

            overlay.classList.add(
                "show"
            );

        }
    );


    /*
     * Close popup
     */

    function closeErrorPopup() {

        overlay.classList.remove(
            "show"
        );

        setTimeout(
            function () {

                if (overlay.parentNode) {

                    overlay.parentNode.removeChild(
                        overlay
                    );

                }

            },
            180
        );

    }


    button.addEventListener(
        "click",
        closeErrorPopup
    );


    /*
     * Click outside popup
     */

    overlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target === overlay
            ) {

                closeErrorPopup();

            }

        }
    );


    /*
     * ESC key
     */

    function handleEscape(event) {

        if (
            event.key === "Escape"
        ) {

            closeErrorPopup();

            document.removeEventListener(
                "keydown",
                handleEscape
            );

        }

    }

    document.addEventListener(
        "keydown",
        handleEscape
    );


    /*
     * Focus the required field
     * after closing the popup.
     */

    if (targetElement) {

        button.addEventListener(
            "click",
            function () {

                setTimeout(
                    function () {

                        targetElement.focus();

                    },
                    50
                );

            }
        );

    }

}


/* =========================
   VALIDATION POPUP STYLE
========================= */

/*
 * The popup CSS is inserted
 * automatically by JavaScript.
 */

if (
    !document.getElementById(
        "validation-popup-style"
    )
) {

    const style =
        document.createElement("style");

    style.id =
        "validation-popup-style";

    style.textContent = `

        #validation-error-popup {
            position: fixed;
            inset: 0;
            z-index: 20000;

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 20px;

            background:
                rgba(0, 0, 0, 0.42);

            opacity: 0;

            transition:
                opacity 0.18s ease;
        }


        #validation-error-popup.show {
            opacity: 1;
        }


        .validation-error-box {
            width: 390px;
            max-width: calc(100vw - 40px);

            background: #ffffff;

            border-radius: 14px;

            padding:
                30px 28px 25px;

            text-align: center;

            box-shadow:
                0 15px 45px
                rgba(0, 0, 0, 0.20);

            transform:
                scale(0.94);

            transition:
                transform 0.18s ease;
        }


        #validation-error-popup.show
        .validation-error-box {
            transform:
                scale(1);
        }


        .validation-error-icon {
            width: 58px;
            height: 58px;

            margin:
                0 auto 17px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 50%;

            background: #fff1f2;

            border:
                3px solid #ff3040;

            color: #ff3040;

            font-size: 32px;
            font-weight: 700;
        }


        .validation-error-title {
            margin:
                0 0 10px;

            color: #222222;

            font-size: 21px;
            font-weight: 700;
        }


        .validation-error-message {
            margin:
                0 0 24px;

            color: #666666;

            font-size: 15px;

            line-height: 1.5;
        }


        .validation-error-button {
            min-width: 78px;

            padding:
                11px 22px;

            border: none;

            border-radius: 8px;

            background: #ff0050;

            color: #ffffff;

            font-size: 15px;
            font-weight: 700;

            cursor: pointer;

            transition:
                background 0.15s ease,
                transform 0.15s ease;
        }


        .validation-error-button:hover {
            background: #e90049;
        }


        .validation-error-button:active {
            transform:
                scale(0.97);
        }

    `;

    document.head.appendChild(style);

}


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
   RESET FOR NEXT REQUEST
========================= */

function resetForNextRequest() {

    /*
     * Clear username
     */

    usernameInput.value = "";


    /*
     * Clear username status
     */

    usernameStatus.textContent = "";

    usernameStatus.className =
        "username-status";


    /*
     * Remove selected coin
     */

    coinCards.forEach(
        function (card) {

            card.classList.remove(
                "selected"
            );

        }
    );


    /*
     * Reset coin values
     */

    selectedCoins = 0;

    selectedPrice = 0;

    isCustom = false;


    /*
     * Reset total
     */

    totalCoins.textContent =
        "0";


    /*
     * Reset custom section
     */

    customSection.classList.add(
        "hidden"
    );


    /*
     * Reset custom input
     */

    customCoinsInput.value = "";

    customPrice.textContent =
        "$0.00";


    /*
     * Remove selected payment
     */

    paymentCards.forEach(
        function (card) {

            card.classList.remove(
                "selected"
            );

        }
    );


    /*
     * Reset payment

     */

    selectedPayment = "";

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


        /*
         * =================================
         * ERROR 1 — USERNAME
         * =================================
         */

        if (
            username.length === 0
        ) {

            showErrorPopup(
                "Username Required",
                "Please enter your TikTok username before continuing.",
                usernameInput
            );

            return;

        }


        /*
         * Invalid username
         */

        if (
            !validUsername.test(username)
        ) {

            showErrorPopup(
                "Invalid Username",
                "Please enter a valid username using 4–30 letters, numbers, underscores, or periods.",
                usernameInput
            );

            return;

        }


        /*
         * =================================
         * ERROR 2 — COIN PACKAGE
         * =================================
         */

        if (
            selectedCoins <= 0
        ) {

            showErrorPopup(
                "Coin Package Required",
                "Please select a coin package before continuing."
            );

            return;

        }


        /*
         * =================================
         * ERROR 3 — PAYMENT
         * =================================
         */

        if (
            selectedPayment === ""
        ) {

            showErrorPopup(
                "Payment Method Required",
                "Please select a payment method before continuing."
            );

            return;

        }


       /*
 * Disable button
 */

confirmButton.disabled = true;


/*
 * Start Face ID style scanning
 */

startFaceIDScan();


/*
 * Wait for the scan animation
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
                 * Username
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
   CLOSE SUCCESS MODAL
========================= */

closeModal.addEventListener(
    "click",
    function () {

        /*
         * Hide successful popup
         */

        successOverlay.classList.add(
            "hidden"
        );


        /*
         * Prepare a completely
         * fresh request
         */

        resetForNextRequest();

    }
);


/* =========================
   CLICK OUTSIDE SUCCESS MODAL
========================= */

successOverlay.addEventListener(
    "click",
    function (event) {

        if (
            event.target === successOverlay
        ) {

            /*
             * Hide successful popup
             */

            successOverlay.classList.add(
                "hidden"
            );


            /*
             * Reset for next request
             */

            resetForNextRequest();

        }

    }
);
