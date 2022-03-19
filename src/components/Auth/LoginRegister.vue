<template>

  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
       <q-banner class="bg-gray-3">
        <template>
          <q-icon name="account_circle" color="primary"/>
        </template>
        {{tab | titleCase }} to access your Todos anywhere!
      </q-banner>
    </div>

    <div class="row q-mb-md">
      <q-input
        v-model="formData.email"
        outlined
         :rules="[val => isValidEmailAddress(val) || 'Please enter a valid email address.']"
        lazy-rules
        ref="email"
        class="col"
        label="Email"
        stack-label
      />
    </div>
     <div class="row q-mb-md">
      <q-input
        v-model="formData.password"
        :rules="[val => val.length >= 6 || 'Please enter at least 6 characters']"
        lazy-rules
        type="password"
        ref="password"
        outlined
        class="col"
        label="Password"
        stack-label
      />
    </div>
    <div class="row">
      <q-space/>
      <q-btn
        color="primary"
        :label="tab"
        type="submit"
      />
    </div>
  </form>


</template>

<script>

import { mapActions} from 'vuex'

export default {
  props: ['tab'],
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    isValidEmailAddress(email) {
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		    return re.test(String(email).toLowerCase())
		},
    submitForm() {
      if(!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if(this.tab == 'login') {
          this.loginUser(this.formData)
        }
        else {
          this.registerUser(this.formData)
        }
      }
    }
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>
