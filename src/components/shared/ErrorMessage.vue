<script setup>
defineProps(['isErrors', 'errors'])
</script>

<template>
    <div class="alert alert-danger" role="alert" v-if="isErrors">
        <strong>¡Oops!</strong><br />
        <ul v-if="typeof errors === 'string' ? true : false">
            <li>{{ errors }}</li>
        </ul>
        <ul v-else-if="typeof errors === 'object' ? true : false">
            <li v-for="value in errors">{{ value[0] }}</li>
        </ul>
    </div>
</template>