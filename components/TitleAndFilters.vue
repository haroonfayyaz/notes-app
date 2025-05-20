<template>
  <div class="flex items-center justify-between">
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
      <button class="btn btn-primary" @click="showModal = true">
        <img
          src="/assets/media/charm_plus.svg"
          height="16"
          width="16"
          alt="plus"
        />
        Add New
      </button>
    </div>

    <AddNewModal
      :show="showModal"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FilterDropdown from "./FilterDropdown.vue";
import AddNewModal from "./AddNewModal.vue";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "type_1", label: "Type 1" },
  { value: "type_2", label: "Type 2" },
  { value: "type_3", label: "Type 3" },
];

const selectedFilters = ref([]);
const showModal = ref(false);

const handleFilterApply = (filters) => {
  console.log("Applied filters:", filters);
};

</script>
