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

            newTodoText: '',
            newTodoList: ''
        }
    }

    componentDidMount() {
        this.loadLists();
    }

    loadLists() {
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
        event.preventDefault();

        if(this.state.newTodoText) {

            fetch('/api/todos', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.newTodoText,
                    complete: false,
                    todoList: {id: this.state.todoList.id}
                })
            }).then(response =>  {
                return response.json();
            }).then(json => {

                this.setState({newTodoText: ''});
                this.loadList(json.todoList.id)
            });
        }
    }

    updateNewTodoText(event) {
        this.setState({ newTodoText: event.target.value })
    }

    saveTodoList(event) {
        event.preventDefault();

        if(this.state.newTodoList) {

            fetch('/api/todoList', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.newTodoList
                })
            }).then(response =>  {
                return response.json();
            }).then(json => {

                this.setState({newTodoList: ''});


                this.loadLists();
                this.loadList(json.id);
            });
        }
    }

    newTodoList(event) {
        this.setState({ newTodoList: event.target.value })
    }
    
    loadList(id) {

        fetch('/api/todoList/' + id, {
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

            fetch('/api/todos/' + event.target.id, {
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

        //For a thorough explanation regarding the use bind() in Javascript and React, see this link:
        //http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
        const selectList = this.selectList.bind(this);
        const toggleComplete = this.toggleComplete.bind(this);

        const saveTodo = this.saveTodo.bind(this);
        const updateNewTodoText = this.updateNewTodoText.bind(this);

        const saveTodoList = this.saveTodoList.bind(this);
        const newTodoList = this.newTodoList.bind(this);
        
        const todoList = this.state.todoList;

        return (<div className='todo-app'>
                <div className='side-pane'>
                    <h2>Todo Lists</h2>

                    <form className="addTodoList" onSubmit={ saveTodoList }>
                        <input
                            value={ this.state.newTodoList }
                            type="text"
                            placeholder="Enter new list..."
                            onChange={ newTodoList }
                        />
                        <input type="submit" value="Save" />
                    </form>

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
                                  newTodoText={ this.state.newTodoText }
                                  updateNewTodoText = { updateNewTodoText }
                                  saveTodo= { saveTodo }/>
                        : null }
                </div>
            </div>
        );
    }
}

export default App;
