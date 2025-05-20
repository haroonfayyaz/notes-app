<template>
  <TitleAndFilters />
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="(cart, index) in cartStore.carts"
      :key="index"
      class="p-4 border rounded shadow bg-white"
    >
      <h3 class="font-bold text-lg">{{ cart.name }}</h3>
      <p class="text-sm text-gray-600">{{ cart.description }}</p>

      <div v-if="cart.type === 'image' && cart.profileImage" class="mt-2">
        <img :src="cart.profileImage" alt="Cart Image" class="w-full h-auto" />
      </div>

      <ul
        v-if="cart.type === 'checkbox'"
        class="mt-2 list-disc list-inside text-sm"
      >
        <li v-for="(opt, idx) in cart.productOptions" :key="idx">{{ opt }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();
</script>