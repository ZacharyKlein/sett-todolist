
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import Todo from '../../main/js/todo';


describe('Todo', () => {
    it('should have expected content', () => {

        const todo = {name: 'Task 1', complete: false, id: 1, list: { id: 1 }};

        function toggleComplete() {
            console.log('toggleComplete');
        }

        const renderer = TestUtils.createRenderer();

        renderer.render(
            <Todo todo={todo}
                  toggleComplete={toggleComplete} />);

        const output = renderer.getRenderOutput();

        expect(output.type).toBe('li');

        const children = output.props.children;
        const [input, span] = children;

        expect(input.type).toBe('input');
        expect(span.type).toBe('span');

        const todoName = span.props.children;

        expect(todoName).toBe(todo.name);

    });
});
