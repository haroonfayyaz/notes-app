<template>
  <div class="space-y-3">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>

    <div
      v-for="(option, index) in options"
      :key="index"
      class="flex items-center gap-2"
    >
      <FormInput
        v-model="options[index]"
        :placeholder="placeholder"
        class="flex-1"
      />
      <button @click="removeOption(index)" type="button">
        <img
          src="/assets/media/remove-option.svg"
          height="22"
          width="22"
          alt="remove"
        />
      </button>
    </div>

    <button @click="addOption" type="button" class="btn btn-success w-full">
      <img src="/assets/media/charm_plus.svg" height="16" width="16" />
      Add option
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

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

const options = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const addOption = () => {
  options.value = [...options.value, ""];
};

const removeOption = (index) => {
  if (options.value.length > 1) {
    const updated = [...options.value];
    updated.splice(index, 1);
    options.value = updated;
  }
};
</script>
