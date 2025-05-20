<template>
  <div class="w-full">
    <div v-if="file" class="relative w-full mx-auto">
      <img
        :src="previewUrl"
        alt="Uploaded preview"
        class="w-full rounded-2xl object-cover aspect-[3/1.14]"
      />
      <button
        type="button"
        @click="removeFile"
        class="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
      >
        <svg
          class="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <div
      v-else
      @click="openFilePicker"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
      class="border border-primary bg-primary/5 rounded-2xl p-6 text-center cursor-pointer transition-colors"
      :class="{
        'opacity-50': isDragging,
      }"
    >
      <div class="flex flex-col items-center justify-center">
        <img
          src="/assets/media/upload.svg"
          height="40"
          width="40"
          alt="upload"
          class="mb-4"
        />
        <p class="text-sm text-baseText">
          <span class="font-medium text-primary">Click to upload</span>
          or drag and drop <br />SVG, PNG, JPG or GIF
        </p>
      </div>
    </div>

    <input
      ref="fileInput"
      type="file"
      class="hidden"
      :accept="accept"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  accept: {
    type: String,
    default: "image/*",
  },
  modelValue: {
    type: [File, String, null],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const fileInput = ref(null);
const isDragging = ref(false);
const file = ref(null);
const previewUrl = ref(null);

const openFilePicker = () => {
  fileInput.value.click();
};

const handleFileChange = (e) => {
  const selected = e.target.files[0];
  if (selected) {
    file.value = selected;
    previewUrl.value = URL.createObjectURL(selected);
    emit("update:modelValue", file.value);
  }
};

const handleDrop = (e) => {
  isDragging.value = false;
  const dropped = e.dataTransfer.files[0];
  if (dropped) {
    file.value = dropped;
    previewUrl.value = URL.createObjectURL(dropped);
    emit("update:modelValue", file.value);
  }
};

const removeFile = () => {
  if (previewUrl.value && file.value instanceof File) {
    URL.revokeObjectURL(previewUrl.value);
  }
  file.value = null;
  previewUrl.value = null;
  fileInput.value.value = null;
  emit("update:modelValue", null);
};

watch(file, (newFile, oldFile) => {
  if (oldFile instanceof File && previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
});

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal instanceof File) {
      file.value = newVal;
      previewUrl.value = URL.createObjectURL(newVal);
    } else if (typeof newVal === "string") {
      file.value = null;
      previewUrl.value = newVal;
    } else {
      file.value = null;
      previewUrl.value = null;
    }
  },
  { immediate: true }
);
</script>
