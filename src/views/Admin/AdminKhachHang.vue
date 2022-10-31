<template>
  <div id="EditKhoPage">
    <div class="container-fuild">
      <AppNav />
      <div class="row m-0 p-0">
        <div class="col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div class="col-md-10" style="padding-top: 40px;">
          <div style="background: #e6e6fa" class="mt-3 p-2">
            <div class="d-flex justify-content-between align-items-center">
              <h1>Quản Lý Danh Sách Khách Hàng</h1>
              <div>
                <form class="d-flex align-items-center" role="search">
                  <select class="form-select" aria-label="Default select example">
                    <option selected value="all">Tất cả khách hàng</option>
                    <option value="1">Khách hàng bình thường</option>
                    <option value="2">Khách hàng thân thiết</option>
                    <option value="3">Khách hàng VIP</option>
                  </select>
              </form>
              </div>
              
            </div>
            <hr />

            
            <table class="table table-hover">
              <tr>
                <th class="text-center">STT</th>
                <th id="tensp">Họ tên</th>
                <th>Tài khoản</th>
                <th>Tổng tiền</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th>Action</th>
              </tr>
              <tr v-for="(dh, index) of donhang" :key="dh._id">
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ dh.hoten }}</td>
                <td>{{ dh.taikhoan }}</td>
                <td>
                  {{
                    Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(dh.tongtien)
                  }}
                </td>
                <td>
                  {{ moment(dh.createAt).format('DD/MM/YYYY, h:mm:ss a') }}
                </td>
                <td>
                  <div v-if="dh.trangthai == 'Chưa xử lý'" class="">
                    <button
                      @click="updateTrangThai(dh._id)"
                      class="btn btn-primary"
                    >
                      {{ dh.trangthai }}
                    </button>
                  </div>
                  <div v-else>
                    <button class="btn btn-primary" disabled>
                      {{ dh.trangthai }}
                    </button>
                  </div>
                </td>
                <td>
                  <div class="">
                    <button
                      @click="goToDetail(dh._id)"
                      class="btn btn-secondary"
                    >
                      Chi tiết
                    </button>
                    <button
                      @click="deleteCategory(dh._id)"
                      class="btn btn-danger"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import AppNav from '@/components/Navbar.vue';
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
export default {
  components: {
    Sidebar,
    AppNav,
  },
  data() {
    return {
      moment,
    };
  },
  async created() {
    const respone = await this.$store.dispatch('getAllDonHang');
  },
  computed: {
    ...mapGetters(['donhang']),
  },

  methods: {
    goToDetail(id) {
      this.$router.push({ name: 'admindetailorder', params: { iddh: id } });
    },
    async updateTrangThai(id) {
      const data = {
        trangthai: 'Đã xử lý',
      };
      const respone = await this.$store.dispatch('updateTrangThai', {
        id,
        data,
      });
    },
  },
};
</script>

<style scoped>
#HomePage {
  min-height: 100vh;
}
</style>
