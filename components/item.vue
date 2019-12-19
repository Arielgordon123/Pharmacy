<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card v-if="item">
      <!-- v-if="item != {}" -->
      <!--  :img="item.imageUrl" contain -->
      <v-card-actions style="float: left;">
         <v-btn v-if="$store.state.user && $store.state.user.role == 'admin'" text icon color="orange" @click.stop="editDoc(item)"
          ><v-icon>mdi-content-save-edit-outline</v-icon></v-btn
        >
        <v-btn text icon color="red" @click.stop="show = false"
          ><v-icon>mdi-close-circle</v-icon></v-btn
        >
      </v-card-actions>
      <h2>{{ item.name }}</h2>

      <h4 v-if="item.authority" class="item-title">סמכות:</h4>
      {{ item.authority ? item.authority : "" }}
      <br />
      <h4 v-if="patarName" class="item-title">שם בפת״ר:</h4>
      <p class="pre-formatted">{{ patarName }}</p>

      <h4 v-if="sapName" class="item-title">שם בסאפ:</h4>
      <p class="pre-formatted">{{ sapName }}</p>
      <h4 v-if="item.neged" class="item-title">התוויות נגד:</h4>
      {{ item.neged ? item.neged : "" }} <br />

      <h4 class="item-title">מק״ט:</h4>
      {{ item.serial }}

      <v-img :src="item.imageUrl" contain max-height="300px"></v-img>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "~/api/";
export default {
  props: {
    value: Boolean,
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
     
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$store.commit('set_searchDialog', value)
        // this.$emit("input", value);
      }
    },
    sapName() {
      return this.item ? this.formatMinus(this.item.sapName) : "";
    },
    patarName() {
      return this.item ? this.formatMinus(this.item.patarName) : "";
    }
  },
  data() {
    return {};
  },
  methods: {
    formatMinus(name) {
      if (!name) return "";
      return name.replace(
        new RegExp("\-\-", "g"),
        `
`
      );
    },
    editDoc(item){
      this.$emit("edit", item);
      // console.log('item :', item);
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
