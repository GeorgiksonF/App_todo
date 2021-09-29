<template>
    <div class="header">
        <Search/>
        <div class="header-end">
            <div class="notification">
                <img src="~@/assets/svg/notifications.svg" alt="notification" class="notifictaion__icon">
            </div>
            <div class="profile">
                <div class="profile__avatar">
                    <div class="profile__img-wrap">
                        <img src="~@/assets/img/avatar.jpg" alt="avatar" class="profile__img">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Search from './Search'

export default {
    components: {
        Search,
    }
}
</script>

<style lang="scss">
    .header {
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
    }

    .header-end {
        display: flex;
        align-items: center;
    }

    .profile {
        &__avatar {
            @include position-center;
            @include object-circle(32px);
            background: $profile-avatar-border;
            cursor: pointer;
        }
        
        &__img-wrap {
            @include object-circle(26px);
            position: relative;
            overflow: hidden;
        }

        &__img {
            position: absolute;
            object-fit: cover;
            @include object-circle(25px);
            border: 1px solid $white;
            top: 0;
            left: 0;
        }
    }

    .notification {
        margin-right: 30px;
        cursor: pointer;
    }
</style>