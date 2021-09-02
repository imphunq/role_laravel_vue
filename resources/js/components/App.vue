<template>
  <div class="container">
    <div class="user-login">
      <div class="username">
        User: {{ $root.user.name }}
      </div>
      <div class="logout">
        <a href="#" @click.prevent="logout">Logout</a>
      </div>
    </div>
    <div>
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link exact class="nav-link" to="/">Tasks</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/user">Users</router-link>
        </li>
      </ul>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      logout () {
        axios.post('logout').then(response => {
          window.location.href = '/login'
        }).catch (error => {
          if (error.status === 302 || 401) {
            window.location.href = '/login'
          } else {

          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    margin-top: 50px;
    .user-login {
        text-align: right;
    }
    .main-content {
        margin-top: 50px;
    }
  }
</style>
