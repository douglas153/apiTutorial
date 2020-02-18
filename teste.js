function fazerRequisito(location) {
    // chamar a Promise (resolve- true, reject- false)
    return new Promise((resolve, reject) => {
        console.log(`Fazendo Requisito para o ${location}`)
        if (location == 'Google') {
            resolve('Google iniciou a pesquisa')
        } else {
            reject('Site de busca diferente')
        }
    })
}

function processarRequisito(response) {
    // chamar a Promise (response- )
    return new Promise((resolve, reject) => {
        console.log(`Processando Requisito ${response}`)
        resolve(`Info extra + ${response}`)
    })
}

//Chamar funçao 
fazerRequisito('Facebook').then(response => {
    console.log('resposta recebida')
    return processarRequisito(response)
}).then(processarResponse => {
    console.log(processarResponse)
}).catch(error => {
    console.log(error)
})