package com.ociweb

import grails.rest.Resource

@Resource(uri='/api/users', readOnly=true, formats=['json'])
class User {

    String name

    static hasMany = [ todoLists: TodoList]
    static mapWith="mongo"

    static constraints = {
        name nullable: false
        todoLists nullable: true
    }
}
