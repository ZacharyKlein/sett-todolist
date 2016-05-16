import com.ociweb.Todo
import com.ociweb.TodoList
import com.ociweb.User

class BootStrap {

    def init = { servletContext ->

        if(!Todo.list()) {
            log.info "Creating todos..."

            def user = new User(name: 'Beth').save()
            def todoList = new TodoList(name: "Beth's List", user: user).save()

            [[name: "Task 1", todoList: todoList],
             [name: "Task 2", todoList: todoList],
             [name: "Task 3", todoList: todoList]].each { props ->
                def todo = new Todo()
                todo.properties = props
                todo.save(flush: true)
            }

            def user2 = new User(name: 'John').save()
            def todoList2 = new TodoList(name: "John's List", user: user2).save()

            [[name: "Task A", todoList: todoList2],
             [name: "Task B", todoList: todoList2],
             [name: "Task C", todoList: todoList2]].each { props ->
                def todo = new Todo()
                todo.properties = props
                todo.save(flush: true)
            }

            def user3 = new User(name: 'Zak').save()
            def todoList3 = new TodoList(name: "Zak's List", user: user3).save()

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
