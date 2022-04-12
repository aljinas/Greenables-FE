<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="success" dark flat>
            <v-toolbar-title>Entreprise Logo</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                label="Username"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                v-model="form.username"
                :rules="nameRules"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="form.password"
                :rules="nameRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="login" color="success">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WebService from '@/service/WebService'
export default {
  name: 'Login',
  data: () => ({
    valid: true,
    form: {
      username: '',
      password: ''
    },
    requiredRule: [
      v => !!v || 'Name is required'
    ],
  }),
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        WebService.postCall('login', this.form).then((response) => {
          if (response.data.status == 400) {
            this.errorMsg = response.data.message
            this.form = {}
          } else {
            localStorage.setItem('accessToken', response.data.token)
            // this.$emit('authenticated', true)
            localStorage.setItem('loggedIn', true)
            localStorage.setItem('user_type_id', response.data.user_type_id)
            // WebService.setToken()
            this.$router.push('/employee')
          }
        })
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  },
  // beforeRouteEnter (to, from, next) {
  //   localStorage.setItem('loggedIn') === 'false' 
  //   next('/')
  // }
}
</script>
