<template>
    <div id="AdminKhoPage">
      <div class="container-fuild">
        <AppNav/>
        <div class="row m-0 p-0" >
          <div class="col-md-2 p-0 m-0" >
            <Sidebar/>
          </div>
          <div class="col-md-10 p-0 m-0" >
            <h1 style="padding-top: 40px;">QUẢN LÝ KHO</h1>
            <router-link :to="{ name: 'nhapkho' }" class="nav-link text-white">
                  <button class="btn btn-primary">Nhập kho</button>
            </router-link>
            <div style="margin-right: 20px">
              <table class="table table-hover mt-3" >
              <tr class="bg-secondary" style="height: 50px;color: #fff">
                <th class="text-center">STT</th>
                <th class="col-sm-2">Tên sản phẩm</th>
                <th class="text-end">Người nhập</th>
                <th class="text-end">Nhà cung cấp</th>
                <th class="text-end">Tồn kho</th>
                <th class="text-end">Đã bán</th>
                <th class="text-end">Giá nhập</th>
                <th class="text-end">Tổng tiền</th>
                <!-- <th>Ngày nhập</th> -->
                <th>Action</th>
              </tr>
              <tr v-for="(k, index) in kho" :key="k._id">
                <td class="text-center">{{index+1}}</td>
                <td id="tensp">{{k.id_sp?.tensp}}</td>
                <td class="text-end">{{k?.nguoinhap}}</td>
                <td class="text-end">{{k?.id_ncc.ten}}</td>
                <td  class="text-end">{{k?.soluong- k?.daban}}</td>
                <td  class="text-end">{{k?.daban}}</td>
                <td class="text-end">{{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(k.gianhap)}}</td>
                <td class="text-end">{{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(k.tongtien)}}</td>
                <td>
                  <div>
                    <button @click="goEditKho(k._id)" type="submit" class="btn btn-secondary">Cập nhật</button>
                    <button @click="deleteKho(k)" type="submit" class="btn btn-danger">Xóa</button>
                  </div>
                </td>
                <!-- <ProductItem :product="product"/> -->
              </tr>
              
            </table>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
    
  </template>
  
  <script>
    import productNhanVienService from "../../services/productNhanVien.service";
    import Sidebar from "@/components/Sidebar.vue";
    import AppNav from "@/components/Navbar.vue";
    import ProductItem from "../../components/ProductItem.vue";
    import { mapActions, mapGetters } from "vuex";
      export default {
        components: {
            Sidebar,
            AppNav,
            ProductItem,
  
        },
        data() {
          return {
  
          }
        },
        computed: {
          ...mapGetters(['kho'])
        },
        
        async created(){
          const respone = await this.$store.dispatch('getAllKho');
        }, 
        methods: {
          goEditKho(id) {
            this.$router.push({name: 'editkho', params: {id: id}});
          },
          async deleteKho(kho) {
            if(confirm(`Bạn có muốn xóa san pham ${kho.id_sp.tensp} trong kho?`)){
              try {
                const respone = await this.$store.dispatch('deleteKho', kho._id);
                if(respone.data.code == 1) {
                  alert(respone.data.message);
                  this.$router.push({name: 'kho'});
                }else {
                  alert(respone.data.message);
                }
              } catch (error) {
                console.log(error);
              }
            }
          },

        }
      }
  </script>
  
  <style scoped>
  #AdminProductPage {
    min-height: 100vh;
  }
  /* tr{
    text-align: center;
  } */
  #tensp{
    text-align: left;
  }
  </style>