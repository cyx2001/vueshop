<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-4 col-sm-8 col-md-6 m-auto pt-5">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">{{ $icof.logo }}</h3>
            </div>
            <div class="card-body">
              <el-form :model="form" ref="ruleForm" :rules="rules">
                <el-form-item prop="username">
                  <el-input
                    type="username"
                    v-model="form.username"
                    placeholder=" 请输入用户名"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    v-model="form.password"
                    placeholder=" 请输入密码"
                  ></el-input>
                </el-form-item>
                <el-from-item>
                  <el-button
                    type="primary"
                    size="medium"
                    class="w-100"
                    @click="submit"
                    >立即登录</el-button
                  >
                </el-from-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return;
      });
    },
  },
};
</script>
<style>
</style>
