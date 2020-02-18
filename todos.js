 // MANIPULANDO EVENTOS CRUD
 // referenciar eventos na dom  getElementbyid, get

var listElement = document.querySelector('#app ul'); 

var inputElement = document.querySelector('#app input'); 

var buttonElement = document.querySelector('#app button'); 


var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

// renderizar elementos no html
function renderTodos(){
listElement.innerHTML = "";    
    for(todo of todos){
        var todoElement = document.createElement('li');

        var linkElement = document.createElement('a');
        linkElement.setAttribute("href" , '#')
        var linkText = document.createTextNode("Excluir")
        var todoText = document.createTextNode(todo);
        
        var pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'removeTodo(' + pos + ')');

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
        
        linkElement.appendChild(linkText);

    }
}
renderTodos(); 

// eventos na dom
function addTodo(){
    var todoText = inputElement.value; 

    todos.push(todoText); 
    inputElement.value = ''; 
    renderTodos();
    saveToStorage();

}
buttonElement.onclick = addTodo; 

function removeTodo(pos){

    todos.splice(0, 1); 
    renderTodos();
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('list_todos', JSON.stringify(todos))
}