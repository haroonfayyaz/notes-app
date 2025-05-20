<template>
  <div class="relative w-full">
    <button
      type="button"
      @click="toggleDropdown"
      class="w-full text-left border border-gray-100 rounded-2xl px-4 pt-6 pb-2 focus:outline-none focus:shadow-[0px_0px_8px_0px_rgba(0,_122,_255,_0.5)] focus:border focus:border-primary focus:ring-primary-500 h-14 bg-gray-100"
      :class="{ 'border border-primary !bg-white': selectedOption }"
    >
      <span class="block truncate text-sm">
        {{ selectedOption?.label }}
      </span>
      <span class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <svg
          class="h-5 w-5 text-baseText"
          :class="{ 'transform rotate-180': isOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </button>

    <label
      :class="[
        'absolute left-3 transition-all duration-200 px-1 pointer-events-none font-bold',
        isOpen || selectedOption ? 'top-2 text-xs text-primary' : 'top-[18px] text-sm text-baseText'
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
        class="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <li
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-primary-50"
          :class="{ 'bg-primary-100': isSelected(option) }"
        >
          <span class="block truncate" :class="{ 'font-medium': isSelected(option) }">
            {{ option.label }}
          </span>
          <span v-if="isSelected(option)" class="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
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
    validator: (value) => value.every((option) => "value" in option && "label" in option)
  }
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedOption = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  emit("update:modelValue", option.value);
  isOpen.value = false;
};

const isSelected = (option) => selectedOption.value?.value === option.value;

const clickOutsideHandler = (event) => {
  if (!event.target.closest(".relative")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", clickOutsideHandler);
  if (props.modelValue) {
    selectedOption.value = props.options.find((opt) => opt.value === props.modelValue);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", clickOutsideHandler);
});

watch(() => props.modelValue, (newValue) => {
  selectedOption.value = props.options.find((opt) => opt.value === newValue);
});
</script>
