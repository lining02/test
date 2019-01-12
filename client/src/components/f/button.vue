<template>
    <div>
        <button @click="sub">提交</button>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;


  sub() {
      console.log(11)
      this.$emit('click', '111')
  }
}
</script>

<style scoped>

</style>