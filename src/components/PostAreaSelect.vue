<!--  -->
<template>
  <b-list-group>
    <b-list-group-item>区域:</b-list-group-item>
    <b-list-group-item
      variant="success"
      @click="choose(0)"
      :class="{ active: 0 == currentIndex }"
    >
      闲聊区</b-list-group-item
    >
    <b-list-group-item
      variant="danger"
      @click="choose(1)"
      :class="{ active: 1 == currentIndex }"
    >
      考研区</b-list-group-item
    >
    <b-list-group-item
      variant="warning"
      @click="choose(2)"
      :class="{ active: 2 == currentIndex }"
    >
      新生区</b-list-group-item
    >
    <b-list-group-item
      variant="info"
      @click="choose(3)"
      :class="{ active: 3 == currentIndex }"
    >
      毕业生</b-list-group-item
    >
    <b-list-group-item
      variant="light"
      @click="choose(4)"
      :class="{ active: 4 == currentIndex }"
    >
      教师区</b-list-group-item
    >
  </b-list-group>
</template>
<script>
export default {
  name: "PostAreaSelect",
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    choose(index) {
      this.currentIndex = index;
      this.$emit("postAreaClick", index);
    },
  },
};
</script>
<style scoped>
.active{
  font-size: 1.5em;
}
</style>