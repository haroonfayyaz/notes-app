<template>
  <div class="p-5 rounded-2xl bg-white transition max-h-[394px]">
    <div class="pb-5 max-h-full overflow-scroll relative">
      <div class="flex justify-between items-center mb-5 sticky top-0 bg-white">
        <h2 class="font-bold text-lg line-clamp-1">{{ cart.name }}</h2>
        <div class="flex items-center gap-2 ms-4">
          <router-link :to="`/note/${index}`">
            <img
              src="/assets/media/view.svg"
              height="20"
              width="20"
              class="min-w-5"
            />
          </router-link>
          <button @click="$emit('edit', index)">
            <img
              src="/assets/media/pencil-square.svg"
              height="24"
              width="24"
              class="min-w-5"
            />
          </button>
        </div>
      </div>

      <div v-if="cart.type === 'image' && cart.profileImage" class="mt-2">
        <img
          v-if="imageSrc"
          :src="imageSrc"
          alt="Cart Image"
          class="w-full aspect-[3/1.8] object-cover rounded-xl mb-5"
        />
      </div>

      <p
        class="text-sm text-textBase whitespace-pre-line"
        :class="{
          'line-clamp-5': cart.type === 'image',
          'line-clamp-14': cart.type === 'default' || '',
          'line-clamp-8': cart.type === 'checkbox',
        }"
      >
        {{ cart.description }}
      </p>

      <ul
        v-if="cart.type === 'checkbox'"
        class="mt-2 list-none text-sm flex flex-col gap-3"
      >
        <li
          v-for="(opt, idx) in cart.productOptions"
          :key="idx"
          class="flex items-center gap-2"
        >
          <input
            type="checkbox"
            class="h-4 w-4 rounded"
            v-model="opt.checked"
            @change="saveToLocalStorage"
          />
          <label :class="{ 'text-gray-500': opt.checked }">
            {{ opt.text }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  cart: Object,
  index: Number,
});

const emit = defineEmits(["edit"]);

const imageSrc = computed(() => {
  if (props.cart?.type === "image" && props.cart.profileImage) {
    if (typeof props.cart.profileImage === "string") {
      return props.cart.profileImage;
    } else if (props.cart.profileImage instanceof File) {
      return URL.createObjectURL(props.cart.profileImage);
    }
  }
  return null;
});

function saveToLocalStorage() {
  localStorage.setItem("cartData", JSON.stringify(props.cart));
}
</script>
