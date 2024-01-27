// ES Modules in Node >= 14 no longer have require by default.
// If you want to add it, put this code at the top of your file:

// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// const { response } = require("express")

console.log('Client side javascript file')

//select the element from client side html to interact with it
const weatherForm = document.querySelector('form') //find element by its name (input)
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1') //to find by id start eith #, to find by class start with .
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevent default behaviour of forms for refreshing the page
    const location = search.value
    messageOne.textContent = "Loading ..."
    messageTwo.textContent = ""
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error
            } else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
            }
        })
    })

})