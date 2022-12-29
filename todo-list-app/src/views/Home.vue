<script>
import Form from "@/components/Form.vue"
import ListTodo from "./ListTodo.vue"
import { useIndexStore } from "@/stores/index"
import { mapActions } from "pinia"
export default {
  components: {
    Form,
    ListTodo
  },
  methods: {
    ...mapActions(useIndexStore, ["fetchTodos"]),
    navigate() {
      this.$router.push("/")
      this.fetchTodos()
    }
  },
}
</script>

<template>
  
  <div
    class="container mt-5 mx-auto border-8 rounded border-black flex flex-col w-1/2"
  >
    <div class="rounded shadow border border-black p-6 m-4 w-auto">
      <div class="flex justify-between">
        <div class="hover:cursor-pointer"
          @click="navigate"
        >
          <h1 class="text-4xl mt-2 font-bold ml-10">Todo List</h1>
        </div>

        <router-link
         v-if="$route.name === 'list-todo'"
          to="/form"
          class="border-4 border-black text-black rounded p-2 px-4 text-2xl mr-8 font-medium"
        >
        <i class="fa-sharp fa-solid fa-plus"></i>
      </router-link>
      </div>
    </div>
    <RouterView/>
  </div>
</template>
