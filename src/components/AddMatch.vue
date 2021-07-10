<template>
  <div class="container">
    <h1 class="title">Add Match To League</h1>
    <b-form @submit.prevent="onAddMatch" @reset.prevent="onReset">
      <b-form-group
        id="input-group-leaguename"
        label-cols-sm="3"
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
        label-cols-sm="3"
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
        label-cols-sm="3"
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

      <!-- HometeamName -->
      <b-form-group
        id="input-group-homeTeam"
        label-cols-sm="3"
        label="Home Team:"
        label-for="homeTeam"
      >
        <b-form-select
          id="homeTeam"
          v-model="$v.form.homeTeam.$model"
          :options="teams"
          :state="validateState('homeTeam')"
          @change="handleHomeTeamSelection"
        ></b-form-select>
        <b-form-invalid-feedback>
          Home Team Name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- AwayteamName -->
      <b-form-group
        id="input-group-awayTeam"
        label-cols-sm="3"
        label="Away Team:"
        label-for="awayTeam"
      >
        <b-form-select
          id="awayTeam"
          v-model="$v.form.awayTeam.$model"
          :options="teams"
          :state="validateState('awayTeam')"
          @change="handleAwayTeamSelection"
        ></b-form-select>
        <b-form-invalid-feedback>
          Away Team Name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- stadium -->
      <b-form-group
        id="input-group-stadium"
        label-cols-sm="3"
        label="Stadium: "
        label-for="stadium"
      >
        <b-form-input
          id="stadium"
          v-model="$v.form.stadium.$model"
          :state="validateState('stadium')"
        ></b-form-input>
        <b-form-invalid-feedback> stadium is required </b-form-invalid-feedback>
      </b-form-group>
      <!-- refereeName -->
      <b-form-group
        id="input-group-refereeName"
        label-cols-sm="3"
        label="Referee Name:"
        label-for="refereeName"
      >
        <b-form-select
          id="refereeName"
          v-model="$v.form.refereeName.$model"
          :options="mainReferees"
          :state="validateState('refereeName')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Main Referee Name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- lineReferee1 -->
      <b-form-group
        id="input-group-lineReferee1"
        label-cols-sm="3"
        label="Line Referee 1 Name:"
        label-for="lineReferee1"
      >
        <b-form-select
          id="lineReferee1"
          v-model="$v.form.lineReferee1.$model"
          :options="lineReferees"
          :state="validateState('lineReferee1')"
          @change="handleReferee1Selection"
        ></b-form-select>
        <b-form-invalid-feedback>
          Line Referee 1 Name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- lineReferee2 -->
      <b-form-group
        id="input-group-lineReferee2"
        label-cols-sm="3"
        label="Line Referee 2 Name:"
        label-for="lineReferee2"
      >
        <b-form-select
          id="lineReferee2"
          v-model="$v.form.lineReferee2.$model"
          :options="lineReferees"
          :state="validateState('lineReferee2')"
          @change="handleReferee2Selection"
        ></b-form-select>
        <b-form-invalid-feedback>
          Line Referee 2 Name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- time -->
      <b-form-group
        id="input-group-time"
        label-cols-sm="3"
        label="Match Time:"
        label-for="time"
      >
        <div>
          <b-form-timepicker v-model="time" locale="en"></b-form-timepicker>
        </div>
      </b-form-group>

      <!-- date -->
      <b-form-group
        id="input-group-date"
        label-cols-sm="3"
        label="Match Date:"
        label-for="date"
      >
        <div>
          <b-form-datepicker
            id="date"
            v-model="date"
            class="mb-2"
          ></b-form-datepicker>
        </div>
      </b-form-group>
      <b-button type="submit" variant="success " class="mr-5 w-10"
        >Add Match!</b-button
      >
      <b-button type="reset" variant="danger">Reset</b-button>
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
import { required } from "vuelidate/lib/validators";

