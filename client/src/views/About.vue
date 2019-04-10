
<template>
    <div class="form-wrap">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
        </el-form>


         <k-form :model="kform" :rules="rules" ref="kform" label-width="100px" class="demo-kform">
            <k-form-item label="姓名" prop="name">
                <k-input v-model="kform.name"></k-input>
            </k-form-item>
            <k-form-item label="密码" prop="pass">
                <k-input v-model="kform.pass"></k-input>
            </k-form-item>
            <k-form-item>
                <el-button type="primary" @click="submitForm('kform')">立即创建</el-button>
            </k-form-item>
        </k-form>

        {{kform}}
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import kForm from '@/components/f/form.vue'; // @ is an alias to /src
import KFormItem from '@/components/f/item.vue'; // @ is an alias to /src
import KInput from '@/components/f/input.vue'; // @ is an alias to /src
import KButton from '@/components/f/button.vue'; // @ is an alias to /src

@Component({
  components: {
    kForm, KFormItem, KInput, KButton
  },
})
export default class Home extends Vue {
    ruleForm:any = {name: '', pass: ''}
    kform:any = {name: '', pass: ''}
    rules:any= {
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '姓名长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '密码长度在 3 到 5 个字符', trigger: 'blur' }
        ],
    }
    submitForm(formName:string) {
        let form:any = this.$refs[formName]
        form.validate((valid:boolean) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        }
}
</script>

<style scoped>
    .form-wrap {
        width: 300px;
        margin: 0 auto;
    }
</style>