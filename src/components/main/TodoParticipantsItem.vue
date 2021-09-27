<template>
        <div class="participants__item">
            <img :src="avatarUrl" alt="avatar" class="participants__img">
        </div>
</template>

<script>
    export default {
        props: {
            'avatarUrl': String,
        }   
    }
</script>