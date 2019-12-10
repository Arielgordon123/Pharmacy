<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card v-if="item != {}">
      <!--  :img="item.imageUrl" contain -->
      <v-card-actions style="float: left;">
        <v-btn text icon color="red" @click.stop="show = false"
          ><v-icon>mdi-close-circle</v-icon></v-btn
        >
      </v-card-actions>
      <h2>{{ item.name }}</h2>

      <h4 class="item-title">סמכות:</h4>
      {{ item.authority }}
      <br />
      <h4 class="item-title">שם בפת״ר:</h4>
      <p class="pre-formatted">{{ patarName }}</p>

      <h4 class="item-title">שם בסאפ:</h4>
      <p class="pre-formatted">{{ sapName }}</p>
      <h4 class="item-title">התוויות נגד:</h4>
      {{ item.neged }} <br />

      <h4 class="item-title">מק״ט:</h4>
      {{ item.serial }}

      <v-img :src="item.imageUrl" contain max-height="300px"></v-img>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    item: {
      type: Object,
      default: () => {
        return {};
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
    sapName() {
      return this.formatMinus(this.item.sapName)
    },
    patarName() {
        return this.formatMinus(this.item.patarName)
    }
  },
  data() {
    return {};
  },
  methods: {
      formatMinus(name) {
          return name.replace(
        new RegExp("\-\-", "g"),
        `
`
      );
      }
  },
 
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