export default {
  name: "addMatch",
  data() {
    return {
      teams: [],
      mainReferees: [],
      lineReferees: [],
      disabledRef1Name: "",
      disabledRef2Name: "",
      disabledTeam1Name: "",
      disabledTeam2Name: "",
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
      },
      lineReferee1: {
        required,
      },
      lineReferee2: {
        required,
      },
    },
  },
  async mounted() {
    console.log("addMatch mounted");
    //update teams
    const teamsNames = await this.axios.get(
      this.$root.store.server_domain +
        this.$root.store.server_port +
        "/teams/names"
    );
    // console.log(teamsNames);
    teamsNames.data.forEach((team) => {
      this.teams.push({
        text: team.teamName,
        value: team.teamName,
        disabled: false,
      });
    });
    const mainReferees = await this.axios.get(
      this.$root.store.server_domain +
        this.$root.store.server_port +
        "/league/mainReferees"
    );
    this.mainReferees = mainReferees.data;

    const lineReferees = await this.axios.get(
      this.$root.store.server_domain +
        this.$root.store.server_port +
        "/league/lineReferees"
    );
    lineReferees.data.forEach((lineRef) => {
      const refereeObj = {
        text: lineRef,
        value: lineRef,
        disabled: false,
      };
      this.lineReferees.push(refereeObj);
    });
  },
  methods: {
    validate_teams() {
      if (this.form.awayTeam != this.form.homeTeam) {
        return true;
      }
      alert("Please choose different team names");
      return false;
    },
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
    handleHomeTeamSelection(e) {
      //enable last disabled option from referee1 list:
      let alreadyDisabledTeam1 = this.teams.find(
        (team) => team.value == this.disabledTeam1Name
      );
      if (alreadyDisabledTeam1) {
        alreadyDisabledTeam1.disabled = false;
      }

      const teamName = e;
      //get already disabled option if exist one and enable it

      let option = this.teams.find((team) => team.value == teamName);
      option.disabled = true;
      this.disabledTeam1Name = teamName;
    },
    handleAwayTeamSelection(e) {
      //enable last disabled option from referee1 list:
      let alreadyDisabledTeam2 = this.teams.find(
        (team) => team.value == this.disabledTeam2Name
      );
      if (alreadyDisabledTeam2) {
        alreadyDisabledTeam2.disabled = false;
      }

      const teamName = e;
      //get already disabled option if exist one and enable it

      let option = this.teams.find((team) => team.value == teamName);
      option.disabled = true;
      this.disabledTeam2Name = teamName;
    },
    handleReferee1Selection(e) {
      //enable last disabled option from referee1 list:
      let alreadyDisabledRef1 = this.lineReferees.find(
        (ref) => ref.value == this.disabledRef1Name
      );
      if (alreadyDisabledRef1) {
        alreadyDisabledRef1.disabled = false;
      }

      const refereeName = e;
      //get already disabled option if exist one and enable it

      let option = this.lineReferees.find((ref) => ref.value == refereeName);
      option.disabled = true;
      this.disabledRef1Name = refereeName;
    },

    handleReferee2Selection(e) {
      //enable last disabled option from referee1 list:
      let alreadyDisabledRef2 = this.lineReferees.find(
        (ref) => ref.value == this.disabledRef2Name
      );
      if (alreadyDisabledRef2) {
        alreadyDisabledRef2.disabled = false;
      }

      const refereeName = e;
      //get already disabled option if exist one and enable it

      let option = this.lineReferees.find((ref) => ref.value == refereeName);
      option.disabled = true;
      this.disabledRef2Name = refereeName;
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
            time: this.time,
            date: this.date,
          }
        );
        console.log("add match success here is the response:");
        console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
      }
    },
    async onAddMatch() {
      console.log("add match method called");
      if (!this.validate_teams()) return;
      if (!this.validate_time()) return;
      if (!this.validate_date()) return;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      await this.AddMatch();

      this.$router.go(); //refresh page
      //   this.$router.push({ name: "leaguemanagement" });
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