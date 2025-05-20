<template>
  <Modal :show="show" @close="$emit('close')">
    <template #title>
      {{ editData ? "Edit Cart" : "Create New Cart" }}
    </template>

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
        <template v-if="editData">
          <button
            @click="showConfirm = true"
            type="button"
            class="btn btn-danger w-full"
          >
            <img src="/assets/media/trash.svg" height="16" width="16" />
            Delete
          </button>

          <button
            type="submit"
            class="btn btn-primary w-full"
            :disabled="!isFormValid"
          >
          <img src="/assets/media/save.svg" height="16" width="16" />
            Save
          </button>
        </template>

        <template v-else>
          <button
            type="submit"
            class="btn btn-primary w-full"
            :disabled="!isFormValid"
          >
            <img src="/assets/media/create.svg" height="16" width="16" />
            Create
          </button>
        </template>
      </div>
    </form>
  </Modal>

  <Modal :show="showConfirm" @close="showConfirm = false">
    <template #title>Confirm Delete</template>
    <p>Are you sure you want to delete this cart?</p>
    <div class="mt-4 flex justify-end gap-3">
      <button @click="showConfirm = false" class="btn btn-dark">Cancel</button>
      <button @click="handleDelete" class="btn btn-danger">Delete</button>
    </div>
  </Modal>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const cartStore = useCartStore();

const emit = defineEmits(["close", "submit", "delete"]);
const showConfirm = ref(false);
const { show, editData } = defineProps({
  show: Boolean,
  editData: Object,
});

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
  () => editData,
  (newData) => {
    if (newData) {
      form.value = {
        name: newData.name,
        type: newData.type,
        description: newData.description,
      };
      profileImage.value = newData.profileImage || null;
      productOptions.value = newData.productOptions
        ? newData.productOptions.map((opt) => opt.text)
        : [""];
    } else {
      resetForm();
    }
  },
  { immediate: true }
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
  if (!form.value.type) form.value.type = "default";
  if (!isFormValid.value) return;

  const dataToSubmit = {
    ...form.value,
    profileImage: profileImage.value,
    productOptions: productOptions.value
      .filter((opt) => opt.trim())
      .map((opt, idx) => ({
        text: opt,
        checked: editData?.productOptions?.[idx]?.checked ?? false,
      })),
  };

  emit("submit", dataToSubmit);
  resetForm();
  emit("close");
}
const handleDelete = () => {
  const index = cartStore.carts.findIndex((c) => c.name === editData.name);
  if (index !== -1) {
    cartStore.carts.splice(index, 1);
    localStorage.setItem("carts", JSON.stringify(cartStore.carts));
  }
  showConfirm.value = false;
  emit("close");
};
</script>
