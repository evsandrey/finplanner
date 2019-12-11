<template>
  <v-container fluid>
    <div class="spacer"></div>
    <v-card class="user-card mx-auto" :elevation="8">
      <div class="spacer"></div>
      <v-avatar v-if="hasAvatar" size="150" class="avatar_moved" :elevation="8">
        <img :src="avatar_src" alt="Avatar" />
      </v-avatar>
      <v-avatar
        v-if="!hasAvatar"
        size="150"
        class="avatar_moved"
        color="red"
        :elevation="8"
      >
        <span class="white--text headline">
          {{ value.username.charAt(0) }}
        </span>
      </v-avatar>
      <v-card-title class="justify-center">{{ value.username }}</v-card-title>
      <v-card-text>{{ value.email }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { UserProfileRs, Role } from "../../store/modules/user";
import { User } from "./User";

@Component
export default class ProfileCard extends Vue {
  @Prop({
    type: User
  })
  private value!: User;

  get avatar_src() {
    return this.value.getAvatarUrl();
  }

  get hasAvatar() {
    return this.value.hasAvatar();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-card {
  width: 320px;
}
.spacer {
  height: 75px;
}
.avatar_moved {
  position: absolute;
  top: -75px;
  left: calc(50% - 75px);
}
</style>
