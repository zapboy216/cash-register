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
    const currencyUnit = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 20,
        "ONE HUNDRED": 100
    };

    let change = cash - price;
    let changeArray = [];
    let totalCID = 0;
    cid.forEach(elem => totalCID += elem[1]);
    totalCID = totalCID.toFixed(2);

    if (totalCID < change) {
        return "Status: INSUFFICIENT_FUNDS";
    } else if (totalCID == change) {
        return "Status: CLOSED";
    } else {
        cid = cid.reverse();
        for (let elem of cid) {
            let temp = [elem[0], 0];
            while (change >= currencyUnit[elem[0]] && elem[1] > 0) {
                temp[1] += currencyUnit[elem[0]];
                elem[1] -= currencyUnit[elem[0]];
                change -= currencyUnit[elem[0]];
                change = change.toFixed(2);
            }
            if (temp[1] > 0) {
                changeArray.push(temp);
            }
        }
    }

    if (change > 0) {
        return "Status: INSUFFICIENT_FUNDS";
    } else {
        return changeArray.reduce((acc, curr) => {
            acc[curr[0]] = curr[1];
            return acc;
        }, { "Status": "OPEN" });
    }
}


function formatChangeOutput(change) {
    // Formats the output based on the change object or status string
    // Returns a string for display
}

