// Listener for the Purchase button
document.getElementById('purchase-btn').addEventListener('click', function() {
    // You can adjust these values as needed
    const price = 19.5; // Example item price
    const cash = parseFloat(document.getElementById('cash').value);
    const cid = [
        ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25],
        ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
    ];

    // Call function to get the change status and amount
    const { status, change } = getChangeStatus(price, cash, cid);

    // Displaying the result
    let displayText = `Status: ${status}`;
    if (status === 'OPEN') {
        displayText += ' ' + change.map(c => `${c.name}: $${c.amount.toFixed(2)}`).join(' ');
    }
    document.getElementById('change-due').innerText = displayText;
});

/**
 * Calculates the change due and determines the transaction status.
 * @param {number} price - Price of the item.
 * @param {number} cash - Cash given by the customer.
 * @param {Array} cid - Cash in the drawer.
 * @returns {Object} - The status of the transaction and the change due.
 */
function getChangeStatus(price, cash, cid) {
    let changeDue = cash - price;
    if (changeDue < 0) {
        alert("Customer does not have enough money to purchase the item");
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    const currencyUnits = {
        "PENNY": 0.01, "NICKEL": 0.05, "DIME": 0.1,
        "QUARTER": 0.25, "ONE": 1, "FIVE": 5,
        "TEN": 10, "TWENTY": 20, "ONE HUNDRED": 100
    };

    let changeArr = [];
    let totalCID = 0;

    // Reverse to handle higher denominations first
    for (let i = cid.length - 1; i >= 0; i--) {
        const coinName = cid[i][0];
        const coinTotal = cid[i][1];
        const coinValue = currencyUnits[coinName];
        let coinAmount = (coinTotal / coinValue).toFixed(0);
        let coinsToReturn = 0;

        while (changeDue >= coinValue && coinAmount > 0) {
            changeDue -= coinValue;
            changeDue = Math.round(changeDue * 100) / 100; // Round to avoid precision errors
            coinAmount--;
            coinsToReturn++;
            totalCID += coinValue;
        }

        if (coinsToReturn > 0) {
            changeArr.push({ name: coinName, amount: coinsToReturn * coinValue });
        }
    }

    if (changeDue > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    if (totalCID === cash - price) {
        return { status: "CLOSED", change: cid };
    }

    return { status: "OPEN", change: changeArr };
}
