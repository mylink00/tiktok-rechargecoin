const usernameInput =
    document.getElementById("username");

const usernameStatus =
    document.getElementById("username-status");

const coinCards =
    document.querySelectorAll(".coin-card");

const customCard =
    document.getElementById("custom-card");

const customSection =
    document.getElementById("custom-section");

const customCoinsInput =
    document.getElementById("custom-coins");

const customPrice =
    document.getElementById("custom-price");

const paymentCards =
    document.querySelectorAll(".payment-card");

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


let selectedCoins = 0;

let selectedPrice = 0;

let selectedPayment = "";


/* =========================
   USERNAME VALIDATION
========================= */

usernameInput.addEventListener(
    "input",
    function () {

        const username =
            usernameInput.value.trim();


        usernameStatus.textContent = "";

        usernameStatus.classList.remove(
            "valid",
            "invalid"
        );


        if (username.length === 0) {
            return;
        }


        /*
         * Username phải:
         * - ít nhất 4 ký tự
         * - không có dấu tiếng Việt
         * - không có khoảng trắng
         */

        const vietnameseCharacters =
            /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;


        const hasVietnamese =
            vietnameseCharacters.test(username);


        const hasWhitespace =
            /\s/.test(username);


        if (
            username.length >= 4 &&
            !hasVietnamese &&
            !hasWhitespace
        ) {

            usernameStatus.textContent = "✓";

            usernameStatus.classList.add(
                "valid"
            );

        } else {

            usernameStatus.textContent = "×";

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
                    card.id === "custom-card"
                ) {

                    customSection.classList.remove(
                        "hidden"
                    );

                    selectedCoins = 0;

                    selectedPrice = 0;

                    totalCoins.textContent = "0";

                    customCoinsInput.focus();

                    updateCustomPrice();

                    return;
                }


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
        );

    }
);


/* =========================
   CUSTOM COIN PRICE
========================= */


/*
 * Giá được lấy theo tỷ lệ
 * của các package hiện tại.
 *
 * 17,500 coins = $218.17
 *
 * Tỷ lệ:
 * 218.17 / 17500
 */

const COIN_PRICE_RATE =
    218.17 / 17500;


function updateCustomPrice() {

    const amount =
        Number(
            customCoinsInput.value
        );


    if (
        !amount ||
        amount <= 0
    ) {

        customPrice.textContent =
            "$0.00";

        selectedCoins = 0;

        selectedPrice = 0;

        totalCoins.textContent =
            "0";

        return;
    }


    const price =
        amount * COIN_PRICE_RATE;


    selectedCoins =
        Math.floor(amount);


    selectedPrice =
        price;


    customPrice.textContent =
        "$" +
        price.toFixed(2);


    totalCoins.textContent =
        selectedCoins.toLocaleString(
            "en-US"
        );

}


customCoinsInput.addEventListener(
    "input",
    updateCustomPrice
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
   CONFIRM
========================= */

confirmButton.addEventListener(
    "click",
    function () {

        const username =
            usernameInput.value.trim();


        /*
         * Validate username
         */

        const vietnameseCharacters =
            /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;


        if (
            username.length < 4 ||
            vietnameseCharacters.test(username) ||
            /\s/.test(username)
        ) {

            alert(
                "Please enter a valid username."
            );

            usernameInput.focus();

            return;
        }


        /*
         * Check coin
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
         * Check payment
         */

        if (
            !selectedPayment
        ) {

            alert(
                "Please select a payment method."
            );

            return;
        }


        /*
         * Loading ~1 second
         */

        loadingOverlay.classList.remove(
            "hidden"
        );


        setTimeout(
            function () {

                loadingOverlay.classList.add(
                    "hidden"
                );


                /*
                 * Fill modal
                 */

                modalCoins.textContent =
                    selectedCoins.toLocaleString(
                        "en-US"
                    );


                modalUsername.textContent =
                    "@" + username;


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


/*
 * Click outside modal
 */

successOverlay.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            successOverlay
        ) {

            successOverlay.classList.add(
                "hidden"
            );

        }

    }
);
