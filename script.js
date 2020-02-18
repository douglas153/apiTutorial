//let p = new Promise ((resolve, reject) => {

    let a = 3
    let b = 1


function numeros(){
    return new Promise ((resolve, reject) => {
        if (a == 1){
            reject({
                message: 'numero esta errado 1'
            })
        }else if (b == 2){
            reject({
                message: 'numero esta errado 2'
            })
        }else 
        resolve('deu certo man!!')
    })
}

numeros().then((message) => {
    console.log('Sucess: ' + message)
}).catch((error ) => {
    console.log(error.message)
})