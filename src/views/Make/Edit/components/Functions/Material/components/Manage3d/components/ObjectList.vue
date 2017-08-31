<template>
  <div>
    <ul class="object3d-list list clearfix">
      <li class="object3d-item" v-for="object in list.data" :key="object.id">
        <div class="clearfix">
          <img class="object3d-item__img" src="http://www.gy720.com/data/rotate/984/152/small_59376a9ee502d.jpg"/>
          <ul class="list object3d-item__btns">
            <li><el-button size="mini" type="primary">上传图片</el-button></li>
            <li><el-button size="mini" type="primary">管理图片</el-button></li>
            <li><el-button size="mini" @click="updateObject(object.id)">修改</el-button></li>
            <li><el-button size="mini">预览</el-button></li>
            <li><el-button type="warning" size="mini" @click.stop="removeObject(object.id)">删除</el-button></li>
          </ul>
        </div>
        <div class="object3d-item__name">{{ object.title }}</div>
      </li>
    </ul>

    <el-dialog title="创建物品3D" :visible="dialog" :modal="false" size="tiny" @before-close="$emit('close')">
      <el-form :model="form" :rules="rules" ref="form" label-width="95px">
        <el-form-item prop="title" label="项目名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item prop="source_rotate_category_id" label="所属分类">
          <el-select v-model="form.source_rotate_category_id">
            <el-option
              v-for="cate in cates"
              :key="cate.value"
              :label="cate.name"
              :value="cate.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="remark" label="项目简介">
          <el-input type="textarea" :rows="3" v-model="form.remark"></el-input>
        </el-form-item>

        <el-form-item prop="list_order" label="排序">
          <el-input v-model="form.list_order"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button
          type="primary"
          :loading="loading"
          @click="submit"
        >提交</el-button>
        <el-button @click="$emit('close')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 物品3D-物品
 *
 * @author yj
 */

export default {
  name: 'manage3d-obj-item',

  props: {
    cates: {
      type: Array,
      required: true,
    },
    dialog: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      list: { data: [] },

      form: {
        id: 0,
        title: '',
        list_order: 1,
        source_rotate_category_id: 1,
        remark: '',
      },
      rules: {
        title: [
          { required: true, trigger: 'blur', message: '物品名称不能为空' },
          { pattern: /^\S{1,30}$/, trigger: 'blur', message: '名称长度应在1到30个字符之间' },
        ],
        remark: [
          { required: true, trigger: 'blur', message: '分类排序不能为空' },
        ],
        list_order: [
          { type: 'number', required: true, trigger: 'blur', message: '分类排序不能为空' },
        ],
      },

      loading: false,
    }
  },

  methods: {
    updateObject(id) {
      this.form = this.list.data.find(item => item.id === id)
      this.$emit('open-create-object-dialog')
    },

    removeObject(id) {
      this.$confirm('确定要删除该项目么？删除后不可以恢复。', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => this.confirmRemove(id))
    },

    confirmRemove(id) {
      // 成功后要删除本地对应数据
      this.$http.delete(`/user/sourcerotate/${id}`)
        .then(() => {
          this.$message.success('操作成功')
        })
    },

    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          // 这里判断是创建还是修改，然后调用相应方法
          if (this.form.id) {
            this.update(this.form.id)
          } else {
            this.createObject()
          }
        }
      })
    },

    update(id) {
      this.$http.put(`/user/sourcerotate/${id}`, this.form)
        .then(() => {
          // 更新本地的数据
        })
    },

    createObject() {
      this.$http.post('/user/sourcerotate', this.form)
        .then(() => {
          this.list = {
            ...this.list,
            // 如果本来的项目是10项，应该删掉最后一项
            data: [this.form, ...this.list.data],
          }
        })
    },
  },

  created() {
    this.$http.get('/user/sourcerotate')
      .then(({ result }) => {
        this.loading = false
        this.$emit('close-create-object-dialog')
        this.list = result
      })
  },
}
</script>

<style lang="postcss">
@import "vars.css";

:root {
  --item-count: 4;
  --item-gut: 10px;
  --total-item-gut: calc((var(--item-count) - 1) * var(--item-gut));

  --btn-width: 65px;
  --cover-width: calc(100% - var(--btn-width));
}

.object3d-list {
  overflow: hidden;
  height: 540px;
  padding: 0 10px;
  border-left: 1px solid var(--gray-extra-light);
}

.object3d-item {
  float: left;
  width: calc((100% - var(--total-item-gut)) / var(--item-count));
  padding: 5px;
  border: 1px solid var(--gray-extra-light);
  margin-bottom: var(--item-gut);

  &:not(:nth-child(4n + 1)) {
    margin-left: var(--item-gut);
  }

  &__img {
    float: left;
    width: var(--cover-width);
  }

  &__btns {
    float: right;
    width: var(--btn-width);
    padding-left: 5px;

    & > li {
      & + li {
        margin-top: 5px;
      }
    }

    .el-button {
      width: 100%;
    }
  }

  &__name {
    text-align: center;
    line-height: 2;
  }
}
</style>
