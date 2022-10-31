import createApiClient from "./api.service";

class productKhachHangService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    };
    async addProduct(data) {
        return await this.api.post("/products/add", data);
    };
    async getProducts() {
        return await this.api.get("/khachhang/products");
    };
    async getOneProduct(id) {
        return await this.api.get("/khachhang/products/" + id);
    };
    async getProductTheoLoai(loai) {
        return await this.api.get("/khachhang/products?loai=" + loai);
    };
    async updateProduct(id, data) {
        return await this.api.put("/products/" + id, data);
    };
    async deleteProduct(id) {
        return await this.api.delete("/products/" + id);
    };

    async getAllLoai() {
        return await this.api.get("/nv/loaisp");
    }
}


export default new productKhachHangService();