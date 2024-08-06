<template>
  <div class="p-6">
    <section id="orders" class="mt-8">
      <h2 class="text-xl font-bold mb-4">Заказы</h2>
      <table class="table-auto w-full border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 p-2">ID</th>
            <th class="border border-gray-300 p-2">Клиент</th>
            <th class="border border-gray-300 p-2">Сумма</th>
            <th class="border border-gray-300 p-2">Дата</th>
            <th class="border border-gray-300 p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          <!-- Example Order Row -->
          <tr>
            <td class="border border-gray-300 p-2">1</td>
            <td class="border border-gray-300 p-2">Петр Петров</td>
            <td class="border border-gray-300 p-2">$100</td>
            <td class="border border-gray-300 p-2">2024-08-01</td>
            <td class="border border-gray-300 p-2">
              <button class="btn btn-secondary mr-2">Редактировать</button>
              <button class="btn btn-error">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup></script>

<style scoped></style>
