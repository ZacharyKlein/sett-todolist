package com.ociweb

import grails.rest.Resource

@Resource(uri='/api/todoList', formats=['json'])
class TodoList {

    String name

    static hasMany = [ todos: Todo ]
    static belongsTo = [ user: User ]

    static constraints = {
        name nullable: false
        todos nullable: true
    }
}
