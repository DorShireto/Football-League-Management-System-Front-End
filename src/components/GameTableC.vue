<template>
  <div>
    <b-table
      striped
      :items="items"
      :fields="fields"
      sort-icon-left
      :busy="isBusy"
      responsive="sm"
    >
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
    },
    fields: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      isBusy: true,
    };
  },
  updated() {
    this.isBusy = false;
  },
};
</script>

