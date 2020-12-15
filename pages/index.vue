<template>
  <div />
</template>

<script>
  export default {
    middleware({redirect}) {
      return redirect({name: 'user'})
    }
  }
</script>

<style>

</style>
