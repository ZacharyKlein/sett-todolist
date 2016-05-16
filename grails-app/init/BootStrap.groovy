import com.ociweb.Todo
import com.ociweb.TodoList
import com.ociweb.User

class BootStrap {

    def init = { servletContext ->

        if(!Todo.list()) {
            log.info "Creating todos..."

            def user = new User(name: 'Bob').save()
            def list = new TodoList(name: "Bob's List", user: user).save()

            [[name: "Task 1", list: list],
             [name: "Task 2", list: list],
             [name: "Task 3", list: list]].each { props ->
                def todo = new Todo()
                todo.properties = props
                todo.save(flush: true)
            }

        }
    }
    def destroy = {
    }
}
