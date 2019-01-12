<template>
    <div>
        <input type="text" :value="ivalue" @input="inputHander">
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  ivalue:string = ''

  inputHander(e:any) {
      let value = e.target.value;
      this.ivalue = value;
      this.$emit('input', value)
      this.$parent.$emit('changeVal', value)
  }
}
</script>

<style scoped>

</style>