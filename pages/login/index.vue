<template>
  <div class="login-page">
    <h3 class="login-page__title">
      DMS
    </h3>
    <a-form-model>
      <app-input
        v-model="form.account"
        vid="name"
        rules="required"
        name="User"
        placeholder="Name"
        size="large"
      >
        <a-icon slot="prefix" type="user" />
      </app-input>
      <app-input-password
        v-model="form.password"
        vid="password"
        rules="required"
        name="Password"
        placeholder="Password"
        size="large"
        @keydown.enter="handleLogin"
      >
        <a-icon slot="prefix" type="lock" />
      </app-input-password>
      <a-form-model-item>
        <a-button :loading="loading" type="primary" block @click="handleLogin">
          Log-in
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
  export default {
    layout: 'public',
    auth: false,
    data() {
      return {
        loading: false,
        form: {
          account: null,
          password: null
        }
      }
    },
    methods: {
      async handleLogin() {
        try {
          await this.$auth.loginWith('local', {data: this.form})
          this.$notification.success({message: 'Success', class: 'toast-success'})
          this.$router.push('/user')
        } catch (error) {
          this.$notification.error({message: error, class: 'toast-error'})
        }
      }
    }
  }
</script>

<style scoped>

</style>
