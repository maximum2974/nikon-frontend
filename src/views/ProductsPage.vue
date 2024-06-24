<template>
    <div class="container">
      <el-container>
        <div style="float: left;width: 15%;">
        </div>
        <div style="float: left; width: 80%;">
          <div class="card" v-for="(item, index) in productArr" :key="item.uuid" @mouseenter="showDialog(index)" @mouseleave="hideDialog">
            <div class="ribbon">
              <div class="handleDialog" v-if="isShow && index === current">
                <el-button
                    v-if="item.quantity > 0"
                    type="success"
                    style="margin-top: 60%; background-color: #ffdd01; color: #000000"
                    @click="buyProduct(item)"
                >Buy</el-button>
                <el-button
                    v-else
                    type="danger"
                    style="margin-top: 60%; background-color: #ffdd01; color: #000000"
                    disabled
                >Sold Out</el-button>
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
            @current-change="getProducts"
        />
      </div>
      <el-dialog
          v-model="dialogFormVisible"
          title="order information"
      >
        <el-form
            style="padding-left: 40px;"
            :model="purchaseProductsParams"
            :rules="rules"
            ref="formRef"
        >
          <el-form-item label="Name" label-width="150px">
            <el-input v-model="currentProduct.productName" readonly></el-input>
          </el-form-item>
          <el-form-item label="Product Image" label-width="150px">
            <img :src="currentProduct.productUrl" alt="Product Image" style="width: 100px; height: 100px; object-fit: cover;" />
          </el-form-item>
          <el-form-item label="Quantity" label-width="150px" prop="quantity">
            <el-select v-model="purchaseProductsParams.quantity" placeholder="Please choose quantity">
              <el-option
                  v-for="n in currentProduct.quantity"
                  :key="n"
                  :label="n"
                  :value="n"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Credit Card Number" label-width="150px" prop="creditCardNumber">
            <el-input
                placeholder="Enter your credit card number (13-16 digits)"
                v-model="purchaseProductsParams.creditCardNumber"
            ></el-input>
          </el-form-item>
          <el-form-item label="Email" label-width="150px" prop="email">
            <el-input
                placeholder="Enter your email address"
                v-model="purchaseProductsParams.email"
            ></el-input>
          </el-form-item>
          <el-form-item label="Shipping Address" label-width="150px" prop="shippingAddress">
            <el-input
                placeholder="Enter your shipping address"
                v-model="purchaseProductsParams.shippingAddress"
            ></el-input>
          </el-form-item>
        </el-form>
        <!--具名插槽:footer-->
        <template #footer>
          <el-button type="primary" size="default" @click="cancel"
          >cancel</el-button
          >
          <el-button type="primary" size="default" @click="confirm"
          >confirm</el-button
          >
        </template>
      </el-dialog>
    </div>
</template>


<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {reqGetUserProducts, reqPurchaseProducts} from "../api/product";
import {ProductData, ProductResponseData, PurchaseProduct, PurchaseProductResponseData} from "../api/product/type.ts";
import useUserStore from "../store/modules/user.ts";
import {ElMessage} from "element-plus";
import {useRoute, useRouter} from "vue-router";

let pageNo = ref<number>(1);
let pageSize = ref<number>(8);
let total = ref<number>(0);
let productArr = ref<ProductData[]>([]);
let isShow = ref<boolean>(false);
let current = ref<number | null>(null);
let dialogFormVisible = ref<boolean>(false);
let useStore = useUserStore();
let router = useRouter();
let route = useRoute();

let currentProduct = reactive<ProductData>({
  uuid: "",
  productName: "",
  productDescription: "",
  productPrice: 0,
  productUrl: "",
  quantity: 0
});
let purchaseProductsParams = reactive<PurchaseProduct>({
  productUuid: "",
  quantity: 1,
  creditCardNumber: "",
  email: "",
  shippingAddress: "",
});
let formRef = ref();
onMounted(() => {
  getProducts();
});

const getProducts = async (pager = 1) => {
  pageNo.value = pager;
  let result: ProductResponseData = await reqGetUserProducts(pageNo.value, pageSize.value);
  if(result.code === 0){
    total.value = result.data.total;
    productArr.value = result.data.records;
  }
}

const showDialog = (index: number) => {
  isShow.value = true;
  current.value = index;
};

const hideDialog = () => {
  isShow.value = false;
  current.value = null;
};

const buyProduct = async (product: ProductData) => {
  if (useStore.userRole === "admin") {
    ElMessage.error('You are an admin and cannot make a purchase.');
    return;
  } else if (!useStore.userRole) {
    await router.push({ path: '/login', query: { redirect: route.fullPath } });
    return;
  }
  purchaseProductsParams.productUuid = "";
  purchaseProductsParams.quantity = 1;
  purchaseProductsParams.creditCardNumber = "";
  purchaseProductsParams.email = "";
  purchaseProductsParams.shippingAddress = "";
  Object.assign(currentProduct, product);
  purchaseProductsParams.productUuid = product.uuid;
  dialogFormVisible.value = true;
}

const cancel = () => {
  dialogFormVisible.value = false;
}

const confirm = async() => {
  await formRef.value.validate();
  let result: PurchaseProductResponseData = await reqPurchaseProducts(purchaseProductsParams);
  if (result.code === 0) {
    dialogFormVisible.value = false;
    ElMessage({
      type: "success",
      message: "Purchase successful! Please check your email."
    });
  } else {
    ElMessage({
      type: "error",
      message: result.message || "Purchase failed. Please try again."
    });
  }
};

const validatorQuantity = (rule: any, value: any, callBack: any) => {
  if(!value){
    callBack(new Error("Quantity is required"));
  }
  if (!Number.isInteger(value) || value <= 0 || value > currentProduct.quantity) {
    callBack(new Error(`Quantity must be an integer between 1 and ${currentProduct.quantity}`));
  }
  callBack();
};

const validatorCreditCardNumber = (rule: any, value: any, callBack: any) => {
  let regex = /^[1-9][0-9]{12,15}$/;
  if (!value) {
    callBack(new Error('Credit card number is required'));
  }
  if (!regex.test(value)) {
    callBack(new Error('Invalid credit card number'));
  }
  callBack();
};

const validatorEmail = (rule: any, value: any, callBack: any) => {
  let regex = /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/;
  if (!regex.test(value)) {
    callBack(new Error('Invalid email address'));
  }
  callBack();
};

const validatorShippingAddress = (rule: any, value: any, callBack: any) => {
  if (!value) {
    callBack(new Error('Shipping address is required'));
  }
  callBack();
};

const rules = {
  quantity: [{required: true ,validator: validatorQuantity, trigger: 'blur' }],
  creditCardNumber: [{required: true , validator: validatorCreditCardNumber, trigger: 'blur' }],
  email: [{required: true , validator: validatorEmail, trigger: 'blur' }],
  shippingAddress: [{required: true , validator: validatorShippingAddress, trigger: 'blur' }]
}
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

.pagination-container{
  padding: 20px;
  display: flex;
  justify-content: center;
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

.ribbon6 {
  display: inline-block;
  text-align: center;
  width: 200px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  top: 30px;
  right: -50px;
  z-index: 2;
  overflow: hidden;
  transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  border: 1px dashed;
  box-shadow: 0 0 0 3px #57DD43, 0px 21px 5px -18px rgba(0, 0, 0, 0.6);
  background: #57DD43;
}
</style>
