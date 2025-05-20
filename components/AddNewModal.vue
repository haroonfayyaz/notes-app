<template>
  <Modal :show="show" @close="$emit('close')">
    <template #title> Create New Cart </template>

    <form @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <FloatingLabelSelect
          v-model="form.type"
          label="Select type of cart"
          :options="[
            { value: 'default', label: 'Default Cart Style' },
            { value: 'image', label: 'Image Cart Style' },
            { value: 'checkbox', label: 'Checkbox Cart Style' },
          ]"
          required
        />
        <FloatingLabelInput v-model="form.name" label="Name" required />

        <FileUpload
          v-if="form.type === 'image'"
          accept="image/*"
          v-model="profileImage"
          required
        />

        <!-- Show AddOptions only if type is 'checkbox' -->
        <AddOptions
          v-if="form.type === 'checkbox'"
          label="Product Options"
          placeholder="Enter option"
          v-model="productOptions"
          required
        />

        <FloatingLabelTextarea
          v-model="form.description"
          label="Description"
          required
        />
      </div>

      <div
        class="mt-4 pt-4 border-t-2 border-dashed flex justify-end space-x-3"
      >
        <button
          type="submit"
          class="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isFormValid"
        >
          <img
            src="/assets/media/create.svg"
            height="16"
            width="16"
            alt="create doc"
          />
          Create
        </button>
      </div>
    </form>
  </Modal>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

defineProps({
  show: Boolean,
});

const emit = defineEmits(["close", "submit"]);

const form = ref({
  name: "",
  type: "",
  description: "",
});
const profileImage = ref(null);
const productOptions = ref([""]);

const isFormValid = computed(() => {
  if (!form.value.name || !form.value.description) {
    return false;
  }

  if (form.value.type === "image" && !profileImage.value) {
    return false;
  }

  if (
    form.value.type === "checkbox" &&
    (productOptions.value.length === 0 ||
      productOptions.value.some((opt) => !opt.trim()))
  ) {
    return false;
  }

  return true;
});

watch(
  () => form.value.type,
  (newType, oldType) => {
    if (newType !== oldType) {
      form.value.name = "";
      form.value.description = "";
      profileImage.value = null;
      productOptions.value = [""];
    }
  }
);

function resetForm() {
  form.value = {
    name: "",
    type: "",
    description: "",
  };
  profileImage.value = null;
  productOptions.value = [""];
}

function handleSubmit() {
  if (!isFormValid.value) return;

  const dataToSubmit = {
    ...form.value,
    profileImage: profileImage.value
      ? URL.createObjectURL(profileImage.value)
      : null,
    productOptions: productOptions.value.filter((opt) => opt.trim() !== ""),
  };

  cartStore.addCart(dataToSubmit);

  emit("submit", dataToSubmit);
  resetForm();
  emit("close");
}
</script>
