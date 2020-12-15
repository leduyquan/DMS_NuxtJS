<template>
  <div class="page-side">
    <h1 class="page-title">
      Create new role
    </h1>
    <div class="page-content">
      <div class="page-information">
        <validation-observer v-slot="{ }">
          <div class="role-form">
            <div class="role-field">
              <div class="role-field__title">
                Role name
              </div>
              <div class="role-field__input">
                <app-input v-model="modal.name" name="Role name" rules="required" />
              </div>
            </div>
            <div class="role-field">
              <div class="role-field__title">
                Description
              </div>
              <div class="role-field__input">
                <app-text-area v-model="modal.description" name="Description" />
              </div>
            </div>
            <div class="role-field">
              <div class="role-field__title">
                Status
              </div>
              <div class="role-field__input">
                <a-radio-group v-model="modal.is_active">
                  <a-radio v-for="(op,idx) in isActive" :key="idx" :value="!!op.value">
                    {{ op.label }}
                  </a-radio>
                </a-radio-group>
              </div>
            </div>
          </div>
          <div class="role-permission">
            <div class="role-permission__title">
              Permission list
            </div>
            <Permission ref="refPermission" />
          </div>
          <div class="role-action">
            <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
              Update
            </a-button>
            <a-button key="back" @click="visible = false">
              Cancel
            </a-button>
          </div>
        </validation-observer>
      </div>
    </div>
  </div>
</template>
<script>
  import Permission from '@/components/pages/role/Permission'
  import {isActive} from '@/constants/common'
  import {each, concat} from 'lodash'
  export default {
    components: {
      Permission
    },
    data() {
      return {
        visible: false,
        loading: false,
        isActive,
        id: this.$route.params.id,
        modal: {
          name: '',
          description: '',
          is_active: true
        }
      }
    },
    methods: {
      async handleOk() {
        try {
          this.loading = true
          const checkedList = this.$refs.refPermission.checkedList
          let checkedData = []
          each(checkedList, function(value) {
            checkedData = concat(checkedData, value)
          })
          console.log('checkedData', checkedData)
          await this.$axios.$put(`account/usersdd/${this.modal.id}`, this.modal)
          this.$notification.success({message: 'Success', class: 'toast-success'})
        } catch (error) {
          this.$notification.error({message: 'Action unsuccessfully. Please try again!', class: 'toast-error'})
        } finally {
          this.loading = false
          this.visible = false
        }
      }
    }
  }
</script>
