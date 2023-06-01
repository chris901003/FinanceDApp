<template>
    <div id="top-style">
        {{ props.loanInInfo.title }}
    </div>
</template>

<script setup lang="ts">

interface loanOutInfoInterface {
    title: String,
    loanOutMoney: Number,
    intersetRate: Number,
    announcedDeadline: String,
    repaymentDeadline: String
}
const props = defineProps<{
    loanInInfo: loanOutInfoInterface
}>()
</script>

<style scoped>
#top-style {
    display: flex;
    flex-direction: column;
}
</style>