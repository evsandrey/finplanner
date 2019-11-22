<template>
  <v-container fluid>
        <v-layout column>
            <v-card>
                <v-card-text>
                    <v-flex class="mb-4">
                        <v-avatar size="96" class="mr-4">
                            <img :src="'/avatars/avatar_.png'" alt="Avatar">
                        </v-avatar>
                        <!-- <v-btn @click="openAvatarPicker">Change Avatar</v-btn> -->
                    </v-flex>
                    <v-text-field
                        v-model="user.username"
                        label="Username"></v-text-field>
                    <v-text-field
                        v-model="user.email"
                        label="Email Address"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" >
                        Save Changes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
        <!-- <avatar-picker
            v-model="showAvatarPicker"
            :current-avatar="form.avatar"
            @selected="selectAvatar"></avatar-picker> -->
    </v-container>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { API } from "../../utils/api";
import Router from "../../router/index";
import { UserProfileRs,Role } from '../../store/modules/user';
import { User } from './User'
import users from '../../store/modules/users'

@Component
export default class ProfileCard extends Vue {
  @Prop({ 
      type: String, 
      default: "0"
  })
  private user_id!: string | undefined;
  
  private user: User = new User(users.profileData);
  
  async mounted(){
       if (this.user_id) {
        //    do smth
       } else {
           if (users.profileData) this.user = new User(users.profileData); 
       }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
