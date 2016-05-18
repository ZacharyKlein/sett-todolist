package com.ociweb

import grails.rest.Resource

@Resource(uri='/api/todoList', formats=['json'])
class TodoList {

    String name

    static hasMany = [ todos: Todo ]
    static mapWith="mongo"

    static constraints = {
        todos nullable: true
    }

    static mapping = {
        todos fetch: 'join'
    }
}
