var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run(event) {
    event.preventDefault() 

    var zipCode = zipCodeField.value

    //Tratamento do Formato do CEP
    zipCode = zipCode.replace(" ", "")
    zipCode = zipCode.replace(".", "")
    zipCode = zipCode.trim()

    axios
    .get('https://viacep.com.br/ws/' + zipCode + '/json/')
    .then(function(response) {
        if(response.data.erro) {
            content.innerHTML = ''
            throw new Error('CEP inválido!')
        }
        content.innerHTML = ''
        createLine(response.data.logradouro)
        createLine(response.data.localidade + " / " + response.data.uf)
        createLine(response.data.bairro)
    })
    .catch(function(error) {
        console.log(error)
        createLine('Informação inválida impossivel de fazer essa OPERAÇÃO')
    })
}

function createLine(text) {
    var line = document.createElement('p')
    var text = document.createTextNode(text)
    line.appendChild(text)
    content.appendChild(line)
}
