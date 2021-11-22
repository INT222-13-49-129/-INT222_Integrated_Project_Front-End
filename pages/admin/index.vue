<template>
    <div>
        admin
    </div>
</template>
<script>
export default {
    layout: "admin",
    middleware: ["auth","admin"],
}
</script>