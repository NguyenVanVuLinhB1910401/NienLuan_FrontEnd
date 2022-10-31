<template>
    <div id="NCCPage">
      <div class="container-fuild">
        <AppNav/>
        <div class="row m-0 p-0">
          <div class="col-md-2  m-0 p-0">
            <Sidebar/>
          </div>
          <div class="col-md-10" style="padding-top: 40px;">
            <h1>Nhà cung cấp</h1>
            <hr/>
            <router-link :to="{ name: 'addncc' }" class="nav-link text-white">
            <button class="btn btn-primary">Thêm nhà cung cấp</button>
          </router-link>
          <table class="table table-hover">
            <tr>
              <th>STT</th>
              <th id="tensp">Tên nhà cung cấp</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Địa chỉ</th>
              <th>Action</th>
            </tr>
            <tr v-for="(n, index) of ncc" :key="n._id">
                <td>{{index+1}}</td>
                <td>{{n.ten}}</td>
                <td>{{n.email}}</td>
                <td>{{n.phone}}</td>
                <td>{{n.address}}</td>
                <td>
                  <div>
                    <button @click="deleteNhaCungCap(n)" class="btn btn-danger">Xóa</button>
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
    import Sidebar from "@/components/Sidebar.vue";
    import AppNav from "@/components/Navbar.vue";
    import { mapActions, mapGetters } from "vuex";
import nhaCungCapService from '../../services/nhaCungCap.service';
      export default {
        components: {
            Sidebar,
            AppNav,
  
        },
        data() {
          return {
            
          }
        },
        async created() {
          const respone = await this.$store.dispatch('getAllNhaCungCap');
        },
        computed: {
          ...mapGetters(['ncc']),
        },
        methods: {
          async deleteNhaCungCap(ncc) {
            if(confirm(`Bạn có muốn xóa nhà cung cấp ${ncc.ten}?`)){
              try {
                const respone = await this.$store.dispatch('deleteNhaCungCap', ncc._id);
                if(respone.data.code == 1) {
                  alert(respone.data.message);
                  this.$router.push({name: 'nhacungcap'});
                }else {
                  alert(respone.data.message);
                }
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
  
      }
  </script>
  
  <style scoped>
  #NCCPage {
    min-height: 100vh;
  }
  </style>