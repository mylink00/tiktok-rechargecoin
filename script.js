document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ELEMENTS
    ========================= */

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


    /* =========================
       DATA
    ========================= */

    let selectedCoins = 0;

    let selectedPrice = 0;

    let selectedPayment = "";


    /*
        Giá custom:

        350 coins = $4.36

        Đây là tỷ lệ được sử dụng
        cho số coin nhập thủ công.
    */

    const COIN_RATE = 4.36 / 350;


    /* =========================
       USERNAME VALIDATION
    ========================= */

    usernameInput.addEventListener("input", function () {

        const username =
            usernameInput.value.trim();

        usernameStatus.className =
            "username-status";

        usernameStatus.textContent = "";


        /*
            Username hợp lệ:

            - từ 4 ký tự trở lên
            - chỉ cho phép:
              a-z
              A-Z
              0-9
              _
              .
        */

        const validUsername =
            /^[a-zA-Z0-9_.]{4,}$/.test(username);


        if (username.length === 0) {

            return;

        }


        if (validUsername) {

            usernameStatus.classList.add("valid");

            usernameStatus.textContent = "✓";

        } else {

            usernameStatus.classList.add("invalid");

            usernameStatus.textContent = "×";

        }

    });


    /* =========================
       COIN PACKAGE SELECTION
    ========================= */

    coinCards.forEach(function (card) {

        card.addEventListener("click", function () {

            /*
                Nếu là Custom thì
                xử lý riêng.
            */

            if (card === customCard) {

                coinCards.forEach(function (item) {
                    item.classList.remove("selected");
                });

                customCard.classList.add("selected");

                customSection.classList.remove("hidden");

                customCoinsInput.focus();

                updateCustomCoins();

                return;
            }


            /*
                Xóa lựa chọn cũ.
            */

            coinCards.forEach(function (item) {
                item.classList.remove("selected");
            });


            /*
                Chọn package hiện tại.
            */

            card.classList.add("selected");


            /*
                Ẩn Custom.
            */

            customSection.classList.add("hidden");


            /*
                Lấy dữ liệu từ HTML.
            */

            selectedCoins =
                Number(card.dataset.coins);

            selectedPrice =
                Number(card.dataset.price);


            /*
                Cập nhật tổng.
            */

            totalCoins.textContent =
                selectedCoins.toLocaleString("en-US");

        });

    });


    /* =========================
       CUSTOM COIN
    ========================= */

    customCoinsInput.addEventListener(
        "input",
        updateCustomCoins
    );


    function updateCustomCoins() {

        let coins =
            Number(customCoinsInput.value);


        if (!coins || coins < 1) {

            selectedCoins = 0;

            selectedPrice = 0;

            totalCoins.textContent = "0";

            customPrice.textContent = "$0.00";

            return;
        }


        /*
            Chỉ lấy số nguyên.
        */

        coins = Math.floor(coins);


        selectedCoins = coins;


        selectedPrice =
            coins * COIN_RATE;


        /*
            Hiển thị giá.
        */

        customPrice.textContent =
            "$" + selectedPrice.toFixed(2);


        totalCoins.textContent =
            selectedCoins.toLocaleString("en-US");

    }


    /* =========================
       PAYMENT SELECTION
    ========================= */

    paymentCards.forEach(function (card) {

        card.addEventListener("click", function () {

            paymentCards.forEach(function (item) {

                item.classList.remove("selected");

            });


            card.classList.add("selected");


            selectedPayment =
                card.dataset.payment;

        });

    });


    /* =========================
       CONFIRM
    ========================= */

    confirmButton.addEventListener(
        "click",
        function () {

            const username =
                usernameInput.value.trim();


            /*
                Kiểm tra username.
            */

            const validUsername =
                /^[a-zA-Z0-9_.]{4,}$/.test(username);


            if (!validUsername) {

                alert(
                    "Please enter a valid username."
                );

                usernameInput.focus();

                return;
            }


            /*
                Kiểm tra coin.
            */

            if (selectedCoins <= 0) {

                alert(
                    "Please select a coin package."
                );

                return;
            }


            /*
                Kiểm tra payment.
            */

            if (!selectedPayment) {

                alert(
                    "Please select a payment method."
                );

                return;
            }


            /*
                Hiện loading.
            */

            loadingOverlay.classList.remove("hidden");


            /*
                Chờ khoảng 1 giây.
            */

            setTimeout(function () {

                loadingOverlay.classList.add("hidden");


                /*
                    Điền dữ liệu vào modal.
                */

                modalCoins.textContent =
                    selectedCoins.toLocaleString("en-US");


                modalUsername.textContent =
                    "@" + username;


                modalPrice.textContent =
                    "$" + selectedPrice.toFixed(2);


                modalPayment.textContent =
                    selectedPayment;


                /*
                    Hiện modal.
                */

                successOverlay.classList.remove(
                    "hidden"
                );

            }, 1000);

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
        Cho phép click ra ngoài
        modal để đóng.
    */

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

});
