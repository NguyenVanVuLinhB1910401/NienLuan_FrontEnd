<template>
    <div id="EditKhoPage">
      <div class="container-fuild">
        <AppNav />
        <div class="row m-0 p-0">
          <div class="col-md-2 m-0 p-0">
            <Sidebar />
          </div>
          <div class="col-md-10" style="padding-top: 40px;">
            <div style="background:#E6E6FA" class="mt-3 p-2">
              <div class="d-flex justify-content-between align-items-center">
                <h1>Quản Lý Danh Sách Shipper</h1>
              <router-link :to="{ name: 'addshipper' }" class="nav-link text-white pe-5">
                  <button class="btn btn-primary">Thêm Shipper</button>
              </router-link>
              </div>
              
              <hr/>
            <table class="table table-hover " >
              <tr>
                <th class="text-center">STT</th>
                <th id="tensp">Họ tên</th>
                <th>Tài khoản</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Action</th>
              </tr>
              <tr v-for="(shipper, index) of shippers" :key="shipper._id">
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ shipper.hoten }}</td>
                <td>{{ shipper.taikhoan }}</td>
                <td>
                  {{
                    shipper.sdt
                  }}
                </td>
                <td>{{shipper.email}}</td>
                <td>
                  {{shipper.diachi}}
                </td>
                <td>
                  <div class="">
                    <button
                      @click="deleteShipper(shipper)"
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
  import ShipperService from '@/services/shipper.service';
  export default {
    components: {
      Sidebar,
      AppNav,
    },
    data() {
      return {
        moment,
        shippers: [],
      };
    },
    async created() {
      const respone = await ShipperService.getAllShipper();
      
      if(respone.data.code == 1){
        this.shippers = respone.data.shippers;
        
      }
    },
    methods: {
      async deleteShipper(shipper) {
        if(confirm(`Bạn có muốn xóa shipper ${shipper.hoten}?`)){
              try {
                const respone = await ShipperService.deleteOneShipper(shipper._id);
                if(respone.data.code == 1) {
                  alert(respone.data.message);
                  const index = this.shippers.indexOf(shipper);
                  this.shippers.splice(index,1);
                }else {
                  alert(respone.data.message);
                }
              } catch (error) {
                console.log(error);
              }
            }
      }
    },
  };
  </script>
  
  <style scoped>
  #HomePage {
    min-height: 100vh;
  }
  </style>
  