/**
 * Created by zak on 5/13/16.
 */
import React from 'react';

function Todo(props) {

    const todo = props.todo;

    return(
        <li>
            <input id={ todo.id } type="checkbox" checked={ todo.complete ? 'checked' : '' } onChange={ props.toggleComplete } />
            <span>{ todo.name }</span>
        </li>
    );
}

const {shape, number, string, bool, func} = React.PropTypes;
Todo.propTypes = {
    todo: shape({
        id: number.isRequired,
        name: string,
        completed: bool
    }),
    toggleComplete: func
};

export default Todo;