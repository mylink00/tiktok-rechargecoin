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

    const oldPopup =
        document.getElementById(
            "validation-error-popup"
        );

    if (oldPopup) {
        oldPopup.remove();
    }


    const overlay =
        document.createElement("div");

    overlay.id =
        "validation-error-popup";


    const popup =
        document.createElement("div");

    popup.className =
        "validation-error-box";


    const icon =
        document.createElement("div");

    icon.className =
        "validation-error-icon";

    icon.textContent =
        "!";


    const titleElement =
        document.createElement("h3");

    titleElement.className =
        "validation-error-title";

    titleElement.textContent =
        title;


    const messageElement =
        document.createElement("p");

    messageElement.className =
        "validation-error-message";

    messageElement.textContent =
        message;


    const button =
        document.createElement("button");

    button.type =
        "button";

    button.className =
        "validation-error-button";

    button.textContent =
        "OK";


    popup.appendChild(icon);

    popup.appendChild(titleElement);

    popup.appendChild(messageElement);

    popup.appendChild(button);

    overlay.appendChild(popup);

    document.body.appendChild(overlay);


    requestAnimationFrame(
        function () {

            overlay.classList.add(
                "show"
            );

        }
    );


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


/* =========================================================
   FACE ID SCANNER
========================================================= */

/*
 * Face ID style scanner.
 *
 * This is only a visual simulation.
 * It does NOT access the camera
 * and does NOT scan a real face.
 *
 * The existing loading-overlay from
 * index.html is reused.
 */


/* =========================
   FACE ID STYLE
========================= */

if (
    !document.getElementById(
        "face-id-style"
    )
) {

    const faceStyle =
        document.createElement("style");

    faceStyle.id =
        "face-id-style";

    faceStyle.textContent = `

        .face-id-screen {
            width: 100%;
            height: 100%;

            display: flex;
            flex-direction: column;

            align-items: center;
            justify-content: center;

            background:
                rgba(255, 255, 255, 0.94);

            color: #111111;

            animation:
                faceScreenIn
                0.22s
                ease-out;
        }


        @keyframes faceScreenIn {

            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }

        }


        .face-id-container {
            width: 220px;
            height: 220px;

            position: relative;

            display: flex;
            align-items: center;
            justify-content: center;
        }


        /*
         * Face outline
         */

        .face-id-face {
            width: 130px;
            height: 155px;

            position: relative;

            border:
                3px solid #111111;

            border-radius:
                48% 48% 45% 45%;

            opacity: 0.95;

            animation:
                facePulse
                1.8s
                ease-in-out;
        }


        @keyframes facePulse {

            0% {
                transform: scale(0.94);
                opacity: 0.55;
            }

            35% {
                transform: scale(1);
                opacity: 1;
            }

            70% {
                transform: scale(1.02);
                opacity: 1;
            }

            100% {
                transform: scale(1);
                opacity: 1;
            }

        }


        /*
         * Eyes
         */

        .face-id-eyes {
            position: absolute;

            top: 56px;
            left: 50%;

            width: 72px;

            transform:
                translateX(-50%);

            display: flex;

            justify-content:
                space-between;
        }


        .face-id-eye {
            width: 10px;
            height: 10px;

            background:
                #111111;

            border-radius: 50%;
        }


        /*
         * Nose
         */

        .face-id-nose {
            position: absolute;

            top: 78px;
            left: 50%;

            width: 3px;
            height: 20px;

            transform:
                translateX(-50%);

            background:
                #111111;

            border-radius: 3px;
        }


        /*
         * Mouth
         */

        .face-id-mouth {
            position: absolute;

            left: 50%;
            bottom: 28px;

            width: 36px;
            height: 16px;

            transform:
                translateX(-50%);

            border-bottom:
                3px solid #111111;

            border-radius:
                0 0 50% 50%;
        }


        /*
         * Scanning line
         */

        .face-id-scan-line {
            position: absolute;

            left: 37px;
            right: 37px;

            height: 3px;

            top: 28px;

            background:
                #007aff;

            border-radius: 10px;

            box-shadow:
                0 0 8px
                rgba(0, 122, 255, 0.65),

                0 0 18px
                rgba(0, 122, 255, 0.35);

            animation:
                faceScanLine
                1.45s
                ease-in-out
                infinite;
        }


        @keyframes faceScanLine {

            0% {
                top: 32px;
                opacity: 0;
            }

            12% {
                opacity: 1;
            }

            50% {
                top: 178px;
                opacity: 1;
            }

            88% {
                opacity: 1;
            }

            100% {
                top: 32px;
                opacity: 0;
            }

        }


        /*
         * Face ID corner brackets
         */

        .face-corner {
            position: absolute;

            width: 34px;
            height: 34px;

            border-color:
                #111111;

            border-style:
                solid;

            border-width:
                0;
        }


        .face-corner.top-left {
            top: 12px;
            left: 12px;

            border-top-width: 3px;
            border-left-width: 3px;

            border-radius:
                8px 0 0 0;
        }


        .face-corner.top-right {
            top: 12px;
            right: 12px;

            border-top-width: 3px;
            border-right-width: 3px;

            border-radius:
                0 8px 0 0;
        }


        .face-corner.bottom-left {
            bottom: 12px;
            left: 12px;

            border-bottom-width: 3px;
            border-left-width: 3px;

            border-radius:
                0 0 0 8px;
        }


        .face-corner.bottom-right {
            bottom: 12px;
            right: 12px;

            border-bottom-width: 3px;
            border-right-width: 3px;

            border-radius:
                0 0 8px 0;
        }


        /*
         * Text
         */

        .face-id-title {
            margin-top: 8px;

            font-size: 21px;

            font-weight: 600;

            color: #111111;

            letter-spacing:
                -0.2px;
        }


        .face-id-status {
            margin-top: 8px;

            font-size: 15px;

            color: #777777;

            transition:
                color 0.2s ease;
        }


        /*
         * Verified state
         */

        .face-id-screen.verified
        .face-id-face {

            border-color:
                #16a34a;

            animation:
                faceVerified
                0.35s
                ease-out
                forwards;
        }


        @keyframes faceVerified {

            0% {
                transform:
                    scale(1);
            }

            50% {
                transform:
                    scale(1.07);
            }

            100% {
                transform:
                    scale(1);
            }

        }


        .face-id-screen.verified
        .face-id-eye,
        .face-id-screen.verified
        .face-id-nose,
        .face-id-screen.verified
        .face-id-mouth,
        .face-id-screen.verified
        .face-corner {

            border-color:
                #16a34a;

            background-color:
                #16a34a;
        }


        .face-id-screen.verified
        .face-id-status {

            color:
                #16a34a;

            font-weight:
                600;
        }


        .face-id-screen.verified
        .face-id-scan-line {

            display:
                none;
        }


        /*
         * Mobile
         */

        @media (max-width: 600px) {

            .face-id-container {
                width: 190px;
                height: 190px;
            }


            .face-id-face {
                width: 112px;
                height: 138px;
            }


            .face-id-eyes {
                top: 50px;
                width: 64px;
            }


            .face-id-nose {
                top: 70px;
            }


            .face-id-mouth {
                bottom: 25px;
            }


            .face-id-scan-line {
                left: 30px;
                right: 30px;
            }

        }

    `;

    document.head.appendChild(faceStyle);

}


