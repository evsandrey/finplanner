<template>
  <div class="template">
    <h3>Users</h3>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" :user="user">
          <th>{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { UserProfile } from '../../store/modules/user';
import { API } from '../../utils/api';

@Component
export default class UsersList extends Vue {
  
  users: UserProfile[] = []

  async created(){
     const resp = await API.get("/admin/users")
     this.users = resp.data as UserProfile[]
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>