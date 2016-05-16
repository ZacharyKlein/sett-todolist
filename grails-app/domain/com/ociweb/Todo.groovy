package com.ociweb

import grails.rest.Resource

@Resource(uri='/api/todos', formats=['json'])
class Todo {

    String name
    Boolean complete = false

    static belongsTo = [todoList: TodoList]
    static mapWith="mongo"

    static constraints = {
        name nullable: false
        todoList nullable: false
    }
}
