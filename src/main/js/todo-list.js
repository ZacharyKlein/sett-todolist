/**
 * Created by zak on 5/13/16.
 */
import React from 'react';
import Todo from './todo'

function TodoList(props) {
    
    return(
        <div>
            <h2>{ props.name }</h2>
            <p>{ props.user }</p>

            <ul>
                { props.todos.map(function(todo) {
                    return <Todo key={ todo.id } todo={ todo }/>;
                })}
            </ul>

        </div>
    );
}


const {string, array} = React.PropTypes;
TodoList.propTypes = {
    name: string,
    todos: array,
    user: string
};

export default TodoList;