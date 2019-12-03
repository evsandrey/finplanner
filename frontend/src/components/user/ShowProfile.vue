<template>
  <v-container fluid v-if="user">
    <v-layout column>
      <v-card>
        <v-card-text>
          <v-flex class="mb-4">
            <v-avatar :v-if="user.avatar_url" size="96" class="mr-4">
              <img :src="user.avatar_url" alt="Avatar" />
            </v-avatar>
            <v-file-input
              v-model="user.avatar"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              label="Avatar"
            ></v-file-input>
          </v-flex>
          <v-text-field v-model="user.username" label="Username"></v-text-field>
          <v-text-field
            v-model="user.email"
            label="Email Address"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click.prevent="save()">
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
import { UserProfileRs, Role } from "../../store/modules/user";
import { User } from "./User";
import users from "../../store/modules/users";

@Component
export default class ProfileCard extends Vue {
  @Prop({
    type: String
  })
  private user_id!: string | undefined;

  private user!: User;

  async created() {
    if (this.user_id) {
      //    do smth
    } else {
      if (users.profileData) {
        this.user = new User(users.profileData);
      } else {
        // get profile
      }
    }
  }

  async save() {
    let formData = new FormData();
    if (this.user)
      Object.entries(this.user).forEach(([key, value]) =>
        formData.append(key, value)
      );
    try {
      const resp = await API.post("users/update", formData);
      if (resp) users.refreshProfile(resp.data as UserProfileRs);
    } catch (error) {
      return null;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
