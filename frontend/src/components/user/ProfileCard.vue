<template>
  <v-container fluid>
        <v-layout column>
            <v-card>
                <v-card-text>
                    <v-flex class="mb-4">
                        <v-avatar size="96" class="mr-4">
                            <img :src="'/avatars/avatar_' + (form.avatar.toLowerCase()) + '.png'" alt="Avatar">
                        </v-avatar>
                        <v-btn @click="openAvatarPicker">Change Avatar</v-btn>
                    </v-flex>
                    <v-text-field
                        v-model="form.firstName"
                        label="FirstName"></v-text-field>
                    <v-text-field
                        v-model="form.lastName"
                        label="Last Name"></v-text-field>
                    <v-text-field
                        v-model="user.email"
                        label="Email Address"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" :loading="loading" @click.native="update">
                        <v-icon left dark>check</v-icon>
                        Save Changes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { API } from "../../utils/api";
import Router from "../../router/index";
import { UserProfileRs,Role } from '../../store/modules/user';
import {User} from './User'

@Component
export default class ProfileCard extends Vue {
  @Prop({ 
      type: User, 
      default: {
          id: "",
          email:"",
          username:"",
          role:"user"
      } 
  })
  private user!: User;
  
  
//   async created(){
//       const resp = await API.get(`posts/${this.post_id}`)
//       this.post = resp.data as Post;
//   }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
