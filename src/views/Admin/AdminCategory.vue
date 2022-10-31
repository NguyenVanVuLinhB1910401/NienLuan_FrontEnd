<template>
  <div id="AdminCategoryPage">
    <div class="container-fuild m-0 p-0">
      <AppNav/>
      <div class="row m-0 p-0">
        <div class="col-md-2">
          <Sidebar/>
        </div>
        <div class="col-md-10" style="padding-top: 40px;">
          <h1>DANH SÁCH LOẠI SẢN PHẨM</h1>
          <router-link :to="{ name: 'addcategory' }" class="nav-link text-white">
            <button class="btn btn-primary">Thêm loại sản phẩm</button>
          </router-link>
          <table class="table table-hover mt-3">
            <tr>
              <th>STT</th>
              <th id="tensp">Tên loại sản phẩm</th>
              <th class="text-center">Hình ảnh</th>
              <th>Ngày tạo</th>
              <th>Action</th>
            </tr>
            <tr v-for="(l, index) of loai" :key="l._id">
                <td>{{index+1}}</td>
                <td>{{l.tenloaisp}}</td>
                <td v-if="l.image" class="text-center"><img id="hinh" :src="'http://localhost:3000/'+ l.image"></td>
                <td v-else class="text-center">Không có ảnh</td>
                <td>{{moment(l.createAt).format('DD/MM/YYYY, h:mm:ss a')}}</td>
                <td>
                  <div>
                    <button @click="goEditCategory(l._id)" class="btn btn-secondary">Cập nhật</button>
                    <button @click="deleteCategory(l._id)" class="btn btn-danger">Xóa</button>
                  </div>
                </td>
              </tr>            
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import loaiNhanVienService from '../../services/loaiNhanVien.service';
import Sidebar from "@/components/Sidebar.vue";
import AppNav from "@/components/Navbar.vue";
import moment from 'moment';
export default {
  components: {
      Sidebar,
      AppNav,
  },
  data() {
    return {
      moment,
    }
  },
  async created() {
    //this.loai = loaiNhanVienService.getAllCategory();
    const respone = await this.$store.dispatch('getAllLoai');
  },
  computed: {
      ...mapGetters(['loai']),

  },
  methods: {
      goEditCategory(id) {
        this.$router.push({name: 'editcategory', params: { id: id }})
      },
      async deleteCategory(id) {
        const respone = await this.$store.dispatch('deleteLoai', id);
        if(respone.data.code == 0) {
          alert(respone.data.message);
        } else {
          alert(respone.data.message);
          this.$router.push({name: 'category'});
        }
      }
  }

}
</script>

<style scoped>
#AdminCategoryPage{
    min-height: 100vh;
}
#hinh{
  width: 100px;
  height: 100px;
}
</style>