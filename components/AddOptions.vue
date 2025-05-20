<template>
  <div class="space-y-3">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>

    <div
      v-for="(option, index) in options"
      :key="index"
      class="flex items-center gap-2"
    >
      <FormInput v-model="options[index]" :placeholder="placeholder"/>
      <button @click="removeOption(index)" type="button">
        <img
          src="/assets/media/remove-option.svg"
          height="22"
          width="22"
          alt="remove"
        />
      </button>
    </div>

    <button
      @click="addOption"
      type="button"
      class="btn btn-success w-full"
    >
      <img src="/assets/media/charm_plus.svg" height="16" width="16"/>
      Add option
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "Options",
  },
  placeholder: {
    type: String,
    default: "Text Placeholder",
  },
  modelValue: {
    type: Array,
    default: () => [""],
  },
});

const emit = defineEmits(["update:modelValue"]);

const options = ref([...props.modelValue]);

const addOption = () => {
  options.value.push("");
  emitOptions();
};

const removeOption = (index) => {
  if (options.value.length > 1) {
    options.value.splice(index, 1);
    emitOptions();
  }
};

const emitOptions = () => {
  emit(
    "update:modelValue",
    options.value.filter((opt) => opt.trim() !== "")
  );
};

watch(
  options,
  (newVal) => {
    emitOptions();
  },
  { deep: true }
);
</script>
