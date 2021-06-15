<template>
  <div>
    <b-table
      striped
      :items="items"
      :fields="fields"
      sort-icon-left
      responsive="sm"
    >
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
    return {};
  },
};
</script>

