<template>
  <div class="p-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold">Управление товарами</h1>
      <button class="btn btn-primary mt-4">Добавить новый товар</button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="card bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src="https://via.placeholder.com/300"
          alt="Product Image"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">Название товара</h3>
          <p class="text-gray-600 mb-2">Краткое описание товара.</p>
          <div class="flex items-center justify-between">
            <span class="text-xl font-bold text-green-500">$99.99</span>
            <div class="flex gap-2">
              <button class="btn btn-secondary">Редактировать</button>
              <button class="btn btn-error">Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
