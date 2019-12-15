<template>
  <div class="all-send">
    <v-form @submit.prevent="onUpload" ref="form">
      <v-file-input name="img" @change="onFileSelected" loading="isLoading">
      </v-file-input>
      <v-btn :loading="isLoading" type="submit">העלה תמונה</v-btn>
    </v-form>
    <img :src="urlImgUploaded" alt="" v-if="urlImgUploaded" />
     <div v-if="alert">
       <v-alert
      prominent
      type="error"
    >
      <v-row align="center">
        <v-col class="grow">לא נבחרה תמונה</v-col>
       
      </v-row>
    </v-alert>
  </div>
  </div>
 
</template>

<script>
export default {
  name: "uploadImgToCloudinary",
  data() {
    return {
      file: "",
      urlImgUploaded: "",
      isLoading: false,
      alert: false,
    };
  },
  methods: {
    onFileSelected(file) {
      this.file = file;
    },
    async onUpload() {
      if (this.file) {
        this.isLoading = true;
        let url = "https://api.cloudinary.com/v1_1/dmdap86ol/image/upload/";
        let formData = new FormData();
        formData.append("upload_preset", "yfpx4yzf");
        formData.append("tags", "browser_upload");
        formData.append("folder", "Pharmacy");
        formData.append("file", this.file);
        const response = await fetch(url, {
          method: "POST",
          body: formData
        });
        const json = await response.json();
        this.urlImgUploaded = json.secure_url;
        this.isLoading = false;
        this.$emit('uploaded', this.urlImgUploaded)
      } else {
        this.alert =true
        // alert("בחר תמונה");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
