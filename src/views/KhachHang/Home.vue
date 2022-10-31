<template>
  <div class="container-fuild">
    <div>
        <NavbarKH/>
    </div>
    <div style="padding-top: 80px">
        <p class="text-center">Sản Phẩm Nổi Bật</p>

        <p class="text-center">Sản Phẩm Mới</p>
        
    </div>
    <div>
        <FooterKH/>
    </div>
  </div>
</template>

<script>
import NavbarKH from "@/components/NavbarKhachHang.vue";
import FooterKH from "@/components/FooterKhachHang.vue";
import productKhachHangService from '@/services/productKhachHang.service';
export default {
    components: {
        NavbarKH,
        FooterKH,
    },
    data() {
        return {
            spNew: [],
            spnoiBat: [],
        }
    },
    async created() {
        //const responeNew = await productKhachHangService.GetComponents();
    }
}
</script>

<style>

</style>