<template>
  <div id="mainPage">
    <div class="container">
      <h1 class="title">Main Page</h1>
      <!-- <PlayerPreview
        fullName="James Forrest"
        activeTeam="celtic"
        position="3"
        id="172104"
        profilePicURL="https://cdn.sportmonks.com/images/soccer/players/8/172104.png"
      ></PlayerPreview> -->
      <div class="row">
        <div class="col"><LeagueInfo></LeagueInfo></div>
        <div class="col-6">
          <LoginPage
            class="float-right"
            v-if="!$root.store.username"
          ></LoginPage>
          <FavoriteGames v-else></FavoriteGames>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
import PlayerPreview from "../components/PlayerPreview";
export default {
  components: {
    LeagueInfo,
    LoginPage,
    FavoriteGames,
    // PlayerPreview,
  },
};
</script>


<style>
#mainPage {
  /* background-image: url(""); */
  background-repeat: no-repeat;
  /* background-size: auto; */
  background-size: cover;
  height: 100vh;
}

/* <style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 *
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
} */
</style>
