const USD = 4.87
const EUR = 5.32
const GBP = 6.08


const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

amount.addEventListener("input", () => {
    
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

form.onsubmit = async (event) => {
    event.preventDefault()

    const currencyCode = currency.value
    let symbol = ""

    switch (currency.value) {
        case "USD":
            symbol = "US$"
            break
        case "EUR":
            symbol = "€"
            break
        case "GBP":
            symbol = "£"
            break
        default:
            symbol = "R$"
    }

    try {
        const response = await fetch(`https://economia.awesomeapi.com.br/last/${currencyCode}-BRL`)

        const data = await response.json()

        const rateInfo = data[currencyCode + "BRL"]

        const exchangeRate = Number(rateInfo.bid)

        convertCurrency(amount.value, exchangeRate, symbol)

    } catch (error) {
        console.log(error)
        alert("Não foi possível buscar a cotação atual. Tente novamente mais tarde.")
    }
}

function convertCurrency(amount, price, symbol) {
    try {
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        let total = Number(amount) * price

        if (isNaN(total)) {
            return alert("Por favor, digite o valor corretamente para converter.")
        }

        total = formatCurrencyBRL(total).replace("R$", "")

        result.textContent = `${total} Reais`

        footer.classList.add("show-result")
    } catch (error) {
      console.log(error)
      footer.classList.remove("show-result")
      alert("Não foi possível converter. Tente novamente mais tarde.")
    }
}

function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}