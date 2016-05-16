import com.ociweb.Todo
import com.ociweb.TodoList

class BootStrap {

    def init = { servletContext ->

        if(!Todo.list()) {
            log.info "Creating todos..."

            def todoList = new TodoList(name: "Beth's List").save()

            [[name: "Task 1", todoList: todoList],
             [name: "Task 2", todoList: todoList],
             [name: "Task 3", todoList: todoList]].each { props ->
                def todo = new Todo()
                todo.properties = props
                todo.save(flush: true)
            }

            def todoList2 = new TodoList(name: "John's List").save()

            [[name: "Task A", todoList: todoList2],
             [name: "Task B", todoList: todoList2],
             [name: "Task C", todoList: todoList2]].each { props ->
                def todo = new Todo()
                todo.properties = props
                todo.save(flush: true)
            }

            def todoList3 = new TodoList(name: "Zak's List").save()

            [[name: "Task I", todoList: todoList3],
             [name: "Task II", todoList: todoList3],
             [name: "Task III", todoList: todoList3]].each { props ->
                def todo = new Todo()
                todo.properties = props
                todo.save(flush: true)
            }

        }
    }
    def destroy = {
    }
}
