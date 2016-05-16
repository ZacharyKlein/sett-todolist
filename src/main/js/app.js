import React from 'react';
import TodoList from './todo-list'
import 'whatwg-fetch';

require('./styles/app.css');

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            todoLists: [],
            todoList: null
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
        const todoList = this.state.todoList;

        return (<div className='todo-app'>
                <div className='side-pane'>
                    <h2>Todo Lists</h2>
                    <ul>
                        { this.state.todoLists.map(
                            function (todoList) {
                                return (<li key={ todoList.id }>{ todoList.name } <button id={ todoList.id } onClick={ selectList }>Select</button></li>);
                            }) }

                    </ul>
                </div>

                <div className="main">
                    { todoList ? <TodoList name={ todoList.name } todos={ todoList.todos } user={ todoList.user.name } toggleComplete={ toggleComplete } /> : null }
                </div>
            </div>
        );
    }
}

export default App;
