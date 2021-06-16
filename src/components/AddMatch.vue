<template>
  <div class="container">
    <h1 class="title">Add Match To League</h1>
    <b-form @submit.prevent="onAddMatch" @reset.prevent="onReset">
      <b-form-group
        id="input-group-leaguename"
        label-cols-sm="2"
        label="League Name:"
        label-for="leagueName"
      >
        <b-form-input
          id="leagueName"
          v-model="$v.form.leagueName.$model"
          type="text"
          :state="validateState('leagueName')"
          disabled
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.leagueName.required">
          League Name is required
        </b-form-invalid-feedback> </b-form-group
      ><!-- leaguename -->

      <b-form-group
        id="input-group-seasonName"
        label-cols-sm="2"
        label="Season Name:"
        label-for="seasonName"
      >
        <b-form-input
          id="seasonName"
          v-model="$v.form.seasonName.$model"
          :state="validateState('seasonName')"
          disabled
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.seasonName.required">
          season name is required
        </b-form-invalid-feedback> </b-form-group
      ><!-- season name -->

      <b-form-group
        id="input-group-stageName"
        label-cols-sm="2"
        label="Stage Name:"
        label-for="stageName"
      >
        <b-form-input
          id="stageName"
          v-model="$v.form.stageName.$model"
          :state="validateState('stageName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.stageName.required">
          Stage name is required
        </b-form-invalid-feedback> </b-form-group
      ><!-- stage name -->

      <b-form-group
        id="input-group-homeTeam"
        label-cols-sm="2"
        label="Home Team:"
        label-for="homeTeam"
      >
        <b-form-input
          id="homeTeam"
          v-model="$v.form.homeTeam.$model"
          :state="validateState('homeTeam')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Home Team is required
        </b-form-invalid-feedback> </b-form-group
      ><!-- homeTeam -->

      <b-form-group
        id="input-group-awayTeam"
        label-cols-sm="2"
        label="Away Team:"
        label-for="awayTeam"
      >
        <b-form-input
          id="awayTeam"
          v-model="$v.form.awayTeam.$model"
          :state="validateState('awayTeam')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Away Team is required
        </b-form-invalid-feedback> </b-form-group
      ><!-- awayTeam -->

      <b-form-group
        id="input-group-stadium"
        label-cols-sm="2"
        label="Stadium:"
        label-for="stadium"
      >
        <b-form-input
          id="stadium"
          v-model="$v.form.stadium.$model"
          :state="validateState('stadium')"
        ></b-form-input>
        <b-form-invalid-feedback>
          stadium is required
        </b-form-invalid-feedback> </b-form-group
      ><!-- stadium -->

      <b-form-group
        id="input-group-refereeName"
        label-cols-sm="2"
        label="Referee Name:"
        label-for="refereeName"
      >
        <b-form-input
          id="refereeName"
          v-model="$v.form.refereeName.$model"
          :state="validateState('refereeName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.refereeName.required">
          Referee Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.refereeName.alpha">
          Referee Name should contain only letters!
        </b-form-invalid-feedback> </b-form-group
      ><!-- refereeName -->

      <b-form-group
        id="input-group-lineReferee1"
        label-cols-sm="2"
        label="Line Referee 1 Name:"
        label-for="lineReferee1"
      >
        <b-form-input
          id="lineReferee1"
          v-model="$v.form.lineReferee1.$model"
          :state="validateState('lineReferee1')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lineReferee1.required">
          Referee Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.lineReferee1.alpha">
          Referee Name should contain only letters!
        </b-form-invalid-feedback> </b-form-group
      ><!-- lineReferee1 -->

      <b-form-group
        id="input-group-lineReferee2"
        label-cols-sm="2"
        label="Line Referee 2 Name:"
        label-for="lineReferee2"
      >
        <b-form-input
          id="lineReferee2"
          v-model="$v.form.lineReferee2.$model"
          :state="validateState('lineReferee2')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lineReferee2.required">
          Referee Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.lineReferee2.alpha">
          Referee Name should contain only letters!
        </b-form-invalid-feedback> </b-form-group
      ><!-- lineReferee2 -->

      <b-form-group
        id="input-group-time"
        label-cols-sm="2"
        label="Match Time:"
        label-for="time"
      >
        <div>
          <b-form-timepicker v-model="time" locale="en"></b-form-timepicker>
          <div class="mt-2">Value: '{{ time }}'</div>
        </div> </b-form-group
      ><!-- time NEED 2 way BINDING!@!!#!@$!@^%@$#&#$-->

      <b-form-group
        id="input-group-date"
        label-cols-sm="2"
        label="Match Date:"
        label-for="date"
      >
        <div>
          <b-form-datepicker
            id="date"
            v-model="date"
            class="mb-2"
          ></b-form-datepicker>
          <p>Value: '{{ date }}'</p>
        </div>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button type="submit" variant="primary" class="ml-5 w-10"
        >Add Match!</b-button
      >
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Adding Match failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required, alpha } from "vuelidate/lib/validators";

export default {
  name: "addMatch",
  data() {
    return {
      form: {
        leagueName: "SuperLiga",
        seasonName: "2020/2021",
        stageName: "",
        homeTeam: "",
        awayTeam: "",
        refereeName: "",
        lineReferee1: "",
        lineReferee2: "",
        stadium: "",
        // time: "",
        // date: "",
        submitError: undefined,
      },
      time: "",
      date: "",
      context: null,
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      leagueName: {
        required,
      },
      homeTeam: {
        required,
      },
      seasonName: {
        required,
      },
      stageName: {
        required,
      },
      awayTeam: {
        required,
      },
      stadium: {
        required,
      },
      refereeName: {
        required,
        alpha,
      },
      lineReferee1: {
        required,
        alpha,
      },
      lineReferee2: {
        required,
        alpha,
      },
    },
  },

  methods: {
    validate_time() {
      if (this.time != "") {
        return true;
      }
      alert("Match Time must be chosen");
      return false;
    },
    validate_date() {
      if (this.date != "") {
        //check that date is future
        const dateToCheck = new Date(this.date);
        if (dateToCheck < new Date()) {
          alert("Please pick future date. Date can not be past.");
          return false;
        }
        return true;
      } else alert("Match Date must be chosen");
      return false;
    },
    onContext(ctx) {
      //time picker
      this.context = ctx;
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async AddMatch() {
      //send match details to BE
      try {
        const response = await this.axios.post(
          // $root.store.server_domain + $root.store.server_port + "/Register",
          this.$root.store.server_domain +
            this.$root.store.server_port +
            "/league/addmatch",
          {
            leagueName: this.form.leagueName,
            seasonName: this.form.seasonName,
            stageName: this.form.stageName,
            homeTeam: this.form.homeTeam,
            awayTeam: this.form.awayTeam,
            refereeName: this.form.refereeName,
            lineReferee1: this.form.lineReferee1,
            lineReferee2: this.form.lineReferee2,
            stadium: this.form.stadium,
            time: this.form.time,
            date: this.form.date,
          }
        );
        console.log("add match success here is the response:");
        console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
      }
    },
    onAddMatch() {
      console.log("add match method called");
      if (!this.validate_time()) return;
      if (!this.validate_date()) return;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.AddMatch();
    },
    onReset() {
      console.log("reset button pressed");
      this.form = {
        leagueName: "SuperLiga",
        seasonName: "2020/2021",
        stageName: "",
        homeTeam: "",
        awayTeam: "",
        RefereeName: "",
        lineReferee1: "",
        lineReferee2: "",
        stadium: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>

<style>
</style>