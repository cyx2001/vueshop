<template>
  <div>
    <li
      class="list-group-item list-group-item-action d-flex align-items-center"
      style="cursor: pointer"
      :class="{ 'active sum-active': active }"
      @click.stop="$emit('change', index)"
    >
      {{ item.name }}
      <span class="btn btn-light btn-sm border ms-auto" v-if="showOptions">
                {{ item.num }}
              </span>
      <el-dropdown class="ms-auto" v-else>
        <span class="btn btn-light btn-sm border">
          {{ item.num }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.stop.native="$emit('edit', { item, index })"
            >修改</el-dropdown-item
          >
          <el-dropdown-item @click.stop.native="$emit('del', index)">
            删除</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </li>
  </div>
</template>
<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    item: Object,
    index: Number,
    showOptions:{
    	type:Boolean,
    	default:false
    }
  },
};
</script>
 <style>
</style>