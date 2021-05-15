<template>
  <div>
    <!-- 标题 -->
    <h3>修改集客活动</h3>
    <!-- 修改表单信息 -->
    <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="参与活动的品牌" prop="brand">
        <el-select multiple v-model="ruleForm.brand" placeholder="请选择">
          <el-option v-for="item in brandList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参与活动的logo">
        <el-upload
          class="avatar-uploader1"
          :action="action"
          name="image_data"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
        </el-upload>
        <div style="font-size: 12px; color: #999;">尺寸 100 * 100</div>
      </el-form-item>
      <el-form-item label="封面图">
        <el-upload
          class="avatar-uploader2"
          :action="action"
          name="image_data"
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.coverPic" :src="ruleForm.coverPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon2"></i>
        </el-upload>
        <div style="font-size: 12px; color: #999;">比例2 : 1</div>
      </el-form-item>
      <el-form-item label="活动时间" prop="time">
        <el-date-picker v-model="ruleForm.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="活动充值" prop="price">
        <el-input v-model="ruleForm.price"></el-input>元
      </el-form-item>
      <el-form-item label="返现金额或礼品名称" prop="gift">
        <el-input v-model="ruleForm.gift"></el-input>
      </el-form-item>
      <el-form-item label="重点汽车标识">
        <el-radio v-model="ruleForm.keyIs" label="显示">显示</el-radio>
        <el-radio v-model="ruleForm.keyIs" label="隐藏">隐藏</el-radio>
      </el-form-item>
      <el-form-item label="活动保障" prop="ensure">
        <el-checkbox-group v-model="ruleForm.ensure">
          <el-checkbox label="底价购车" name="checkList"></el-checkbox>
          <el-checkbox label="保证金可退" name="checkList"></el-checkbox>
          <el-checkbox label="正规4S店" name="checkList"></el-checkbox>
          <el-checkbox label="旧车置换" name="checkList"></el-checkbox>
          <el-checkbox label="可贷款" name="checkList"></el-checkbox>
          <el-checkbox label="就近保养" name="checkList"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="活动流程">
        <el-radio v-model="ruleForm.procedureIs" label="显示">显示</el-radio>
        <el-radio v-model="ruleForm.procedureIs" label="隐藏">隐藏</el-radio>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="优惠活动详情">
        <Wangeditor @func="getMsg"></Wangeditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交修改</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {},
  created () {}
}
</script>

<style lang="less" scoped>
</style>
