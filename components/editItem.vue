<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-form v-model="valid" ref="form">
      <v-card v-if="item" style="padding: 10px;">
        <v-card-actions style="float: left;">
          <v-btn text icon color="red" @click.stop="show = false"
            ><v-icon>mdi-close-circle</v-icon></v-btn
          >
        </v-card-actions>
        <v-overflow-btn
          :items="categoriesList"
          item-text="name"
          item-value="enName"
          target="#dropdown-example"
          :rules="[v => !!v || 'Please select Category name']"
          required
          v-model="item.enCategory"
        ></v-overflow-btn>
        <v-text-field
          label="שם הפריט:"
          hint="לדוגמה, משאף"
          v-model="item.name"
        ></v-text-field>

        <v-text-field
          label="סמכות:"
          hint="לדוגמה, רופא"
          v-model="item.authority"
        ></v-text-field>

        <v-text-field label="שם בפת״ר:" v-model="item.patarName"></v-text-field>

        <v-text-field label="שם בסאפ:" v-model="item.sapName"></v-text-field>

        <v-text-field label="התוויות נגד:" v-model="item.neged"></v-text-field>

        <v-text-field label="מק״ט:" v-model="item.serial"></v-text-field>

        <!-- <v-text-field label="תמונה:" v-model="item.imageUrl"></v-text-field> -->
        <uploadImage @uploaded="saveUrl" />
        <v-card-actions
          v-if="$store.state.user && $store.state.user.role == 'admin'"
          style="float: left;"
        >
          <v-btn v-if="method == 'edit'" color="red" @click.stop=""
            >delete</v-btn
          >
          <v-btn
            color="green"
            @click.stop="saveItem"
            :loading="loading"
            :disabled="!valid"
            >save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import api from "~/api/";
import uploadImage from "~/components/uploadImage";
export default {
  components: {
    uploadImage
  },
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
    },
    categoriesList: {
      type: Array,
      default: () => {
        return [];
      }
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
    },
    sapName: {
      get() {
        return this.item ? this.formatMinus(this.item.sapName) : "";
      },
      set(name) {
        this.item.sapName = name;
      }
    },
    patarName: {
      get() {
        return this.item ? this.formatMinus(this.item.patarName) : "";
      },
      set(name) {
        this.item.patarName = name;
      }
    }
  },
  data() {
    return {
      loading: false,
      valid: true
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        console.log("true :", true);
        this.snackbar = true;
      } else console.log("false :", false);
    },
    formatMinus(name) {
      if (!name) return "";
      return name.replace(
        new RegExp("\-\-", "g"),
        `
`
      );
    },
    saveUrl(url) {
      this.item.imageUrl = url;
    },
    async saveItem() {
      console.log("this.method :", this.method);
      console.log("item :", this.item);
      if (this.method == "new") {
        // console.log("this.item :", this.item);
        await api.items.addItem(this.item);
        this.$emit("input", false);
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
