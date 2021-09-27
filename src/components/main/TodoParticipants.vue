<template>
    <div class="participants">
        <TodoParticipantsItem 
            v-for="user in getUsers.slice(0, 4)"
            :key="user.key"
            :avatarUrl="user.avatarUrl"
        />
        <div class="participants__item" v-if="getUsers.length > 4">
            <div class="participants__over">+{{getUsers.length - 4}}</div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { uuidv4 } from '/src/helpers'
    import TodoParticipantsItem from './TodoParticipantsItem'

    export default {
        props: {
            'participants': Object
        },
        computed: {
            getUsers() {
                return [
                    this.participants.performer,
                    this.participants.creator,
                    ...this.participants.restInvolved
                ].map(user => {
                    return {
                        ...this.getCertainUser(user),
                        key: uuidv4()
                    }
                })
            },
            ...mapGetters(['getCertainUser'])        
        },
        components: {
            TodoParticipantsItem
        }
    }
</script>

<style lang="scss">
    .participants {
        display: flex;
        flex: 1;

        &__item {
            margin-right: -8px;
        }

        &__img {
            @include object-circle(22px);
        }

        &__over {
            @include position-center;
            @include object-circle(22px);
            background: $green;
            font-size: 9px;
            color: $grey;
            font-weight: 500;
        }
    }
</style>