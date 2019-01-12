<template>
    <div>
        {{label}}
        <slot></slot>
       <p v-if="msg" class="msg">{{msg}}</p>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator';
import schema from "async-validator";
@Component
export default class HelloWorld extends Vue {
  @Prop() private label!: string;
  @Prop() private prop!: string;
  @Inject() private form!: any;


  msg:string = ''


  created() {
      console.log(this.form)
      this.$on('changeVal', (val:string) => {
          this.valite()
      })
      if(this.prop) {
          this.$parent.$emit('list', this)
      }
  }
  valite() {
      return new Promise(resolove => {
          let s = new schema({[this.prop]: this.form.rules[this.prop]})
          s.validate({[this.prop]: this.form.model[this.prop]}, (errors:any) => {
              if(errors) {
                  this.msg = errors[0].message;
                  resolove(false)
              } else {
                  this.msg = ''
                  resolove(true)
              }
          })
      })
  }
}
</script>

<style scoped>
.msg {
    color: #f00;
}

</style>