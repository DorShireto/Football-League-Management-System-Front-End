<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view id="rv" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },

    async loadData() {
      let allData = await this.axios.get(
        this.$root.store.server_domain + this.$root.store.server_port + "/teams"
      );
      allData = allData.data;
      for (let index = 0; index < allData.length; index++) {
        const team = allData[index];
        let { name, logoURL } = team;
        this.$root.store.allTeams.push({ name: name, logoURL: logoURL });
        //for loop over all players in team, push to this.$root.store.allPlayers
        for (let i = 0; i < team.players.length; i++) {
          let player = team.players[i];
          this.$root.store.allPlayers.push(player);
        }
      }
      let playersArr = this.$root.store.allPlayers;
      let teamsArr = this.$root.store.allTeams;
      // debugger;
    },
  },
  async mounted() {
    await this.loadData();
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#rv {
  background: aqua;
  height: fit-content;
  min-height: 100vh;
}
</style>
