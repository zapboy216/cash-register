document.getElementById('purchase-btn').addEventListener('click', function() {
    const price = 19.5; // Example price, can be dynamic
    const cash = parseFloat(document.getElementById('cash').value);
    let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]; // Example cash in drawer
    const changeDue = document.getElementById('change-due');

    if (cash < price) {
        alert('Customer does not have enough money to purchase the item');
    } else if (cash === price) {
        changeDue.textContent = 'No change due - customer paid with exact cash';
    } else {
        let change = calculateChange(price, cash, cid);
        changeDue.textContent = formatChangeOutput(change);
    }
});

function calculateChange(price, cash, cid) {
    // Logic to calculate change based on price, cash, and cid
    // Returns an object or status string (e.g., 'INSUFFICIENT_FUNDS', 'CLOSED', 'OPEN')
}

function formatChangeOutput(change) {
    // Formats the output based on the change object or status string
    // Returns a string for display
}


// need to finish this