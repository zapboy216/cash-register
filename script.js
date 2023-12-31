// DOM element references
const displayChangeDue = document.getElementById('change-due'); // Display area for change due
const cash = document.getElementById('cash'); // Input field for cash received
const purchaseBtn = document.getElementById('purchase-btn'); // Button for initiating purchase
const priceScreen = document.getElementById('price-screen'); // Display area for price
const cashDrawerDisplay = document.getElementById('cash-drawer-display'); // Display area for cash drawer status

// Initial price of the item
let price = 19.5;

// Cash in drawer (cid) array with denomination names and amounts
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// Function to format and display the results
const formatResults = (status, change) => {
  displayChangeDue.innerHTML = `<p>Status: ${status}</p>`; // Displaying the status
  // Loop through change array and display each denomination and amount
  change.map(money => (displayChangeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`));
};

// Function to check the cash register
const checkCashRegister = () => {
  // Check if cash provided is less than price
  if (Number(cash.value) < price) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }

  // Check if cash provided is equal to the price
  if (Number(cash.value) === price) {
    displayChangeDue.innerHTML = '<p>No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
  }

  // Calculate change due
  let changeDue = Number(cash.value) - price;
  let reversedCid = [...cid].reverse(); // Reverse the cid array for ease of calculation
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]; // Array of denominations for calculation
  let result = { status: 'OPEN', change: [] }; // Result object to store the status and change
  // Calculate total cash in drawer
  let totalCID = parseFloat(cid.map(total => total[1]).reduce((prev, curr) => prev + curr).toFixed(2));

  // Check if cash in drawer is less than change due
  if (totalCID < changeDue) {
    return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  }

  // Check if cash in drawer is exactly equal to change due
  if (totalCID === changeDue) {
    formatResults('CLOSED', cid);
  }

  // Calculate the change to be returned
  for (let i = 0; i <= reversedCid.length; i++) {
    if (changeDue > denominations[i] && changeDue > 0) {
      let count = 0;
      let total = reversedCid[i][1];
      while (total > 0 && changeDue >= denominations[i]) {
        total -= denominations[i];
        changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2));
        count++;
      }
      result.change.push([reversedCid[i][0], count * denominations[i]]);
    }
  }

  // Check if change due is still greater than 0
  if (changeDue > 0) {
    return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  }

  // Format and display the results
  formatResults(result.status, result.change);
  updateUI(result.change);
};

// Function to check results upon button click
const checkResults = () => {
  if (!cash.value) {
    return;
  }
  checkCashRegister();
};

// Function to update the UI
const updateUI = change => {
  const currencyNameMap = { // Mapping of currency names for display
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };
  // Update cash in drawer if change is passed
  if (change) {
    change.forEach(changeArr => {
      const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
      targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
    });
  }

  // Clear the cash input field and update the display elements
  cash.value = '';
  priceScreen.textContent = `Total: $${price}`;
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid.map(money => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`).join('')}  
  `;
};

// Event listeners for purchase button and cash input field
purchaseBtn.addEventListener('click', checkResults);
cash.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkResults();
  }
});

// Initial UI update
updateUI();
