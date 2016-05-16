import React from 'react';
import TodoList from './todo-list'
import 'whatwg-fetch';

require('./styles/app.css');

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            todoLists: [],
            todoList: null,
            newTodo: ''
        }
    }

    componentDidMount() {
        fetch('/todoList/', {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
            this.setState({'todoLists': json});
        });
    }


    saveTodo(event) {
        console.log('saveTodo');
        event.preventDefault();
        
        if(this.state.newTodo) {

            fetch('/api/todo', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.newTodo,
                    complete: false,
                    todoList: {id: this.state.todoList.id}
                })
            }).then(response =>  {
                return response.json();
            }).then(json => {
                this.loadList(json.todoList.id)
            });
        }
    }
    
    newTodo(event) {
        this.setState({ newTodo: event.target.value })
    }
    
    loadList(id) {

        fetch('/todoList/' + id, {
            method: 'GET'
        }).then(response =>  {
            return response.json();
        }).then(json => {
            this.setState({todoList: json});
        });
    }

    selectList(event) {
        this.loadList(event.target.id);
    }

    toggleComplete(event) {
        console.log('toggleComplete!');
        console.log(event.target.id);


        const todo = this.state.todoList.todos.find((todo) => todo.id === Number(event.target.id) );
        if(todo) {
            console.log(todo);
            const toggledComplete = !todo.complete

            fetch('/api/todo/' + event.target.id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    complete: toggledComplete
                })
            }).then(response =>  {
                return response.json();
            }).then(json => {
                this.loadList(json.todoList.id)
            });
        }

    }

    render() {

        const selectList = this.selectList.bind(this);
        const toggleComplete = this.toggleComplete.bind(this);
        const saveTodo = this.saveTodo.bind(this);
        const newTodo = this.newTodo.bind(this);
        
        const todoList = this.state.todoList;

        return (<div className='todo-app'>
                <div className='side-pane'>
                    <h2>Todo Lists</h2>
                    <ul>
                        { this.state.todoLists.map(
                            function (todoList) {
                                return (
                                    <li key={ todoList.id }>
                                        <button id={ todoList.id } onClick={ selectList }>Select</button>
                                        { todoList.name }
                                    </li>);
                            }) }

                    </ul>
                </div>

                <div className="main">
                    { todoList ?
                        <TodoList name={ todoList.name }
                                  todos={ todoList.todos }
                                  toggleComplete={ toggleComplete }
                                  newTodo={ newTodo }
                                  saveTodo= { saveTodo }/>
                        : null }
                </div>
            </div>
        );
    }
}

export default App;
