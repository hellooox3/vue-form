<template>
     <div class="bg-red-700 text-white p-2 w-full my-2" v-if="errorMsg">{{ errorMsg }}</div>
</template>

<script setup>
defineProps({
    errorMsg: String,
})
</script>