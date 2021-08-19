const todoApp = Vue.createApp({
    data() {
        return {
            todoList: [
                { id: 0, todoContent: "Task 1", todoStatus: false },
                { id: 1, todoContent: "Task 2", todoStatus: true },
                { id: 2, todoContent: "Task 3", todoStatus: false }
            ],
            todoID: -1,
            newTodoText: ""
        }
    },
    methods: {
        addNewTodo() {
            this.todoList.push(
                { id: this.todoList.length -1, todoContent: this.newTodoText, todoStatus: false}
            );
            this.newTodoText = "";
        },
        deleteTodo() {
            this.todoList = this.todoList.filter(el => {
                if(el.id !== this.todoID)
                    return el;
            });
        }
    }
});

todoApp.component('todo-component', {
    props: ['todo'],
    template:
        `
            <div
                :class="[ todo.todoStatus ? 'todoDone' : '' , 'singleTodo']"
            >
                <span
                    class="material-icons"
                    @click="todo.todoStatus = !todo.todoStatus;"
                >
                    {{ todo.todoStatus?'check_box':'check_box_outline_blank' }}
                </span>
                <span class="todo-content">{{ todo.todoContent }}</span>
                <span class="material-icons delete-todo-btn" :todoID="todo.id" @click="deleteTodo">clear</span>
            </div>
        `,
    methods: {
        deleteTodo() {
            this.$emit('click');
        }
    }
});

todoApp.mount('#todo-app');