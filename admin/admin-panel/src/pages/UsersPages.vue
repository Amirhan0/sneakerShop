<template>
  <div class="p-6">
    <!-- Users Section -->
    <section id="users" class="mt-8">
      <h2 class="text-xl font-bold mb-4">Пользователи</h2>
      <table class="table-auto w-full border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 p-2">ID</th>
            <th class="border border-gray-300 p-2">Имя</th>
            <th class="border border-gray-300 p-2">Электронная почта</th>
            <th class="border border-gray-300 p-2">Дата регистрации</th>
            <th class="border border-gray-300 p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 p-2">1</td>
            <td class="border border-gray-300 p-2">Иван Иванов</td>
            <td class="border border-gray-300 p-2">ivan@example.com</td>
            <td class="border border-gray-300 p-2">2024-01-01</td>
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
