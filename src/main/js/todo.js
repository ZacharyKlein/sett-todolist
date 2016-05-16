/**
 * Created by zak on 5/13/16.
 */
import React from 'react';

function Todo(props) {

    return(
        <li>
            <span>{ props.todo.name }</span>
            <input type = "checkbox" checked={ props.todo.completed ? 'checked' : '' } />
        </li>
    );
}

const {shape, string, bool} = React.PropTypes;
Todo.propTypes = {
    todo: shape({
        name: string,
        completed: bool
    })
};

export default Todo;