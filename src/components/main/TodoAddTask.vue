<template>
    <div class="add-todo">
        <div class="add-todo__blocker" @click="closeAddTodo"></div>
        <div class="add-todo__section">
            <form action="" class="add-todo__form form-todo">
                <div class="form-todo__item form-todo__item--text">
                    <label for="todo-text">Текст задачи</label>
                    <input type="text" id="todo-text" v-model="newTodo.text">
                </div>
                <div class="form-todo__item form-todo__item--status">
                    <select name="priority" id="priority" v-model="newTodo.status">
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div class="form-todo__item form-todo__item--priority">
                    <select name="priority" id="priority" v-model="newTodo.priority">
                        <option value="Minor">Minor</option>
                        <option value="Normal">Normal</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
                <input type="button" value="Создать" class="form-todo__item form-todo__item--create" @click="onCreateTodo">
            </form>
        </div>
    </div>
</template>

<script>
    import { uuidv4 } from '/src/helpers'

    export default {
        data() {
            return {
                newTodo: {
                    id: uuidv4(),
                    isCompleted: false,
                    text: '',
                    status: '',
                    priority: '',
                    comments: {},
                    performer: '1',
                    creator: '2',
                    restInvolved: ['3', '4', '5']
                },
            }
        },
        props: {
            'closeAddTodo': Function,
        },
        methods: {
            onCreateTodo() {
                this.closeAddTodo()
                this.$store.dispatch('createTodo', this.newTodo) 
            }
        }
    }
</script>

<style lang="scss">
    .add-todo {

        &__blocker {
            background: rgba($black, 0.5);
            @include blocker(1);
        }

        &__section {
            position: fixed;
            padding: 20px;
            top: 36%;
            left: 36%;
            background: $white;
            border-radius: 7px;
            box-shadow: 1px 1px 10px rgba($black, 0.4);
            z-index: 15;
        }
    }

    .form-todo {
        display: flex;
        flex-direction: column;
        
        &__item {
            display: flex;
            flex-direction: column;

            &:not(:first-child) {
                margin-top: 20px;
            }

            &--create {
                width: 70px;
            }
        }
    }
</style>