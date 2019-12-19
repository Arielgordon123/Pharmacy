<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-form v-model="valid" ref="form">
      <v-card v-if="item" style="padding: 10px;">
        <v-card-actions style="float: left;">
          <v-btn text icon color="red" @click.stop="show = false"
            ><v-icon>mdi-close-circle</v-icon></v-btn
          >
        </v-card-actions>
        <div style="display: grid;">
          <v-text-field
            :rules="requiredRule"
            label="שם קטגוריה:"
            v-model="item.name"
          ></v-text-field>
          <v-text-field
            :rules="requiredRule"
            label="שם באנגלית:"
            v-model="item.enName"
          ></v-text-field>
          <!-- <v-text-field label="תמונה:" v-model="item.imageUrl"></v-text-field> -->

          <v-card-actions
            v-if="$store.state.user && $store.state.user.role == 'admin'"
          >
            <v-btn v-if="method == 'edit'" color="red" @click.stop=""
              >delete</v-btn
            >
            <v-btn
              color="green"
              style="float: left;"
              @click.stop="saveItem"
              :loading="loading"
              :disabled="!valid"
              >save</v-btn
            >
          </v-card-actions>
        </div>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import api from "~/api/";

export default {
  components: {},
  props: {
    value: Boolean,
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
    method: {
      type: String,
      default: "edit"
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  data() {
    return {
      loading: false,
      valid: true,
      requiredRule: [v => !!v || "שדה חובה"],
      name: "",
      enName: ""
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        console.log("true :", true);
        this.snackbar = true;
      } else console.log("false :", false);
    },
    async saveItem() {
      console.log("this.method :", this.method);
      console.log("item :", this.item);
      if (this.method == "new") {
        // console.log("this.item :", this.item);
        api.cats.addCategory(this.item).then(
            res => {
                this.$store.commit('addCategory', res.data.item);
                this.$emit("input", false);
            }
        );
        
      } else if (this.method == "edit") {
        await api.items.editItem(this.item);
        this.$emit("input", false);
      }
    }
  }
};
</script>

<style scoped>
.item-title {
  display: inline;
}
.pre-formatted {
  white-space: pre-wrap; /* 👈 this is the important part */
  margin: 0;
}
</style>
