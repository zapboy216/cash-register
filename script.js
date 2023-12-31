// Prices and cash denominations
const PRICE = 19.5;
const CASH_IN_DRAWER = [
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

// DOM elements
const displayChangeDueElement = document.getElementById('change-due');
const cashInputElement = document.getElementById('cash');
const purchaseButton = document.getElementById('purchase-btn');
const priceScreenElement = document.getElementById('price-screen');
const cashDrawerDisplayElement = document.getElementById('cash-drawer-display');

// Format and display results
const formatAndDisplayResults = (status, change) => {
  displayChangeDueElement.innerHTML = `<p>Status: ${status}</p>`;
  change.forEach(([denomination, amount]) => {
    displayChangeDueElement.innerHTML += `<p>${denomination}: $${amount.toFixed(2)}</p>`;
  });
};

// Check and process the cash register
const processCashRegister = () => {
  const cashAmount = parseFloat(cashInputElement.value);
  if (isNaN(cashAmount)) {
    alert('Invalid input. Please enter a numeric value.');
    cashInputElement.value = '';
    return;
  }

  if (cashAmount < PRICE) {
    alert('Customer does not have enough money for the purchase.');
    cashInputElement.value = '';
    return;
  }

  if (cashAmount === PRICE) {
    displayChangeDueElement.innerHTML = '<p>No change due - exact cash provided.</p>';
    cashInputElement.value = '';
    return;
  }

  let changeDue = cashAmount - PRICE;
  const reversedCashDrawer = [...CASH_IN_DRAWER].reverse();
  const denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let result = { status: 'OPEN', change: [] };

  let totalCashInDrawer = CASH_IN_DRAWER.reduce((total, [, amount]) => total + amount, 0);

  if (totalCashInDrawer < changeDue) {
    formatAndDisplayResults('INSUFFICIENT_FUNDS', []);
    return;
  }

  if (totalCashInDrawer === changeDue) {
    formatAndDisplayResults('CLOSED', CASH_IN_DRAWER);
    return;
  }

  reversedCashDrawer.forEach(([denomination, amount], index) => {
    let count = 0;
    while (amount > 0 && changeDue >= denominations[index]) {
      amount -= denominations[index];
      changeDue = parseFloat((changeDue - denominations
