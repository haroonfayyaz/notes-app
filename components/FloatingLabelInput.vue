<template>
  <div class="relative w-full">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
      class="w-full border border-gray-100 text-sm rounded-2xl px-4 pt-6 pb-2 focus:outline-none focus:shadow-[0px_0px_8px_0px_rgba(0,_122,_255,_0.5)] focus:border focus:border-primary focus:ring-primary-500 h-14 bg-gray-100"
      :class="{ 'border border-primary !bg-white': modelValue }"
    />
    <label
      :class="[
        'absolute left-3 transition-all duration-200 px-1 pointer-events-none font-bold',
        isFocused || modelValue ? 'top-2 text-xs text-primary' : 'top-[18px] text-sm text-baseText'
      ]"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  modelValue: [String, Number],
  label: { type: String, required: true }
});

defineEmits(["update:modelValue"]);

const isFocused = ref(false);
</script>
