<template>
  <div class="relative w-full">
    <button
      type="button"
      @click="toggleDropdown"
      class="form-input !pt-6 h-14 bg-gray-100"
      :class="{ 'border border-primary': selectedOption }"
    >
      <span class="block truncate text-sm text-start">
        {{ selectedOption?.label }}
      </span>
      <span
        class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"
      >
        <svg
          class="h-5 w-5 text-baseText"
          :class="{ 'transform rotate-180': isOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </span>
    </button>

    <label
      :class="[
        'absolute left-3 transition-all duration-200 px-1 pointer-events-none font-bold',
        isFocused || modelValue ? 'top-2 text-xs' : 'top-[18px] text-sm',
        isFocused ? 'text-primary' : 'text-baseText',
      ]"
    >
      {{ label }}
    </label>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <ul
        v-if="isOpen"
        class="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-2xl bg-white shadow-xl focus:outline-none"
      >
        <li
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="relative cursor-default select-none p-4 hover:bg-primary-50 text-sm hover:bg-primary-100 cursor-pointer"
          :class="{ 'bg-primary-100': isSelected(option) }"
        >
          <span
            class="block truncate"
          >
            {{ option.label }}
          </span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: [String, Number],
  label: { type: String, required: true },
  options: {
    type: Array,
    required: true,
    validator: (value) =>
      value.every((option) => "value" in option && "label" in option),
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const isFocused = ref(false);
const selectedOption = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  isFocused.value = isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  emit("update:modelValue", option.value);
  isOpen.value = false;
  isFocused.value = false;
};

const isSelected = (option) => selectedOption.value?.value === option.value;

const clickOutsideHandler = (event) => {
  if (!event.target.closest(".relative")) {
    isOpen.value = false;
    isFocused.value = false; 
  }
};

onMounted(() => {
  document.addEventListener("click", clickOutsideHandler);
  if (props.modelValue) {
    selectedOption.value = props.options.find(
      (opt) => opt.value === props.modelValue
    );
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", clickOutsideHandler);
});

watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value = props.options.find((opt) => opt.value === newValue);
  }
);
</script>
