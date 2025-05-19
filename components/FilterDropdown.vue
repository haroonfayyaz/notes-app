<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      class="btn btn-dark flex items-center gap-2"
      role="button"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
    >
      Filter
      <img src="/assets/media/filter.svg" height="16" width="16" alt="Filter" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 min-w-[118px] bg-white rounded-2xl shadow-sm z-10"
      role="listbox"
    >
      <div class="rounded-2xl overflow-hidden">
        <div class="max-h-60 overflow-y-auto">
          <div
            v-for="option in options"
            :key="option.value"
            class="flex items-center p-3 border-b-[0.5px] cursor-pointer transition-colors"
            :class="optionClass(option.value)"
            @click="toggleOption(option.value)"
            role="option"
            :aria-selected="isSelected(option.value)"
          >
            <input
              type="checkbox"
              :checked="isSelected(option.value)"
              class="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500 mr-3"
              @click.stop
            />
            <span class="text-sm text-gray-700">{{ option.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    validator: (value) =>
      value.every((option) => typeof option === "object" && "value" in option && "label" in option),
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const dropdownRef = ref(null);

const selectedOptions = computed({
  get: () => [...props.modelValue],
  set: (value) => emit("update:modelValue", value),
});

const isSelected = (value) => selectedOptions.value.includes(value);
const optionClass = (value) => isSelected(value) ? "bg-primary-100" : "bg-white";

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const toggleOption = (value) => {
  const newOptions = [...selectedOptions.value];
  const index = newOptions.indexOf(value);

  if (index === -1) {
    newOptions.push(value);
  } else {
    newOptions.splice(index, 1);
  }

  selectedOptions.value = newOptions;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
