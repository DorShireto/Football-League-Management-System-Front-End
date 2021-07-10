<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username alpha
        </b-form-invalid-feedback> </b-form-group
      ><!-- username -->

      <b-form-group
        id="input-group-firstName"
        label-cols-sm="3"
        label="First Name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="$v.form.firstName.$model"
          :state="validateState('firstName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.firstName.alpha">
          First Name should contain letters only!
        </b-form-invalid-feedback> </b-form-group
      ><!-- first name -->

      <b-form-group
        id="input-group-lastName"
        label-cols-sm="3"
        label="Last Name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          :state="validateState('lastName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.lastName.alpha">
          Lirst Name should contain letters only!
        </b-form-invalid-feedback> </b-form-group
      ><!-- last name -->

      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback> </b-form-group
      ><!-- country -->

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback> </b-form-group
      ><!-- password -->

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback> </b-form-group
      ><!-- confirmed password -->

      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email">
          invalid Email!
        </b-form-invalid-feedback> </b-form-group
      ><!-- email -->

      <!-- <b-form-group
        id="input-group-profilePic"
        label-cols-sm="3"
        label="Profile Picture URL:"
        label-for="profilePic"
      >
        <b-form-input
          id="profilePic"
          v-model="$v.form.profilePic.$model"
        ></b-form-input></b-form-group
      >profile picture -->

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width: 250px"
        class="ml-5 w-75"
        >Register</b-button
      >
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        // profilePic: "",
        submitError: undefined,
      },
      countries: [{ value: null, text: "", disabled: true }],
      // roles: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha,
      },
      country: {
        required,
      },
      firstName: {
        required,
        alpha,
      },
      lastName: {
        required,
        alpha,
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
      email: {
        required,
        email,
      },
      // role: {
      //   required,
      // },
    },
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // this.roles.push("Fan", "Association Member", "Manager", "Player", "Coach");
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      // alert(this.$store.state.server_domain);

      try {
        // if (this.form.role == "Association Member")
        //   this.form.role = "asso_member";
        const response = await this.axios.post(
          // $root.store.server_domain + $root.store.server_port + "/Register",
          this.$root.store.server_domain +
            this.$root.store.server_port +
            "/Register",
          {
            username: this.form.username,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            country: this.form.country,
            password: this.form.password,
            email: this.form.email,
            profilePic: "",
            // profilePic: this.form.profilePic,
            role: "fan",
          }
        );
        this.$router.push({ name: "login" });

        // this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
      }
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        profilePic: "",
        // role: null,
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>
<style>
/* <style lang="scss" scoped>
.container {
  max-width: 500px;
} */
</style>
