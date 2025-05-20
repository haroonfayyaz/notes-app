<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      @click.self="$emit('close')"
    >
      <div
        class="w-full max-w-md max-h-full bg-white rounded-2xl shadow-xl overflow-y-auto modal-container"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">
              <slot name="title">Modal Title</slot>
            </h2>
            <button
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-500"
            >
              <img src="/assets/media/x-mark.svg" height="40" width="40" alt="close" />
            </button>
          </div>

          <div>
            <slot />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["close"]);
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}
</style>
