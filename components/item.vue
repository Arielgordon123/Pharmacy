<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card v-if="item != {}">
      <!--  :img="item.imageUrl" contain -->
        <v-card-actions style="float: left;">
            <v-btn text icon color="red" @click.stop="show = false"><v-icon>mdi-close-circle</v-icon></v-btn>
        </v-card-actions>
      <h2>{{ item.name }}</h2>

      <h4>סמכות:</h4>
      {{ item.authority }}
      <h4>שם בפת״ר:</h4>
      {{ item.patarName }}
      <h4>שם בסאפ:</h4>
      {{ item.sapName }}
      <h4>התוויות נגד:</h4>
      {{ item.neged }}
      <h4>מק״ט:</h4>
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
    }
  },
  data() {
    return {};
  }
};
</script>

<style>

</style>
