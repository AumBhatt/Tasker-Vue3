const test_list = [
    { id: 0, todoContent: "Task 1", todoStatus: false },
    { id: 1, todoContent: "Task 2", todoStatus: true },
    { id: 2, todoContent: "Task 3", todoStatus: false }
];



const todoApp = Vue.createApp({
    data() {
        return {
            todoList: (
                ( storedList = localStorage.getItem('tasker-app-data') ) ? JSON.parse(storedList).tasks : new Array()
            ),
            todoID: -1,
            newTodoText: ""
        }
    },
    methods: {
        addNewTodo() {
            if(this.newTodoText) {
                this.todoList.push(
                    { id: this.todoList.length, todoContent: this.newTodoText, todoStatus: false }
                );
                this.newTodoText = "";
                updateList(this.todoList);
            }
        },
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
                    @click="toggleTodoStatus"
                >
                    {{ todo.todoStatus?'check_box':'check_box_outline_blank' }}
                </span>
                <span class="todo-content">{{ todo.todoContent }}</span>
                <span class="material-icons delete-todo-btn" :todoID="todo.id" @click="deleteTodo">clear</span>
            </div>
        `,
    methods: {
        deleteTodo() {
            // console.log(`Removing: ${this.todo.todoContent}`);
            this.$parent.todoList = this.$parent.todoList.filter(el => {
                if(el.id !== this.todo.id)
                    return el;
            });
            updateList(this.$parent.todoList);
        },
        toggleTodoStatus() {
            this.todo.todoStatus = !this.todo.todoStatus;
            updateList(this.$parent.todoList)
        }
    }
});

todoApp.component('app-footer', {
    template:
        `
            <footer>
                AumBhatt&copy; 2021
            </footer>
        `
});

todoApp.mount('#todo-app');

function updateList(list) {
    localStorage.setItem('tasker-app-data', JSON.stringify({tasks: list}));
    // console.log(localStorage.getItem('tasker-app-data'));
}