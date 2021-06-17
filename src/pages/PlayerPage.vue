<template>
  <div class="container text-center">
    <div id="loadingDiv" v-show="loading">
      <span><b>Loading...</b></span>
      <b-spinner></b-spinner>
    </div>
    <div v-show="!loading">
      <h1>{{ previewName }} Personal Page</h1>
      <img v-bind:src="profilePicURL" style="width: 300px" />
      <div>
        <br />
        Active Team: {{ previewActiveTeam }}<br />
        Position: {{ previewPosition }}<br />
        Common Name: {{ commonName }}<br />
        Nationality: {{ nationality }}<br />
        Birth Date: {{ birthdate }}<br />
        Birth Country: {{ birthCountry }}<br />
        Height: {{ height }}<br />
        <label v-if="weight">{{ weight }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerPage",
  components: {},
  data() {
    return {
      loading: "true",
      previewName: "",
      previewActiveTeam: "",
      previewPosition: 0,
      commonName: "",
      nationality: "",
      birthdate: "",
      birthCountry: "",
      height: "",
      weight: "",
      profilePicURL: "",
    };
  },

  async mounted() {
    // alert(this.$route.params.playerId);
    console.log("player page mounted");
    console.log(
      "sending req" +
        this.$root.store.server_domain +
        this.$root.store.server_port +
        "/players/fullDetails/" +
        this.$route.params.playerId
    );

    const response = await this.axios.get(
      this.$root.store.server_domain +
        this.$root.store.server_port +
        "/players/fullDetails/" +
        this.$route.params.playerId
    );
    console.log("sent req");

    console.log(response);
    this.profilePicURL = response.data.playerPreview.image;
    this.commonName = response.data.common_name;
    this.height = response.data.height;
    this.weight = response.data.weight;
    this.nationality = response.data.nationality;
    this.birthdate = response.data.birthdate;
    this.birthCountry = response.data.birthcountry;
    this.previewName = response.data.playerPreview.name;
    this.previewActiveTeam = response.data.playerPreview.activeTeam;
    this.previewPosition = response.data.playerPreview.position;
    this.loading = false;
  },
};
</script>

<style>
</style>