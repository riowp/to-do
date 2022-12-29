<script>
import { mapState, mapActions } from "pinia";
import TodoCard from "@/components/TodoCard.vue";
import { useIndexStore } from "@/stores/index";
import axios from "axios";
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      searchTitle: "",
      searchItem: "",
      searchStatus: "",
    }
  },
  components: {
    TodoCard,
  },
  computed: {
    ...mapState(useIndexStore, ["todos"]),
  },
  methods: {
    ...mapActions(useIndexStore, ["fetchTodos"]),
    async deleteTodo(id) {
      try {
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your todo has been deleted.',
        })
        await axios({
          method: "DELETE",
          url: `http://localhost:3000/Todo/${id}`,
        })
        this.fetchTodos()
      } catch (err) {
        console.log(err)
      }
    },
    searchTodo() {
      this.fetchTodos(this.searchTitle, this.searchItem, this.searchStatus)
      console.log(this.searchStatus)
      this.searchTitle = ""
      this.searchItem = ""
    },
  }
};
</script>

<template>
  <div class="flex justify-around">
    <div>
      <input
        v-model="searchTitle"
        type="text"
        class="border border-black rounded ml-4 mr-2"
        placeholder="Search by Title.."
      />
      <button 
      @click="searchTodo"
      class="border border-black rounded px-2"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
    <div>
      <input
        v-model="searchItem"
        type="text"
        class="border border-black rounded ml-4 mr-2"
        placeholder="Search by Item.."
      />
      <button 
      @click="searchTodo"
      class="border border-black rounded px-2"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
    <div>
      <select
        @change="searchTodo"
        v-model="searchStatus"
        class="border border-black mr-4 rounded"
        name="status"
        id="status"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  </div>
  <!-- bates lagi -->
  <!-- card start -->
  <div
  v-if="todos.length === 0"
  >
  <h1 class="text-center text-4xl font-bold my-6"> --No Activity--</h1>
  </div>
  <TodoCard
  v-else
  v-for="todo in todos" 
  :key="todo.id"
  :todo="todo" 
  @deleteTodo="deleteTodo"
  />


</template>
