package com.ociweb

import grails.rest.Resource

@Resource(uri='/todoList', formats=['json'])
class TodoList {

    String name

    static hasMany = [ todos: Todo ]
    static belongsTo = [ user: User ]
    static mapWith="mongo"

    static constraints = {
        name nullable: false
        todos nullable: true
    }

    static mapping = {
        todos fetch: 'join'
    }
}
