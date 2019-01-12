<template>
    <div>
        <slot></slot>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private model!: object;
  @Prop() private rules!: object;
  @Prop() private labelWidth!: object;
  @Provide() form = {model: this.model, rules: this.rules}
list:any = []
  created() {
    this.$on('list', (val:any) => {
        this.list.push(val)
    })   
  }

  async validate(cb:any) {
      let tasks = this.list.map((o:any) => o.valite())
        let results = await Promise.all(tasks)
        let aa  = results.every((o:any) => {
          return o
        })
        cb(aa)
  }
}
</script>

<style scoped>

</style>