<template>
  <div class="container text-center">
    <div id="loadingDiv" v-show="loading">
      <span><b>Loading...</b></span>
      <b-spinner></b-spinner>
    </div>
    <div v-show="!loading">
      <h1>
        <b>{{ previewName }}</b>
      </h1>
      <div class="d-flex justify-content-center align-items-center">
        <h2 class="mr-3">Personal Page</h2>
        <span class="mr-3">
          <b-spinner
            v-show="!this.favorite_loaded"
            variant="info"
            type="grow"
            font-scale="2"
          ></b-spinner>
          <b-icon
            v-show="!this.favorite && this.favorite_loaded"
            icon="heart"
            font-scale="2"
            @click="favoriteHandler"
          ></b-icon>
          <b-icon
            v-show="this.favorite && this.favorite_loaded"
            icon="heart-fill"
            variant="danger"
            font-scale="2"
            @click="favoriteHandler"
          ></b-icon>
        </span>
      </div>
      <img v-bind:src="profilePicURL" style="width: 300px" />
      <div>
        <br />
        Active Team:
        <a @click="moveToTeamPage(previewActiveTeam)" style="cursor: pointer"
          ><u style="text-decoration: none">{{ previewActiveTeam }}</u>
        </a>
        <br />
        Position: {{ previewPosition }}<br />
        Common Name: {{ commonName }}<br />
        Nationality: {{ nationality }}<br />
        Birth Date: {{ birthdate }}<br />
        Birth Country: {{ birthCountry }}<br />
        Height: {{ height }}<br />
        <label v-if="weight">Weight: {{ weight }}</label>
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
      favorite: false,
      favorite_loaded: false,
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
      id: "",
    };
  },
  methods: {
    async moveToTeamPage(teamName) {
      console.log(teamName);
      let res = await this.axios.get(
        this.$root.store.server_domain +
          this.$root.store.server_port +
          "/teams/" +
          teamName +
          "/id"
      );
      let currentRoute = this.$route.name;
      this.$router.push({
        name: "teampage",
        params: { teamId: res.data.teamId },
      });
      if (currentRoute == "teampage") this.$router.go(); //refresh page
    },

    //favorite handle
    async favoriteHandler() {
      if (this.favorite) {
        //remove from db
        const response = this.axios.delete(
          this.$root.store.server_domain +
            this.$root.store.server_port +
            "/users/removePlayer/" +
            this.id
        );
        this.favorite = false;
        console.log(this.id + " player removed from favorites");
      } else {
        // add to favorite
        const response = this.axios.post(
          this.$root.store.server_domain +
            this.$root.store.server_port +
            "/users/addPlayer",
          {
            playerId: this.id,
          }
        );
        this.favorite = true;
        console.log(this.id + " player added to favorites");
      }
    },
    async isPlayerFavorite(playerId) {
      // read data from server and try to find this player name in data returns.
      // update "favorite" attribute
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain +
            this.$root.store.server_port +
            "/users/checkIfPlayerFavorite/" +
            playerId
        );
        console.log("response from /users/checkIfPlayerFavorite/");
        console.log(response);
        // let status = response.status;
        if (response.data == true) {
          //player fav
          this.favorite = true;
        }
        this.favorite_loaded = true;
      } catch (error) {
        this.favorite_loaded = true;
        console.log(error);
      }
    },
  },

  async mounted() {
    // alert(this.$route.params.playerId);
    this.id = this.$route.params.playerId;
    console.log("player page mounted");
    this.isPlayerFavorite(this.id);
    // console.log(
    //   "sending req" +
    //     this.$root.store.server_domain +
    //     this.$root.store.server_port +
    //     "/players/fullDetails/" +
    //     this.id
    // );

    const response = await this.axios.get(
      this.$root.store.server_domain +
        this.$root.store.server_port +
        "/players/fullDetails/" +
        this.id
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