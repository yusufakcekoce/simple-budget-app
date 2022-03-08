const balance = document.getElementById("balance")
const inflow = document.getElementById("income")
const outflow = document.getElementById("expense")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")

const localStorageTransactions = JSON.parse(
    localStorage.getItem("transactions")
)

let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : []

// add transaction \\

function addTransaction(e) {
    e.preventDefault();
  
    if (text.value.trim() === "" || amount.value.trim() === "") {
      document.getElementById("error_msg").innerHTML =
        "<span >Error: Please make sure to enter all values</span>";
      setTimeout(
        () => (document.getElementById("error_msg").innerHTML = ""),
        5000
      );
    } else {
      const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value,
      };
  
      transactions.push(transaction);
  
      addTransactionDOM(transaction);
  
      updateValues();
  
      updateLocalStorage();
  
      text.value = "";
      amount.value = "";
    }
}
  
// generate random ID \\
function generateID() {
    return Math.floor(Math.random() * 100000000)
}

// transactions history \\
function addTransactionDOM(transaction) {
    // get sign \\
    const sign = transaction.amount < 0 ? "-" : "+"
    const item = document.createElement("li")

    // add class based on value \\
    item.classList.add(transaction.amount < 0 ? "minus" : "plus")

    item.innerHTML = `
    ${transaction.text} ${sign}${Math.abs(
        transaction.amount
    )} <button class="delete-btn" onclick="removeTransaction(${
        transaction.id
    })">clear</button>
    `
    list.appendChild(item)
}

// update the balance, inflow and outflow \\
function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount)

    const total = amounts.reduce((bal, value) => (bal += value), 0).toFixed(2)

    const income = amounts
    .filter((value) => value > 0)
    .reduce((bal, value) => (bal += value), 0)
    .toFixed(2)

    const expense =
    amounts
    .filter((value) => value <0)
    .reduce((bal, value) => (bal += value), 0) * -(1).toFixed(2)

    balance.innerText = `$${total}`
    inflow.innerText = `$${income}`
    outflow.innerText = `$${expense}`
}

// remove transaction \\
function removeTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id)

    updateLocalStorage()
    start()
}

// update local storage tansactions \\
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

// start app \\
function start() {
    list.innerHTML = ""
    transactions.forEach(addTransactionDOM)
    updateValues()
}
start()

form.addEventListener("submit", addTransaction)