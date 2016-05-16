import React from 'react';
import Todo from './todo'

function TodoList(props) {
    
    return(
        <div>
            <h2>{ props.name }</h2>
            <p>{ props.user }</p>

            <ul>
                { props.todos.sort((a, b) => b.id < a.id).map(function(todo) {
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
    user: string,
    toggleComplete: func
};

export default TodoList;