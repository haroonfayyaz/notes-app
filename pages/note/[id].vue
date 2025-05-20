<template>
  <div class="max-w-[80%] m-auto mt-12">
    <router-link to="/"
      ><button class="border border-black rounded-xl px-6 py-2">
        Back
      </button></router-link
    >
    <div class="my-8 bg-white p-6 rounded-xl mx-auto">
      <div
        v-if="cart.type === 'image' && cart.profileImage"
        class="mt-4 w-full"
      >
        <img
          :src="cart.profileImage"
          alt="Cart Image"
          class="rounded-2xl w-full aspect-[3/1.4] object-cover mb-8"
        />
      </div>
      <div v-if="cart">
        <h1 class="text-4xl font-semibold mb-4">{{ cart.name }}</h1>
        <p class="mt-2 whitespace-pre-line">{{ cart.description }}</p>

        <ul v-if="cart.type === 'checkbox'" class="mt-2 list-none text-sm">
          <li
            v-for="(opt, idx) in cart.productOptions"
            :key="idx"
            class="flex items-center gap-2"
          >
            <input
              type="checkbox"
              v-model="opt.checked"
              @change="saveToLocalStorage"
            />
            <label :class="{ 'line-through text-gray-500': opt.checked }">
              {{ opt.text }}
            </label>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Cart not found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cartStore";

const route = useRoute();
const cartStore = useCartStore();

const cartId = parseInt(route.params.id);
const cart = cartStore.carts[cartId];
</script>

