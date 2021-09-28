<template>
    <div class="modal">
        <div class="modal__blocker" @click.self="closeAddTodo">
            <div class="modal__section">
                <form action="" class="form">
                    <div class="form__item">
                        <label class="form__label" for="todo-text">Todo text</label>
                        <input class="form__input" type="text" id="todo-text" v-model="newTodo.text">
                    </div>
                    <div class="form__item">
                        <label class="form__label" for="status">Status</label>
                        <select class="form__select form__select--status" name="status" id="status" v-model="newTodo.status">
                            <option class="form__option" value="Pending">Pending</option>
                            <option class="form__option" value="In Progress">In Progress</option>
                            <option class="form__option" value="Completed">Completed</option>
                            <option class="form__option" value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div class="form__item">
                        <label class="form__label" for="priority">Priority</label>
                        <select class="form__select form__select--priority" name="priority" id="priority" v-model="newTodo.priority">
                            <option class="form__option" value="Minor">Minor</option>
                            <option class="form__option" value="Normal">Normal</option>
                            <option class="form__option" value="Critical">Critical</option>
                        </select>
                    </div>
                    <input type="button" value="Create" class="form__btn" @click="onCreateTodo">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { uuidv4 } from '/src/helpers'

    export default {
        data() {
            return {
                newTodo: {
                    id: null,
                    isCompleted: false,
                    text: '',
                    status: '',
                    priority: '',
                    comments: {},
                    performer: '',
                    creator: '',
                    restInvolved: ['']
                },
            }
        },
        props: {
            'closeAddTodo': Function,
        },
        methods: {
            onCreateTodo() {
                this.closeAddTodo()
                this.newTodo.id = uuidv4()
                this.newTodo.performer = '2'
                this.newTodo.creator = '1'
                this.newTodo.restInvolved = ['3', '4', '5']
                this.$store.dispatch('createTodo', this.newTodo) 
            }
        }
    }
</script>