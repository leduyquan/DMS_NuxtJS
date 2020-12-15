<template>
  <a-config-provider :locale="enUS">
    <div class="wrap">
      <div class="wrap-content">
        <div class="auth-page">
          <div class="logo">
            <img src="/assets/images/logo/logo-red-black.svg" alt="">
          </div>
          <nuxt />
        </div>
      </div>
    </div>
  </a-config-provider>
</template>
<script>
  import enUS from 'ant-design-vue/lib/locale-provider/en_US'
  export default {
    data() {
      return {
        enUS
      }
    }
  }
</script>
