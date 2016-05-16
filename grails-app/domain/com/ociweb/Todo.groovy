package com.ociweb

import grails.rest.Resource

@Resource(uri='/api/todo', formats=['json'])
class Todo {

    String name
    Boolean complete = false

    static belongsTo = [list: TodoList]

    static constraints = {
        name nullable: false
        list nullable: false
    }
}
