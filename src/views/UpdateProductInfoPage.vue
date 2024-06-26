<template>
  <div class="container">
    <el-container>
      <div style="float: left; width: 15%; display: flex; padding-top: 80px; justify-content: center;">
        <el-button class="black-button" type="primary" @click="addProduct">Add Product</el-button>
      </div>
      <div style="float: left; width: 80%;">
        <div class="card" v-for="(item, index) in productArr" :key="item.uuid" @mouseenter="showDialog(index)" @mouseleave="hideDialog">
          <div class="ribbon">
            <div class="handleDialog" v-if="isShow && index === current">
              <el-button
                  type="primary"
                  style="margin-top: 10px; background-color: #ffdd01; color: #000000"
                  @click="updateProduct(item)"
              >Update</el-button>
              <el-button
                  type="danger"
                  style="margin-top: 10px; background-color: #ffdd01; color: #000000"
                  @click="removeProduct(item.uuid)"
              >Removal</el-button>
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
        :title="productParams.uuid ? 'Update Product' : 'Add Product'"
    >
      <el-form
          style="width: 80%"
          :model="productParams"
          :rules="rules"
          ref="formRef"
      >
        <el-form-item label="Product Name" label-width="170px" prop="productName">
          <el-input v-model="productParams.productName" placeholder="Enter product name"></el-input>
        </el-form-item>
        <el-form-item label="Product Price" label-width="170px" prop="productPrice">
          <el-input v-model="productParams.productPrice" placeholder="Enter product price"></el-input>
        </el-form-item>
        <el-form-item label="Product Description" label-width="170px" prop="productDescription">
          <el-input v-model="productParams.productDescription" placeholder="Enter product description"></el-input>
        </el-form-item>
        <el-form-item label="Inventory" label-width="170px" prop="quantity">
          <el-input v-model="productParams.quantity" placeholder="Enter inventory count"></el-input>
        </el-form-item>
        <el-form-item label="Product Image" label-width="170px" prop="productUrl">
          <el-upload
              class="uploader"
              action="http://45.145.228.53:8080/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img
                v-if="productParams.productUrl"
                :src="productParams.productUrl"
                style="width: 100px; height: 100px; object-fit: cover;"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="primary" class="black-button" size="default" @click="cancel">Cancel</el-button>
        <el-button type="primary" class="black-button" size="default" @click="confirm">Confirm</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, reactive, ref} from "vue";
import {
  AddOrUpdateProductRequestData, AddOrUpdateProductResponseData,
  ProductData,
  ProductResponseData, RemovalProductRequestData,
  RemovalProductResponseData
} from "../api/product/type.ts";
import {reqAddOrUpdateProduct, reqGetUserProducts, reqRemovalProduct} from "../api/product";
import {ElMessage, UploadProps} from "element-plus";

let pageNo = ref<number>(1);
let pageSize = ref<number>(8);
let total = ref<number>(0);
let productArr = ref<ProductData[]>([]);
let isShow = ref<boolean>(false);
let current = ref<number | null>(null);
let dialogFormVisible = ref<boolean>(false);
let removalProduct = reactive<RemovalProductRequestData>({
  uuid: ""
});
let productParams = reactive<AddOrUpdateProductRequestData>({
  productName: "",
  productDescription: "",
  productPrice: 0,
  quantity: 0,
  productUrl: ""
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

const removeProduct = async(uuid: string) => {
  removalProduct.uuid = uuid;
  let result: RemovalProductResponseData = await reqRemovalProduct(removalProduct);
  if(result.code === 0){
    ElMessage({
      type: "success",
      message: "Removal product successfully.",
    });
    getProducts();
  }else{
    ElMessage({
      type: "error",
      message: result.message
    })
  }
}

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
      rawFile.type === "image/png" ||
      rawFile.type === "image/jpeg" ||
      rawFile.type === "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "The uploaded file size must be less than 4MB",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "The uploaded file format must be PNG, JPG, or GIF",
    });
    return false;
  }
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (
    response,
    uploadFile,
) => {
  productParams.productUrl = response.data;
  formRef.value.clearValidate("productUrl");
};

const validatorProductName = (rule: any, value: any, callback: any) => {
  if (value) {
    callback();
  } else {
    callback(new Error('Product Name is required'));
  }
};

const validatorProductDescription = (rule: any, value: any, callback: any) => {
  if (value) {
    callback();
  } else {
    callback(new Error('Product Description is required'));
  }
};

const validatorProductPrice = (rule: any, value: any, callback: any) => {
  const price = parseFloat(value);
  if (!isNaN(price) && price > 0) {
    callback();
  } else {
    callback(new Error('Product Price must be a positive number'));
  }
};

const validatorQuantity = (rule: any, value: any, callback: any) => {
  const quantity = parseInt(value);
  if (!isNaN(quantity) && quantity >= 0) {
    callback();
  } else {
    callback(new Error('Quantity must be a non-negative integer'));
  }
};

const validatorproductUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback();
  } else {
    callback(new Error("Please upload a image"));
  }
};

const rules = {
  productName: [
    {required: true, trigger: "blur", validator: validatorProductName},
  ],
  productDescription: [
    {required: true, trigger: "blur", validator: validatorProductDescription},
  ],
  quantity: [
    {required: true, trigger: "blur", validator: validatorQuantity},
  ],
  productPrice: [
    {required: true, trigger: "blur", validator: validatorProductPrice},
  ],
  productUrl: [{required: true, validator: validatorproductUrl}]
}

const addProduct = () => {
  dialogFormVisible.value = true;
  productParams.uuid = "";
  productParams.productName = "";
  productParams.productDescription = "";
  productParams.productPrice = 0;
  productParams.quantity = 0;
  productParams.productUrl = "";
  nextTick(() => {
    formRef.value.clearValidate("productName");
    formRef.value.clearValidate("productDescription");
    formRef.value.clearValidate("ProductPrice");
    formRef.value.clearValidate("quantity");
    formRef.value.clearValidate("productUrl");
  });
}

const updateProduct = (data: AddOrUpdateProductRequestData) => {
  nextTick(() => {
    formRef.value.clearValidate("productName");
    formRef.value.clearValidate("productDescription");
    formRef.value.clearValidate("ProductPrice");
    formRef.value.clearValidate("quantity");
    formRef.value.clearValidate("productUrl");
  })
  dialogFormVisible.value = true;
  Object.assign(productParams, data);
}

const confirm = async () => {
  await formRef.value.validate();
  let result: AddOrUpdateProductResponseData = await reqAddOrUpdateProduct(productParams);
  if(result.code == 0){
    dialogFormVisible.value = false;
    ElMessage({
      type: "success",
      message: productParams.uuid ? "Update product successfully" : "Add product successfully",
    });
    getProducts();
  }else{
    ElMessage({
      type: "error",
      message: productParams.uuid ? "Update product failure" : "Add product failure",
    });
    dialogFormVisible.value = false;
  }
};

const cancel = () => {
  dialogFormVisible.value = false;
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

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #000000 !important;
}

.black-button {
  background-color: #3d3d3d !important;
  border-color: #3d3d3d !important;
  color: white !important;
}
</style>
