<template>
    <div class="participants">
        <div 
            class="participants__item"
            v-for="user in getUsers.slice(0, 4)"
            :key="user.key"
        >
            <img :src="user.avatarUrl" alt="avatar" class="participants__img">
        </div>
        <div class="participants__item" v-if="getUsers.length > 4">
            <div class="participants__over">+{{getUsers.length - 4}}</div>
        </div>
    </div>
</template>

<script>
    import { uuidv4 } from '/src/helpers'
    import { mapGetters } from 'vuex'
    
    export default {
        props: {
            participants: Object
        },
        computed: {
            getUsers() {
                let participants = [
                    this.participants.performer,
                    this.participants.creator,
                    ...this.participants.restInvolved
                ]
                
                return participants
                        .filter((userId, index) => participants.indexOf(userId) === index)
                        .map(userId => ({
                                ...this.getCertainUser(userId),
                                key: uuidv4()
                            }))
            },
            ...mapGetters(['getCertainUser'])    
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