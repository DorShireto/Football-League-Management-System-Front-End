<template>
  <div>
    <h1>player personal page</h1>
    <PlayerPreview
      :fullName="previewName"
      :activeTeam="previewActiveTeam"
      :position="previewPosition"
      :profilePicURL="profilePicURL"
    ></PlayerPreview>
    <div>
      Common Name: {{ commonName }}<br />
      Nationality: {{ nationality }}<br />
      Birth Date: {{ dateOfBirth }}<br />
      Birth Country: {{ birthCountry }}<br />
      Height: {{ height }}<br />
      <label v-if="weight">{{ weight }}</label>
    </div>
  </div>
</template>

<script>
import PlayerPreview from "../components/PlayerPreview";
export default {
  name: "PlayerPage",
  components: {
    PlayerPreview,
  },
  data() {
    return {};
  },
  props: {
    previewName: {
      type: String,
      required: true,
    },
    previewActiveTeam: {
      type: String,
      required: true,
    },
    previewPosition: {
      type: Number,
      required: true,
    },
    commonName: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    birthCountry: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
    },
  },
  async mounted() {
    alert(this.$route.params.playerId);
    console.log("player page mounted");
    const response = await this.axios.get(
      this.$root.store.server_domain +
        this.$root.store.server_port +
        "/players/fullDetails/" +
        this.$route.params.playerId
    );
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
  },
};
</script>

<style>
</style>