<template>
  <div>
    <div class="player-preview">
      <b-card id="playerCard" tag="article">
        <div class="row">
          <img
            v-bind:src="profilePicURL"
            @click="movetoPersonalPage"
            class="center mb-3 mr-3"
          />
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
        <b-card-title
          ><u @click="movetoPersonalPage">{{ fullName }}</u>
        </b-card-title>
        <b-card-text>
          <b>Team: </b>
          <a @click="moveToTeamPage(activeTeam)" style="cursor: pointer"
            ><u style="text-decoration: none">{{ activeTeam }}</u>
          </a>
          <br />
          <!-- <b @click="moveToTeamPage(activeTeam)">Team:</b> {{ activeTeam }} -->
          <!-- <br /> -->
          <b>Position:</b> {{ position }}
          <br />
        </b-card-text>
        <!-- <b-button v-on:click="movetoPersonalPage" href="" variant="primary"
          >Personal Page</b-button 
         > -->
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerPreview",
  data() {
    return {
      favorite: false,
      favorite_loaded: false,
    };
  },
  components: {
    // BIconBatteryFull,
  },
  props: {
    fullName: {
      type: String,
      required: true,
    },
    activeTeam: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    profilePicURL: {
      type: String,
      required: true,
    },
  },
  methods: {
    movetoPersonalPage() {
      this.$router.push({ name: "playerpage", params: { playerId: this.id } });
    },
    async favoriteHandler() {
      if (this.favorite) {
        //remove from db
        const response = await this.axios.delete(
          this.$root.store.server_domain +
            this.$root.store.server_port +
            "/users/removePlayer/" +
            this.id
        );
        this.favorite = false;
        console.log(this.id + " player removed from favorites");
      } else {
        // add to favorite
        const response = await this.axios.post(
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
    async moveToTeamPage(teamName) {
      console.log(teamName);
      let res = await this.axios.get(
        this.$root.store.server_domain +
          this.$root.store.server_port +
          "/teams/" +
          teamName +
          "/id"
      );
    },
  },
  created() {
    this.isPlayerFavorite(this.id);
  },
};
</script>

<style>
#playerCard {
  text-align: center;
}
.player-preview {
  display: inline-block;
  /* min-width: 300px; */
  width: 280px;
  height: 300px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
}

.player-preview .player-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(0, 0, 0);
}

.player-preview .player-content {
  width: 100%;
  overflow: hidden;
}
.card-body {
  height: 288px;
}
.card-body {
  align-items: center;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>