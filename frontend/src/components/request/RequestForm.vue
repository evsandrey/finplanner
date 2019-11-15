<template>
  <v-row align="center">
    <v-col cols="12" sm="1"> </v-col>

    <v-col cols="12" sm="5">
      <v-card outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Message to sellers:</div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-chip
            v-for="(item, i) in suppliersList"
            :key="i"
            close
            @click:close="removeSupplier(item)"
            >{{ item }}</v-chip
          >
        </v-list-item>

        <v-card-text>
          <p>
            Hello, my name is <b>{{ username }}</b>
          </p>
          <p>
            I am searching for <b>{{ target }}</b>
          </p>
          <p>
            Maximum price is <b>{{ maxPrice }}</b>
          </p>
          <p>{{ description }}</p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="5">
      <v-form ref="form">
        <v-text-field
          v-model="target"
          label="What do you want to buy?"
          required
        ></v-text-field>
        <v-text-field
          v-model="maxPrice"
          label="What max price are you ready to pay?"
          required
        ></v-text-field>
        <v-textarea
          v-model="description"
          outlined
          label="Additional message to seller"
        ></v-textarea>
        <v-textarea
          v-model="suppliersInput"
          outlined
          v-on:keyup.enter="parseMails"
          label="Suppliers list(insert emails here)"
        ></v-textarea>
        <v-btn block>
          send
        </v-btn>
      </v-form>
      <v-list dense>
        <v-subheader>Suppliers</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in suppliersList" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>

    <v-col cols="12" sm="1"> </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import users from "../../store/modules/users";

@Component
export default class RequestForm extends Vue {
  target: string = "";
  maxPrice: string = "";
  description: string = "";
  suppliersInput: string = "";
  suppliersList: string[] = [];

  get username() {
    return users.username;
  }

  parseMails() {
    console.log("parsing mails");
    let mails = this.extractEmails(this.suppliersInput);
    if (mails != null) {
      console.log(`parsed ${mails.length} mails`);
      mails.forEach(mail => {
        if (!this.suppliersList.includes(mail)) {
          this.suppliersList.push(mail);
          console.log(mail, " added", this.suppliersList);
        }
      });
    } else {
      // todo: alert about emails
    }
  }
  extractEmails(text: string) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  }
  removeSupplier(item: string) {
    this.suppliersList = this.suppliersList.filter(e => e !== item);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
