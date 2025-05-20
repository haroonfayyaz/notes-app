<template>
  <div class="flex items-center justify-between w-full">
    <h1 class="text-lg font-bold">Title</h1>
    <div class="flex gap-4 items-center">
      <FilterDropdown
        :options="filterOptions"
        v-model="selectedFilters"
        :enable-search="false"
        :show-clear-button="false"
        :show-action-buttons="false"
        @apply="handleFilterApply"
      />
      <slot/>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import FilterDropdown from "./FilterDropdown.vue";

const emit = defineEmits(["filter-change"]);

const filterOptions = [
  { value: "all", label: "All" },
  { value: "default", label: "Default" },
  { value: "image", label: "Image" },
  { value: "checkbox", label: "Checkbox" },
];

const selectedFilters = ref([]);

watch(selectedFilters, (newVal) => {
  emit("filter-change", newVal);
});
</script>

