<template>
  <div>
    <div>
      <b-table striped hover :items="items" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: ["home_team", "away_team", "date", "time", "stadium"],
      items: [
        // {
        //   home_team: "test",
        //   away_team: "test",
        //   date: "test",
        //   time: "test",
        //   stadium: "test",
        // },
      ],
    };
  },
  props: {
    futureMatches: {
      type: Array,
      required: true,
    },
  },
  created() {
    debugger;

    for (let i = 0; i < this.$props.futureMatches.length; i++) {
      let match = this.$props.futureMatches[i];
      alert("GameTable component mounted");
      console.log("In gametable mounted component");
      debugger;

      let { homeTeam, awayTeam, date, time, stadium } = match;
      console.log(match);

      this.items.push({
        home_team: homeTeam,
        away_team: awayTeam,
        date: date,
        time: time,
        stadium: stadium,
      });
      alert(this.items.length);
      alert(this.items[0]);
    }
  },
};
</script>