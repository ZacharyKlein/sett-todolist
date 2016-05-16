import React from 'react';
import Todo from './todo'

function TodoList(props) {
    
    return(
        <div>
            <h2>{ props.name }</h2>
                <form className="addTodo" onSubmit={ props.saveTodo }>
                    <input
                        type="text"
                        placeholder="Enter new task..."
                        onChange={props.newTodo}
                    />
                    <input type="submit" value="Save" />
                </form>
            <ul>
                { props.todos.sort((a, b) => a.id - b.id).map(function(todo) {
                    return <Todo key={ todo.id } todo={ todo } toggleComplete={ props.toggleComplete } />;
                })}

            </ul>
        </div>
    );
}


const {string, array, func} = React.PropTypes;
TodoList.propTypes = {
    name: string,
    todos: array,
    toggleComplete: func,
    newTodo: func,
    saveTodo: func
};

export default TodoList;