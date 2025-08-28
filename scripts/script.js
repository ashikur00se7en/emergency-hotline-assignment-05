// Heart Icons Functionality

const cardHeartIcons = document.getElementsByClassName("card-heart-icon");

for (const cardHeartIcon of cardHeartIcons) {
    cardHeartIcon.addEventListener("click", function () {
        let navbarHeartCountValue = document.getElementById("navbar-heart-count").innerText;
        let navbarHeartCountValueNumber = parseInt(navbarHeartCountValue);
        document.getElementById("navbar-heart-count").innerText = navbarHeartCountValueNumber + 1;
    })
}

// Call Buttons Functionality

const callButtons = document.getElementsByClassName("call-button");

for (const callButton of callButtons) {
    callButton.addEventListener("click", function () {
        const serviceName = callButton.parentNode.parentNode.children[2].innerText;
        const serviceNumber = callButton.parentNode.parentNode.children[3].innerText;

        let remainingCoinValue = document.getElementById("remaining-coin-value").innerText;
        let remainingCoinValueNumber = parseInt(remainingCoinValue);

        let currentTime = new Date().toLocaleTimeString();

        if (remainingCoinValueNumber < 20) {
            alert("❌ You don't have enough coins. You need at least 20 coins to make a call.")
        }
        else {
            alert(`📞 Calling ${serviceName} ${serviceNumber}`);
            document.getElementById("remaining-coin-value").innerText = (remainingCoinValueNumber - 20);

            const createdDiv = document.createElement("div");
            createdDiv.innerHTML = `<div class="flex justify-between items-center bg-[#f2f2f2] rounded-lg p-4">
                        <div>
                            <p class="text-[#111111] inter-font font-semibold text-base">${serviceName}</p>
                            <h1 class="text-[#111111] inter-font font-semibold text-base">${serviceNumber}</h1>
                        </div>
                        <h2>${currentTime}</h2>
                    </div>`

            const callHistoryContainer = document.getElementById("call-history-container");
            callHistoryContainer.appendChild(createdDiv);

        }

    })
}