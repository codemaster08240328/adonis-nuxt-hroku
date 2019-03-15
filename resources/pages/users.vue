<template>
  <div>
    USERS
    {{ users }}
  </div>
</template>

<script>
export default {
  asyncData({ $axios }) {
    return $axios.get(`/api/v1/users`).then(res => {
      return { users: res }
    })
  }
}
</script>
