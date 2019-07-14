const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const respOne = document.querySelector('#resp-1')
const respTwo = document.querySelector('#resp-2')
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const address = search.value
    const url = `http://localhost:3000/weather?address=${address}`
    
    respOne.textContent = "Loading..."
    respTwo.textContent = ''

    fetch(url).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                respOne.textContent = `${data.error}`
            } else {
                console.log(data)
                respOne.textContent = data.location
                respTwo.textContent = data.forecast
            }
        })
    })
})





