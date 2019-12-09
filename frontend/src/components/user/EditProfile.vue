<template>
  <v-row v-if="user">
    <v-col cols="12" sm="6">
      <v-container fluid>
        <v-layout column>
          <div class="spacer"></div>
          <v-card>
            <v-card-text class="justify-center">
              <v-avatar
                v-if="hasAvatar"
                size="300"
                color="red"
                class="avatar_moved"
              >
                <img :src="avatar_src" alt="Avatar" />
              </v-avatar>
              <v-avatar
                v-if="!hasAvatar"
                size="300"
                color="red"
                class="avatar_moved"
              >
                <span class="white--text headline">
                  {{ user.username.charAt(0) }}
                </span>
              </v-avatar>
              <div class="spacer"></div>
            </v-card-text>
            <v-card-text class="justify-center text-center">
              <v-flex text-xs-center align-center>
                <v-dialog v-model="dialog" persistent max-width="420">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on" class="mx-auto"
                      >Change avatar</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title class="headline">Upload avatar</v-card-title>
                    <v-card-text>
                      <vue-avatar
                        :width="400"
                        :height="400"
                        :borderRadius="borderRadius"
                        :rotation="rotation"
                        :scale="scale"
                        ref="vueavatar"
                      ></vue-avatar>
                      <br />
                      <label>
                        Zoom : {{ scale }}x
                        <br />
                        <input
                          type="range"
                          min="1"
                          max="3"
                          step="0.02"
                          v-model="scale"
                        />
                      </label>
                      <br />
                      <label>
                        Rotation : {{ rotation }}°
                        <br />
                        <input
                          type="range"
                          min="0"
                          max="360"
                          step="1"
                          v-model="rotation"
                        />
                      </label>
                      <br />
                      <label>
                        Radius : {{ borderRadius }}px
                        <br />
                        <input
                          type="range"
                          min="0"
                          max="200"
                          step="1"
                          v-model="borderRadius"
                        />
                      </label>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn large color="error" @click="dialog = false"
                        >Cancel</v-btn
                      >
                      <v-btn large color="primary" @click="updateClicked"
                        >Update</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-card-text>

            <v-card-text>
              <v-text-field
                v-model="user.username"
                label="Username"
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                label="Email Address"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click.prevent="save()"
                >Save Changes</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-container>
    </v-col>
    <v-col cols="12" sm="6">
      <ProfileCard v-model="user"></ProfileCard>
      <div class="text-center">
        <UserPill v-model="user"></UserPill>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";

import { API } from "../../utils/api";
import Router from "../../router/index";
import { UserProfileRs, Role } from "../../store/modules/user";
import { User } from "./User";
import users from "../../store/modules/users";
import ProfileCard from "./ProfileCard.vue";
import UserPill from "./UserPill.vue";
import { VueAvatar } from "vue-avatar-editor-improved";

@Component({
  components: {
    ProfileCard,
    VueAvatar,
    UserPill
  }
})
export default class EditProfile extends Vue {
  @Prop({
    type: String
  })
  private user_id!: string | undefined;

  // eslint-disable-next-line
  user: User|null = null;

  dialog: boolean = false;
  rotation: number = 0;
  borderRadius: number = 0;
  scale: number = 1;

  created() {
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

  get hasAvatar() {
    return this.user ? this.user.hasAvatar() : undefined;
  }

  get avatar_src() {
    return this.user ? this.user.getAvatarUrl() : undefined;
  }

  updateClicked() {
    var img = (this.$refs.vueavatar as any).getImageScaled();
    img.toBlob(
      (blob: Blob) => {
        console.log("setting blob");
        if (this.user) this.user.setAvatar(blob);
        if (this.user) this.user = this.user.clone();
        this.dialog = false;
      },
      "image/jpeg",
      0.95
    );
    this.scale = 1;
    this.rotation = 0;
    this.borderRadius = 0;
  }

  async save() {
    let formData = new FormData();
    if (this.user)
      Object.entries(this.user).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
    try {
      const resp = await API.post("users/update", formData);
      if (resp.data) {
        users.refreshProfile(resp.data as UserProfileRs);
        this.user = new User(resp.data as UserProfileRs);
      }
    } catch (error) {
      return null;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar_moved {
  position: absolute;
  top: -150px;
  left: calc(50% - 150px);
}
.spacer {
  height: 150px;
}
</style>