/* =========================
   FACE ID SCAN FUNCTION
========================= */

function startFaceIDScan() {

    return new Promise(
        function (resolve) {

            /*
             * Clear existing content
             * inside loading overlay.
             */

            loadingOverlay.innerHTML = "";


            /*
             * Create Face ID screen
             */

            const screen =
                document.createElement("div");

            screen.className =
                "face-id-screen";


            /*
             * Face ID container
             */

            const container =
                document.createElement("div");

            container.className =
                "face-id-container";


            /*
             * Face outline
             */

            const face =
                document.createElement("div");

            face.className =
                "face-id-face";


            /*
             * Eyes
             */

            const eyes =
                document.createElement("div");

            eyes.className =
                "face-id-eyes";


            const eyeLeft =
                document.createElement("div");

            eyeLeft.className =
                "face-id-eye";


            const eyeRight =
                document.createElement("div");

            eyeRight.className =
                "face-id-eye";


            eyes.appendChild(
                eyeLeft
            );

            eyes.appendChild(
                eyeRight
            );


            /*
             * Nose
             */

            const nose =
                document.createElement("div");

            nose.className =
                "face-id-nose";


            /*
             * Mouth
             */

            const mouth =
                document.createElement("div");

            mouth.className =
                "face-id-mouth";


            /*
             * Scan line
             */

            const scanLine =
                document.createElement("div");

            scanLine.className =
                "face-id-scan-line";


            /*
             * Corner brackets
             */

            const topLeft =
                document.createElement("div");

            topLeft.className =
                "face-corner top-left";


            const topRight =
                document.createElement("div");

            topRight.className =
                "face-corner top-right";


            const bottomLeft =
                document.createElement("div");

            bottomLeft.className =
                "face-corner bottom-left";


            const bottomRight =
                document.createElement("div");

            bottomRight.className =
                "face-corner bottom-right";


            /*
             * Build face
             */

            face.appendChild(
                eyes
            );

            face.appendChild(
                nose
            );

            face.appendChild(
                mouth
            );


            /*
             * Build container
             */

            container.appendChild(
                face
            );

            container.appendChild(
                scanLine
            );

            container.appendChild(
                topLeft
            );

            container.appendChild(
                topRight
            );

            container.appendChild(
                bottomLeft
            );

            container.appendChild(
                bottomRight
            );


            /*
             * Title
             */

            const title =
                document.createElement("div");

            title.className =
                "face-id-title";

            title.textContent =
                "Face ID";


            /*
             * Status

             */

            const status =
                document.createElement("div");

            status.className =
                "face-id-status";

            status.textContent =
                "Scanning...";


            /*
             * Build screen
             */

            screen.appendChild(
                container
            );

            screen.appendChild(
                title
            );

            screen.appendChild(
                status
            );


            /*
             * Put Face ID
             * inside loading overlay
             */

            loadingOverlay.appendChild(
                screen
            );


            /*
             * Show scanner
             */

            loadingOverlay.classList.remove(
                "hidden"
            );


            /*
             * After scanning,
             * show verified state.
             */

            setTimeout(
                function () {

                    screen.classList.add(
                        "verified"
                    );

                    status.textContent =
                        "Face ID Verified";

                },
                1350
            );


            /*
             * Complete scan.
             *
             * Total time:
             * approximately 1.8 seconds.
             */

            setTimeout(
                function () {

                    loadingOverlay.classList.add(
                        "hidden"
                    );

                    resolve();

                },
                1800
            );

        }
    );

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


                    customPrice.textContent =
                        "$0.00";


                    customSection.classList.remove(
                        "hidden"
                    );


                    customCoinsInput.focus();

                }


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
   PAYMENT SELECTION
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
   SUCCESS CHECK ANIMATION
