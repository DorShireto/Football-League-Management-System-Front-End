<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand :to="{ name: 'main' }">Superliga Vue</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'main' }">Home</b-nav-item>
        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item :to="{ name: 'search' }">Current Stage</b-nav-item>
        <b-nav-item :to="{ name: 'playerpage' }">Playerpage</b-nav-item>
        <b-nav-item-dropdown text="Favorites" right v-if="$root.store.username">
          <b-dropdown-item href="#">Games</b-dropdown-item>
          <b-dropdown-item href="#">Players</b-dropdown-item>
          <b-dropdown-item href="#">Teams</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item :to="{ name: 'search' }">About</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
        <b-nav-text>Hello Guest!</b-nav-text>
        <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
        <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item-dropdown right>
          <template #button-content> {{ $root.store.username }} </template>
          <!-- <b-dropdown-item href="#">Favorites</b-dropdown-item> -->
          <b-dropdown-item href="#" @click="$root.store.logout()"
            >Log Out</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
</style>