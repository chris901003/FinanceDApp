<template>
    <Transition name="notification">
        <div class="notification" v-show="props.isShow">
            <div style="display: flex;">
                <img src="../../assets/xmark.png" alt="XMark" style="height: 10rem; width: 10rem; margin-right:3rem">
                <p>{{ props.message }}</p>
            </div>
            <p style="font-size: 7rem; text-align: end; color: #919398">區塊鏈交易失敗</p>
            <p class="notification-bottom"></p>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    isShow: { type: Boolean, required: true },
    message: { type: String, required: true}
})
</script>

<style scoped>
.notification {
    position: absolute;
    right: 5rem;
    top: 30rem;
    width: 90rem;
    padding: 3rem 4rem;
    background-color: #ffffff;
    border-radius: 2rem;
    box-shadow: 0px 0px 5rem 0.2px rgb(0, 0, 0, 0.3);
    overflow: hidden;
}
.notification p {
    font-size: 8rem;
}
.notification-bottom {
    width: 25rem;
    height: 1rem;
    background-color: red;
    border-radius: 1rem;
    animation: notification-bottom-animation 1.5s linear alternate infinite;
}
@keyframes notification-bottom-animation {
    from {
        transform: translateX(-150%);
    }
    to {
        transform: translateX(500%);
    }
}
.notification-enter-active,
.notification-leave-active {
    transition: all 0.5s;
}
.notification-enter-from,
.notification-leave-to {
    transform: translateX(150%);
}
.notification-enter-to,
.notification-leave-from {
    transform: translateX(0%);
}
</style>