<template>
    <div class="comment">
        {{getUserInfo}}
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: {
            'id': String,
            'taskId': String,
            'userId': String,
            'text': String,
            'time': String
        },
        computed: {
            getUserInfo() {
                return this.getCertainUser(this.userId)
            },
            ...mapGetters(['getCertainUser'])
        }
    }
</script>