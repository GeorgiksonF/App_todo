<template>
    <div class="modal">
        <div class="modal__blocker" @click.self="closeAddTodo">
            <div class="modal__section">
                <form action="" class="form" @submit="checkForm" method="post">
                    <div v-if="errors.length" class="errors">
                        <ul class="errors__list">
                            <li 
                                v-for="(error, key) in errors" 
                                :key="key"
                                class="errors__item"
                            >
                                {{ error }}
                            </li>
                        </ul>
                    </div>
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
    import { mapActions } from 'vuex'
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
                    participants: {
                        performer: '',
                        creator: '',
                        restInvolved: []
                    }
                },
                errors: []
            }
        },
        props: {
            'closeAddTodo': Function,
        },
        methods: {
            onCreateTodo() {
                if (this.checkForm()) {
                    this.closeAddTodo()
                    this.newTodo.id = uuidv4()
                    this.newTodo.participants = {
                        performer: '2',
                        creator: '1',
                        restInvolved: ['3', '4']
                    }
                    this.createTodo(this.newTodo) 
                }
            },
            checkForm() {
                this.errors = [];

                if (this.newTodo.text.trim() === '') {
                    this.errors.push('Please input some text')
                }

                if (!this.newTodo.status || !this.newTodo.priority) {
                    this.errors.push('Please fill status/priority')
                }

                if (this.errors.length) {
                    return false
                }
                
                return true
            },
            ...mapActions(['createTodo'])
        }
    }
</script>