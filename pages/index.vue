<template>
  <div class="flex items-center justify-between mb-4">
    <TitleAndFilters @filter-change="onFilterChange">
      <button
        class="btn btn-primary flex items-center gap-2"
        @click="showModal = true"
      >
        <img
          src="/assets/media/charm_plus.svg"
          height="16"
          width="16"
          alt="plus"
        />
        Add New
      </button>
    </TitleAndFilters>
  </div>

  <AddNewModal
    :show="showModal"
    :edit-data="editCartData"
    @close="handleModalClose"
    @submit="handleModalSubmit"
  />

  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5">
    <CartCard
      v-for="(cart, index) in filteredCarts"
      :key="index"
      :cart="cart"
      :index="index"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

const selectedFilters = ref([]);
const showModal = ref(false);
const editCartIndex = ref(null);
const editCartData = ref(null);

const onFilterChange = (filters) => {
  selectedFilters.value = filters;
};

const filteredCarts = computed(() => {
  if (
    selectedFilters.value.includes("all") ||
    selectedFilters.value.length === 0
  ) {
    return cartStore.carts;
  }
  return cartStore.carts.filter((cart) =>
    selectedFilters.value.includes(cart.type)
  );
});

const handleDelete = (index) => {
  cartStore.carts.splice(index, 1);
  localStorage.setItem("carts", JSON.stringify(cartStore.carts));
};
const handleEdit = (index) => {
  editCartIndex.value = index;
  editCartData.value = { ...cartStore.carts[index] };
  showModal.value = true;
};

const handleModalSubmit = (data) => {
  if (editCartIndex.value !== null) {
    cartStore.carts[editCartIndex.value] = data;
    localStorage.setItem("carts", JSON.stringify(cartStore.carts));
  } else {
    cartStore.addCart(data);
  }
};

const handleModalClose = () => {
  showModal.value = false;
  editCartIndex.value = null;
  editCartData.value = null;
};
</script>

