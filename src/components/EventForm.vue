<template>
  <div id="newEvent">
    <h1 class="title">New Event</h1>
    <b-form @submit.prevent="onAdd">
      <!-- min in match -->
      <b-form-group
        id="input-group-minInMatch"
        label-cols-sm="3"
        label="Minute In Match:"
        label-for="minInMatch"
      >
        <b-form-input
          id="minInMatch"
          v-model="$v.form.minInMatch.$model"
          type="text"
          :state="validateState('minInMatch')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Minute In Match is required
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- description -->
      <b-form-group
        id="input-group-description"
        label-cols-sm="3"
        label="Description:"
        label-for="description"
      >
        <b-form-input
          id="description"
          v-model="$v.form.description.$model"
          type="text"
          :state="validateState('description')"
        ></b-form-input>
        <b-form-invalid-feedback>
          description is required
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- teamName -->
      <b-form-group
        id="input-group-teamName"
        label-cols-sm="3"
        label="Team Name:"
        label-for="teamName"
      >
        <b-form-input
          id="teamName"
          v-model="$v.form.teamName.$model"
          type="text"
          :state="validateState('teamName')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Team Name is required
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- type -->
      <b-form-group
        id="input-group-type"
        label-cols-sm="3"
        label="Type:"
        label-for="type"
      >
        <b-form-input
          id="type"
          v-model="$v.form.type.$model"
          type="text"
          :state="validateState('type')"
        ></b-form-input>
        <b-form-invalid-feedback> Type is required </b-form-invalid-feedback>
      </b-form-group>
      <!-- playerName -->
      <b-form-group
        id="input-group-playerName"
        label-cols-sm="3"
        label="Player Name:"
        label-for="playerName"
      >
        <b-form-input
          id="playerName"
          v-model="$v.form.playerName.$model"
          type="text"
          :state="validateState('playerName')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Player Name is required
        </b-form-invalid-feedback>
      </b-form-group>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Add failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "NewEventForm",
  data() {
    return {
      form: {
        minInMatch: "",
        description: "",
        teamName: "",
        type: "",
        playerName: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    form: {
      minInMatch: {
        required,
      },
      description: {
        required,
      },
      teamName: {
        required,
      },
      type: {
        required,
      },
      playerName: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },

    onAdd() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
    },
  },
};
</script>

<style>
</style>