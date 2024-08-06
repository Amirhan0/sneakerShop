<template>
  <div class="p-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold">Управление товарами</h1>
      <button @click="showModal = true" class="btn btn-primary mt-4">Добавить новый товар</button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        class="card bg-white shadow-md rounded-lg overflow-hidden"
        v-for="product in products"
        :key="product.id"
      >
        <img :src="`${product.imageUrl}`" alt="Product Image" class="w-full h-48 object-cover" />

        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">{{ product.title }}</h3>
          <p class="text-gray-600 mb-2">ID: {{ product.id }}</p>
          <div class="flex items-center justify-between">
            <span class="text-xl font-bold text-green-500">{{ product.price }}</span>
            <div class="flex gap-2">
              <button class="btn btn-secondary" @click="editProduct(product)">Редактировать</button>
              <button class="btn btn-error" @click="deleteProduct(product.id)">Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="modal">
      <div class="modal-mask" v-if="showModal">
        <div class="modal-container">
          <h2 class="text-xl font-bold mb-4">Добавить новый товар</h2>
          <form @submit.prevent="addProduct">
            <div class="mb-4">
              <label for="title" class="block text-gray-700">Название</label>
              <input
                v-model="newProduct.title"
                type="text"
                id="title"
                class="form-input mt-1 w-full"
              />
            </div>
            <div class="mb-4">
              <label for="price" class="block text-gray-700">Цена</label>
              <input
                v-model="newProduct.price"
                type="number"
                id="price"
                class="form-input mt-1 w-full"
              />
            </div>
            <div class="mb-4">
              <label for="imageUrl" class="block text-gray-700">URL изображения</label>
              <input
                v-model="newProduct.imageUrl"
                type="text"
                id="imageUrl"
                class="form-input mt-1 w-full"
              />
            </div>
            <div class="flex justify-end">
              <button @click="showModal = false" class="btn btn-secondary mr-2">Закрыть</button>
              <button type="submit" class="btn btn-primary">Добавить</button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <transition name="modal">
      <div class="modal-mask" v-if="showEditModal">
        <div class="modal-container">
          <h2 class="text-xl font-bold mb-4">Редактировать товар</h2>
          <form @submit.prevent="updateProduct">
            <div class="mb-4">
              <label for="editTitle" class="block text-gray-700">Название</label>
              <input
                v-model="editingProduct.title"
                type="text"
                id="editTitle"
                class="form-input mt-1 w-full"
              />
            </div>
            <div class="mb-4">
              <label for="editPrice" class="block text-gray-700">Цена</label>
              <input
                v-model="editingProduct.price"
                type="number"
                id="editPrice"
                class="form-input mt-1 w-full"
              />
            </div>
            <div class="mb-4">
              <label for="editImageUrl" class="block text-gray-700">URL изображения</label>
              <input
                v-model="editingProduct.imageUrl"
                type="text"
                id="editImageUrl"
                class="form-input mt-1 w-full"
              />
            </div>
            <div class="flex justify-end">
              <button @click="showEditModal = false" class="btn btn-secondary mr-2">Закрыть</button>
              <button type="submit" class="btn btn-primary">Сохранить</button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const products = ref([])
const showEditModal = ref(false)
const editingProduct = ref(null)
const showModal = ref(false)
const newProduct = ref({
  title: '',
  price: '',
  imageUrl: ''
})

const productInformation = async () => {
  try {
    const response = await axios.get('https://269b3b45e08bcd1a.mokky.dev/items')
    products.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const addProduct = async () => {
  try {
    await axios.post('https://269b3b45e08bcd1a.mokky.dev/items', newProduct.value)
    products.value.push(newProduct.value)
    showModal.value = false
    newProduct.value = { title: '', price: '', imageUrl: '' }
  } catch (error) {
    console.log(error)
  }
}

const updateProduct = async () => {
  try {
    await axios.patch(
      `https://269b3b45e08bcd1a.mokky.dev/items/${editingProduct.value.id}`,
      editingProduct.value
    )
    const index = products.value.findIndex((product) => product.id === editingProduct.value.id)
    products.value[index] = editingProduct.value
    showEditModal.value = false
    editingProduct.value = null
  } catch (error) {
    console.log(error)
  }
}

const deleteProduct = async (productId) => {
  try {
    await axios.delete(`https://269b3b45e08bcd1a.mokky.dev/items/${productId}`)
    products.value = products.value.filter((product) => product.id !== productId)
  } catch (error) {
    console.log(error)
  }
}

const editProduct = (product) => {
  editingProduct.value = { ...product }
  showEditModal.value = true
}
onMounted(() => {
  productInformation()
})
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.form-input {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-error {
  background-color: #dc3545;
  color: white;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
