<template>
  <div class="container">
    <el-container>
      <div style="float: left; width: 15%;"></div>
      <div style="float: left; width: 80%;">
        <div class="card" v-for="(item, index) in productArr" :key="item.uuid" @mouseenter="showDialog(index)" @mouseleave="hideDialog">
          <div class="ribbon">
            <div class="handleDialog" v-if="isShow && index === current">
              <el-button
                  type="success"
                  style="margin-top: 60%; background-color: #ffdd01; color: #000000"
                  @click="putawayProduct(item.uuid)"
              >Putaway</el-button>
            </div>
            <img :src="item.productUrl" style="height: 100%; width: 100%; object-fit: cover">
          </div>
          <div class="product-info">
            <span>{{ item.productName }}</span>
            <span>{{ item.productPrice }} MYR</span>
            <span>{{ item.productDescription }}</span>
            <span>Inventory: {{ item.quantity }}</span>
          </div>
        </div>
      </div>
    </el-container>
    <div class="pagination-container">
      <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :background="true"
          layout="prev, pager, next"
          :total="total"
          @current-change="getAdminProducts"
      />
    </div>
    <el-button class="back-to-top" icon="el-icon-caret-top" circle @click="scrollToTop"></el-button>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {
  AdminPutawayRequestData,
  AdminPutawayResonseData,
  ProductData,
  PutawayProductResponseData
} from "../api/product/type.ts";
import {reqAdminPutawayProduct, reqGetAdminProducts} from "../api/product";
import {ElMessage} from "element-plus";


let pageNo = ref<number>(1);
let pageSize = ref<number>(8);
let total = ref<number>(0);
let productArr = ref<ProductData[]>([]);
let current = ref<number>(-1);
let isShow = ref<boolean>(false);
let putawayRequest = reactive<AdminPutawayRequestData>({
  uuid: ""
});

onMounted(() => {
  getAdminProducts();
});

const putawayProduct = async(uuid: string) => {
  putawayRequest.uuid = uuid;
  let result: AdminPutawayResonseData = await reqAdminPutawayProduct(putawayRequest);
  if(result.code === 0){
    ElMessage({
      type: "success",
      message: "Putaway product successfully."
    });
    getAdminProducts();
  }else{
    ElMessage({
      type: "error",
      message: result.message
    })
  }
}

const getAdminProducts = async (pager = 1) => {
  pageNo.value = pager;
  let result: PutawayProductResponseData = await reqGetAdminProducts(pageNo.value, pageSize.value);
  if (result.code === 0) {
    total.value = result.data.total;
    productArr.value = result.data.records ?? [];
  }
}

const showDialog = (index: number) => {
  current.value = index;
  isShow.value = true;
};

const hideDialog = () => {
  current.value = -1;
  isShow.value = false;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.el-container {
  flex: 1;
}

.pagination-container {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.card {
  height: 350px;
  width: 266px;
  margin-left: 30px;
  margin-top: 30px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  float: left;
  position: relative;
}

.card img {
  width: 100%;
  height: 70%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.product-info {
  padding: 10px;
  text-align: center;
}

.product-info span {
  font-size: 15px;
  color: #BFBFBF;
  display: block;
  letter-spacing: 2px;
  margin-top: 5px;
}

.ribbon {
  display: inline-block;
  width: 100%;
  height: 70%;
  position: relative;
  float: left;
  background-size: cover;
  text-transform: uppercase;
  color: white;
}

.handleDialog {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-button {
  margin-top: 60%;
  background-color: #ffdd01;
  color: #000000;
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #000000 !important;
}

.black-button {
  background-color: black !important;
  border-color: black !important;
  color: white !important;
}
</style>
