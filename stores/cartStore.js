import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cartStore', () => {
  const carts = ref([]);

  const addCart = (cart) => {
    carts.value.push(cart);
  };

  return {
    carts,
    addCart,
  };
});
