<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    type="text"
    :placeholder="placeholder"
    class="flex-1 rounded-2xl text-sm px-3 h-12 focus:outline-none border focus:shadow-[0px_0px_8px_0px_rgba(0,_122,_255,_0.5)] border-gray-100 focus:border focus:border-primary bg-gray-100"
  />
</template>

<script setup>
defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: "Text Placeholder",
  },
});

defineEmits(["update:modelValue"]);
</script>
