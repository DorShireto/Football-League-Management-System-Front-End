<template>
  <div>
    <b-table
      striped
      :items="items"
      :fields="fields"
      sticky-header
      sort-icon-left
      :busy="isBusy"
      responsive="sm"
      selectable
      :select-mode="selectMode"
      @row-selected="onRowSelected"
    >
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <p>{{ this.selected_data }}</p>
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
      selectMode: "single",
      selected_data: null, //not necesery its for debug option
    };
  },
  methods: {
    onRowSelected(item) {
      this.selected_data = item[0]; //not necesery its for debug option
      this.$emit("rowClicked", item[0]);
    },
  },
  updated() {
    this.isBusy = false;
  },
};
</script>

