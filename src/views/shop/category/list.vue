<template>
 <div class="bg-white px-3" style="margin: -20px;margin-top: -1rem;margin-bottom: 0!important;">
      <div class="border-bottom py-2 ">
          <el-button type="primary" size="mini" @click="createTop()"> 创建顶级分类</el-button>
      </div>
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
      default-expand-all
      draggable
      @node-drop="nodeDrop"
      @node-drag-end="nodeDragEnd"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <div>
          <el-input
            v-if="data.editStatus"
            v-model="data.label"
            size="mini"
          ></el-input>
          <span v-else>{{ node.label }}</span>
        </div>
        <span>
          <el-button
            :type="data.status ? 'primary' : 'danger'"
            size="mini"
            @click.stop="showOrhide(data)"
          >
            {{ data.status ? "显示" : "隐藏" }}
          </el-button>
          <el-button type="sucess" size="mini" @click="append(data)">
            增加
          </el-button>
          <el-button
            :type="data.editStatus ? 'default' : 'warning'"
            size="mini"
            @click.stop="data.editStatus = !data.editStatus"
            >{{ data.editStatus ? "完成" : "修改" }}</el-button
          >
          <el-button type="danger" size="mini" @click="remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          status: 1,
          editstatus: false,
          children: [
            {
              id: 4,
              label: "二级 1-1",
              status: 1,
              editstatus: false,
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                  status: 1,
                  editstatus: false,
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                  status: 1,
                  editstatus: false,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          status: 1,
          editstatus: false,
          children: [
            {
              id: 5,
              label: "二级 2-1",
              status: 1,
              editstatus: false,
            },
            {
              id: 6,
              label: "二级 2-2",
              status: 1,
              editstatus: false,
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          status: 1,
          editstatus: false,
          children: [
            {
              id: 7,
              label: "二级 3-1",
              status: 1,
              editstatus: false,
            },
            {
              id: 8,
              label: "二级 3-2",
              status: 1,
              editstatus: false,
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },

  methods: {
    //增加分类节点
    append(data) {
      data.children.push({
        id: 1,
        label: "一级 1",
        status: 1,
        editstatus: false,
        children: [],
      });
    },
    //删除分类节点
    remove(node, data) {
      this.$confirm("此操作将删除该分类, 是否继续?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex((d) => d.id === data.id);
        children.splice(index, 1);
      });
    },
    //修改分类标题
    edit(data) {
      if (!data.editStatus) {
        return (data.editStatus = true);
      }
      data.editstatus = false;
    },
    //显示或者隐藏
    showOrhide(data) {
      data.status = data.status ? 0 : 1;
    },
    handleNodeClick(data) {
      console.log(data);
    },
    //节点拖拽
    nodeDrop(){

    },
    nodeDragEnd(){
        
    },
    createTop(){
        this.$prompt('请输入顶级分类名称', '提示', {
					confirmButtonText: '创建',
					cancelButtonText: '取消',
					inputValidator: function(val) {
						if (val === '' || val === null) {
							return '顶级分类名称不能为空'
						}
						return true
					}
				}).then(({value})=>{
                    console.log(value)
                })
    }
  },
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-tree-node__content {
  padding: 20px 0;
}
</style>