<template>
  <div class="table-container">
    <el-table
        ref="multipleTable"
        :data="filledShippingRecordsArr"
        style="width: 100%; border-collapse: collapse;"
        border>

      <!-- Serial Number -->
      <el-table-column label="No." align="center" width="55">
        <template #default="scope">
          {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <!-- Product Image -->
      <el-table-column label="Product Image" prop="productUrl" width="110px" align="center">
        <template #default="scope">
          <el-image v-if="scope.row.productUrl" style="width: 80px; height: 80px;" :src="scope.row.productUrl" fit="cover"/>
        </template>
      </el-table-column>

      <!-- Product Name -->
      <el-table-column label="Product Name" prop="productName" align="center"></el-table-column>

      <!-- Quantity -->
      <el-table-column label="Quantity" prop="quantity" width="140px" align="center">
        <template #default="scope">
          {{ scope.row.quantity }}
        </template>
      </el-table-column>

      <!-- Price -->
      <el-table-column label="Price" prop="price" width="110px" align="center">
        <template #default="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>

      <!-- Credit Card Number -->
      <el-table-column label="Credit Card Number" prop="creditCardNumber" align="center"></el-table-column>

      <!-- Email -->
      <el-table-column label="Email" prop="email" align="center"></el-table-column>

      <!-- Shipping Address -->
      <el-table-column label="Shipping Address" prop="shippingAddress" align="center"></el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
          v-model:currentPage="currentPage"
          v-model:pageSize="pageSize"
          :background="true"
          layout="prev, pager, next"
          :total="total"
          @current-change="getShippingRecords"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { reqGetUserShippingRecords } from "../api/shippingRecords";
import { ShippingRecordsResponseData, UserShippingRecordsData } from "../api/shippingRecords/type.ts";

const currentPage = ref<number>(1);
const pageSize = ref<number>(6);
const total = ref<number>(0);
const shippingRecordsArr = ref<UserShippingRecordsData[]>([]);

const getShippingRecords = async () => {
  const result: ShippingRecordsResponseData = await reqGetUserShippingRecords(currentPage.value, pageSize.value);
  if (result.code === 0) {
    total.value = result.data.total;
    shippingRecordsArr.value = result.data.records ?? [];
  }
}

const filledShippingRecordsArr = computed(() => {
  // Fill the array to ensure it has exactly pageSize items
  const filledArr = [...shippingRecordsArr.value];
  while (filledArr.length < pageSize.value) {
    filledArr.push({} as UserShippingRecordsData);
  }
  return filledArr;
});

onMounted(() => {
  getShippingRecords();
});
</script>

<style scoped>
.table-container {
  padding: 40px;
}

.el-table {
  border-collapse: collapse;
}

.el-table th,
.el-table td {
  border: 1px solid #dcdfe6;
}

.el-table th {
  background-color: #f5f7fa;
  font-weight: bold;
}

.pagination-container {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #000000 !important;
}
</style>
