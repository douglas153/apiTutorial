import fetch from 'node-fetch'

const promise = fetch('https://jsonplaceholder.typicode.com/todos/1'); 

promise 
 .then(res => res.json())
 .then(user => console.log('hi ' , user.title))
 .catch(err => console.err('no', err))   

 console.log('Sincrono')