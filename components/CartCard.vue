<template>
  <div class="p-5 rounded-2xl bg-white transition max-h-[394px]">
    <div class="pb-5 max-h-full overflow-scroll relative">
      <div class="flex justify-between items-center mb-5 sticky top-0 bg-white">
        <h2 class="font-bold text-lg line-clamp-1">{{ cart.name }}</h2>
        <div class="flex gap-2 ms-4">
          <router-link :to="`/note/${index}`">
            <img
              src="/assets/media/view.svg"
              height="20"
              width="20"
              class="min-w-5"
            />
          </router-link>
          <button @click="showConfirm = true">
            <img
              src="/assets/media/trash.svg"
              height="16"
              width="16"
              class="min-w-4"
            />
          </button>
        </div>
      </div>

      <div v-if="cart.type === 'image' && cart.profileImage" class="mt-2">
        <img
          :src="cart.profileImage"
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

      <ul v-if="cart.type === 'checkbox'" class="mt-2 list-none text-sm flex flex-col gap-3">
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

    <!-- Confirmation Modal -->
    <Modal :show="showConfirm" @close="showConfirm = false">
      <template #title>Confirm Delete</template>
      <p>Are you sure you want to delete this cart?</p>
      <div class="mt-4 flex justify-end gap-3">
        <button @click="showConfirm = false" class="btn btn-dark">
          Cancel
        </button>
        <button @click="confirmDelete" class="btn btn-primary">Delete</button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["delete"]);

const props = defineProps({
  cart: Object,
  index: Number,
});

const showConfirm = ref(false);

function confirmDelete() {
  emit("delete", props.index);
  showConfirm.value = false;
}
</script>


