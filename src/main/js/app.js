import React from 'react'; 
import TodoList from './todo-list'

class App extends React.Component {
    constructor() {
        super(); 
        
        this.state = {
            todoList: null
        }
    }

    render() {
        return (
            <TodoList name="Bob's List" todos={[{id: 1, name: 'Task 1', complete: false}, {id :2, name: 'Task 2', complete: true}]} user='Bob'/>
        );
    }
}

export default App;
