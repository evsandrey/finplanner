<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Email" 
                  name="email"
                  v-model="email"
                  prepend-icon="fas fa-user"
                  type="text"
                />

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  v-model="password"
                  prepend-icon="fas fa-lock"
                  type="password"
                  v-on:keyup.enter="login"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn large block color="primary" @click.prevent="login"
                >Login</v-btn
              >
            </v-card-actions>
            <v-card-actions class="justify-center">
              <v-btn to="/register" text>Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import user from "../../store/modules/users";
import Router from "../../router/index";

@Component
export default class Login extends Vue {
  email: string = "";
  password: string = "";

  login() {
    user
      .login({
        email: this.email,
        password: this.password
      })
      .then(() => {
        Router.push("/");
      })
      .catch(e => {
        console.error(e); 
      });
  }
}
</script>
<style scoped>
.holder {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
