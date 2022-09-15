<template>
  <main>
    <span>Error {{ error.statusCode}}: {{ this.error.message }}</span>
  </main>
</template>

<script>
export default {
  name: "Error",
  props: ["error"]
}
</script>