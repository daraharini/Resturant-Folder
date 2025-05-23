document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const totalAmount = urlParams.get("amount") || "0.00";

    document.getElementById("payment-amount").textContent = totalAmount;

    function generateUPILink(provider) {
        let upiID = "yourupi@upi";  // Replace with your UPI ID

        return `upi://pay?pa=${upiID}&pn=AI Restaurant&am=${totalAmount}&cu=INR`;
    }

    document.getElementById("pay-phonepe").addEventListener("click", function () {
        window.location.href = generateUPILink("phonepe");
    });

    document.getElementById("pay-googlepay").addEventListener("click", function () {
        window.location.href = generateUPILink("googlepay");
    });
});
