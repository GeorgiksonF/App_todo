<template>
    <div class="comment">
        <div class="comment__avatar">
            <div class="comment__img-wrap">
                <img 
                    :src="getUserInfo.avatarUrl"
                    alt="avatar" 
                    class="comment__img"
                />
            </div>
        </div>
        <div class="comment__content">
            <div class="comment__info">
                <h1 class="comment__full-name">{{getFullName}}</h1>
                <span class="comment__date-time">{{getDateTime}}</span>
            </div>
            <p class="comment__text">{{text}}</p>
            <div class="comment__message" v-if="message">
                <p>{{message}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import dayjs from 'dayjs'
    import duration from 'dayjs/plugin/duration'
    dayjs.extend(duration)

    export default {
        props: {
            id: String,
            taskId: String,
            userId: String,
            text: String,
            time: String,
            message: String   
        },
        computed: {
            getUserInfo() {
                return this.getCertainUser(this.userId)
            },
            getFullName() {
                let user = this.getUserInfo
                return `${user.firstName} ${user.secondName} ${user.lastName}`
            },
            getDateTime() {
                let duration = dayjs.duration(dayjs().diff(this.time))

                if (duration.days() > 1) {
                    return `${duration.days()} days ago`
                } else if (duration.days() === 1) {
                    return `Yesterday`
                } else if (duration.hours() >= 1) {
                    return `${duration.hours()} hours ago`
                } else if (duration.minutes() >= 1) {
                    return `${duration.minutes()} minutes ago`
                } 

                return `Just Now`
            },
            ...mapGetters(['getCertainUser'])
        }
    }
</script>

<style lang="scss">
    .comment {
        display: flex;
        font-size: 10px;

        &:not(:last-child) {
            margin-bottom: 34px;
        }

        &__avatar {
            display: flex;
            flex: 1;
            margin-right: 25px;
        }

        &__img-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            @include object-circle(38px);
            background: $avatar-bg;
        }

        &__img {
            @include object-circle(33px);
            border: 1px solid $white;
        }

        &__content {
            flex: 7;
        }

        &__info {
            display: flex;
            align-items: center;
        }

        &__full-name {
            margin-right: 7px;
            font-family: 'Montserrat', sans-serif;
            color: $comment-name;
            font-size: 12px;
            font-weight: 500;
        }

        &__date-time {
            color: $comment-datetime;
            &::before {
                content: "-";
                margin-right: 3px;
                color: $comment-datetime;
            }
        }

        &__text {
            font-weight: 500;
            line-height: 15px;
            color: $comment-text;
            margin-top: 5px;
        }

        &__message {
            margin-top: 20px;
            padding: 15px 14px;
            background: $comment-message-bg;
            border-radius: 10px;
            font-size: 12px;
            line-height: 20px;
            color: $comment-text;
        }
    }
</style>