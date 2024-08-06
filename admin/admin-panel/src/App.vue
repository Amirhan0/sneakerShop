<template>
  <SideBarComponent />
  <HeaderComponent />
  <div class="p-10">
    <router-view></router-view>
  </div>
</template>

<script setup>
import SideBarComponent from './components/SideBarComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import { provide, ref } from 'vue'
const openSideBar = ref(false)

const toggleSideBar = () => {
  openSideBar.value = !openSideBar.value
  console.log(openSideBar.value)
}
provide('openSideBar', openSideBar)
provide('toggleSideBar', toggleSideBar)
</script>

<style></style>
