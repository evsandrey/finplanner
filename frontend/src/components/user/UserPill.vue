<template>
  <v-chip outlined v-if="value">
    <v-avatar v-if="!hasAvatar" left color="red">
      {{ value.username.charAt(0) }}
    </v-avatar>
    <v-avatar v-if="hasAvatar" left color="red">
      <img :src="avatar_src" alt="Avatar" />
    </v-avatar>
    {{ value.username }}
  </v-chip>
</template>
<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { UserProfileRs, Role } from "../../store/modules/user";
import { User } from "./User";

@Component
export default class UserPill extends Vue {
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