========================= */

function playSuccessAnimation() {

    successIcon.classList.remove(
        "success-animate"
    );


    void successIcon.offsetWidth;


    successIcon.classList.add(
        "success-animate"
    );

}


/* =========================
   RESET FOR NEXT REQUEST
========================= */

function resetForNextRequest() {

    usernameInput.value = "";


    usernameStatus.textContent = "";

    usernameStatus.className =
        "username-status";


    coinCards.forEach(
        function (card) {

            card.classList.remove(
                "selected"
            );

        }
    );


    selectedCoins = 0;

    selectedPrice = 0;

    isCustom = false;


    totalCoins.textContent =
        "0";


    customSection.classList.add(
        "hidden"
    );


    customCoinsInput.value = "";

    customPrice.textContent =
        "$0.00";


    paymentCards.forEach(
        function (card) {

            card.classList.remove(
                "selected"
            );

        }
    );


    selectedPayment = "";

}


/* =========================
   CONFIRM
========================= */

confirmButton.addEventListener(
    "click",
    async function () {

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
         * ERROR 1 — USERNAME
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
         * ERROR 2 — COIN PACKAGE
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
         * ERROR 3 — PAYMENT
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
         * Disable Confirm
         */

        confirmButton.disabled = true;


        /*
         * =================================
         * FACE ID SCAN
         * =================================
         *
         * This replaces the old
         * 1-second loading spinner.
         */

        await startFaceIDScan();


        /*
         * =================================
         * UPDATE SUCCESS MODAL
         * =================================
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
         * Price
         */

        modalPrice.textContent =
            "$" +
            selectedPrice.toFixed(2);


        /*
         * Payment
         */

        modalPayment.textContent =
            selectedPayment;


        /*
         * =================================
         * SHOW SUCCESS MODAL
         * =================================
         */

        successOverlay.classList.remove(
            "hidden"
        );


        /*
         * Play green check animation
         */

        playSuccessAnimation();


        /*
         * Enable Confirm again
         */

        confirmButton.disabled = false;

    }
);


/* =========================
   CLOSE SUCCESS MODAL
========================= */

closeModal.addEventListener(
    "click",
    function () {

        successOverlay.classList.add(
            "hidden"
        );


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

            successOverlay.classList.add(
                "hidden"
            );


            resetForNextRequest();

        }

    }
);
