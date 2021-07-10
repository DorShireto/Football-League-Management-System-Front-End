<template>
  <div id="newEvent">
    <b-form @submit.prevent="onSubmit">
      <!-- homeScore -->
      <b-form-group
        id="input-group-homeScore"
        label-cols-sm="3"
        label="Home Team Score:"
        label-for="homeScore"
      >
        <b-form-input
          id="homeScore"
          v-model="$v.form.homeScore.$model"
          type="text"
          :state="validateState('homeScore')"
        ></b-form-input>

        <b-form-invalid-feedback v-if="!$v.form.homeScore.required">
          Home Score is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.homeScore.numeric">
          score should contain only numbers
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- awayScore -->
      <b-form-group
        id="input-group-awayScore"
        label-cols-sm="3"
        label="Away Team Score:"
        label-for="awayScore"
      >
        <b-form-input
          id="awayScore"
          v-model="$v.form.awayScore.$model"
          type="text"
          :state="validateState('awayScore')"
        ></b-form-input>

        <b-form-invalid-feedback v-if="!$v.form.awayScore.required">
          Away Score is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.awayScore.numeric">
          score should contain only numbers
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit">Submit</b-button>
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
import { required, numeric } from "vuelidate/lib/validators";
export default {
  name: "EventForm",
  data() {
    return {
      teamNames: [],
      form: {
        homeScore: null,
        awayScore: null,
        submitError: undefined,
      },
    };
  },

  validations: {
    form: {
      homeScore: {
        required,
        numeric,
      },
      awayScore: {
        required,
        numeric,
      },
    },
  },
  mounted() {
    console.log("edit score form mounted");
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },

    onSubmit() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.$emit("closeEditScoreModalEvent", {
        homeScore: this.form.homeScore,
        awayScore: this.form.awayScore,
      });
    },
  },
};
</script>

<style>
</style>