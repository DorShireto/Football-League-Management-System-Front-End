<template>
  <div>
    <div class="player-preview">
      <b-card
        id="playerCard"
        :img-src="profilePicURL"
        img-alt="Image"
        tag="article"
        style="max-width: 25rem"
        class=""
      >
        <b-card-title
          ><u @click="movetoPersonalPage">{{ fullName }}</u>
          <span class="ml-3">
            <b-spinner
              v-show="!this.favorite_loaded"
              variant="info"
              type="grow"
            ></b-spinner>
            <b-icon
              v-show="!this.favorite && this.favorite_loaded"
              icon="heart"
              @click="favoriteHandler"
            ></b-icon>
            <b-icon
              v-show="this.favorite && this.favorite_loaded"
              icon="heart-fill"
              variant="danger"
              @click="favoriteHandler"
            ></b-icon>
          </span>
        </b-card-title>
        <b-card-text>
          <b>Team:</b> {{ activeTeam }}
          <br />
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
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    profilePicURL: {
      type: String,
      required: true,
    },
  },
  methods: {
    movetoPersonalPage() {
      this.$router.push("playerpage/" + this.id);
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
            "/users/addplayer",
          {
            playerId: this.id,
          }
        );
        this.favorite = true;
        console.log(this.id + " player added from favorites");
      }
    },
    async isPlayerFavorite() {
      // read data from server and try to find this player name in data returns.
      // update "favorite" attribute
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain +
            this.$root.store.server_port +
            "/users/favoritePlayers/"
        );
        let fav_players = response.data;
        // console.log(fav_players[0]);
        for (let i = 0; i < fav_players.length; i++) {
          const player = fav_players[i];
          if (player.name === this.fullName) {
            this.favorite = true;
          }
        }
        this.favorite_loaded = true;

        // console.log(response);
      } catch (error) {
        this.favorite_loaded = true;
        console.log(error);
      }
    },
  },
  created() {
    this.isPlayerFavorite();
  },
};
</script>

<style>
.player-preview {
  display: inline-block;
  width: 250px;
  height: fit-content;
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
</style>