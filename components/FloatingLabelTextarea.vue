<template>
  <div class="relative w-full">
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
      class="form-input min-h-[112px] max-h-[300px] bg-gray-100"
      :class="{ 'border border-gray-100 ': modelValue }"
    />
    <label
      :class="[
        'absolute left-3 transition-all duration-200 px-1 pointer-events-none font-bold',
        isFocused || modelValue ? 'top-3 text-xs' : 'top-[18px] text-sm',
        isFocused ? 'text-primary bg-white' : 'text-baseText bg-gray-100',
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
  label: { type: String, required: true },
});

defineEmits(["update:modelValue"]);

const isFocused = ref(false);
</script>
