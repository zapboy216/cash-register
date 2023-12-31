document.getElementById('purchase-btn').addEventListener('click', function() {
    const price =15; // Example price, can be dynamic
    const cash = parseFloat(document.getElementById('cash').value);
    let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]; // Example cash in drawer
    const changeDue = document.getElementById('change-due');

    if (cash < price) {
        alert('Customer does not have enough money to purchase the item');
    } else {
        let change = calculateChange(price, cash, cid);
        changeDue.textContent = formatChangeOutput(change);
    }
});


function calculateChange(price, cash, cid) {
    if (cash === price) {
        return "No change due - customer paid with exact cash";
    }

    let change = cash - price;
    let totalCID = cid.reduce((sum, curr) => sum + curr[1], 0);
    
    if (totalCID < change) {
        return " INSUFFICIENT_FUNDS";
    }

    let changeArray = cid.reverse().map(elem => {
        let amount = 0;
        const value = {
            "ONE HUNDRED": 100.00,
            "TWENTY": 20.00,
            "TEN": 10.00,
            "FIVE": 5.00,
            "ONE": 1.00,
            "QUARTER": 0.25,
            "DIME": 0.10,
            "NICKEL": 0.05,
            "PENNY": 0.01
        }[elem[0]];

        while (change >= value && elem[1] > 0) {
            amount += value;
            elem[1] -= value;
            change -= value;
            change = Math.round(change * 100) / 100;
        }

        return amount ? [elem[0], amount] : null;
    }).filter(elem => elem != null);

    if (change > 0) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    if (totalCID === cash - price) {
        return "Status: CLOSED";
    }

    return changeArray;
}



function formatChangeOutput(change) {
    if (typeof change === 'string') {
        return change;
    }

    return change.reduce((acc, curr) => {
        acc += ` ${curr[0]}: $${curr[1].toFixed(2)}`;
        return acc;
    }, "Status: OPEN");
}


