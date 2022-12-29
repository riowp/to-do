<script>
import { mapActions } from "pinia";
import { useIndexStore } from "@/stores/index";
import Swal from "sweetalert2";
export default {
  props: ["todo"],
  emits: ["deleteTodo"],
  methods: {
    ...mapActions(useIndexStore, ["getDataById", "editStatus"]),
    navigateEdit() {
      this.$router.push({
        name: "edit-form",
        params: {
          id: this.todo.id,
        },
        props: {
          populateData: this.todo,
        },
      });
    },
    async changeStatus(id) {
      try {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your todo has been Completed.",
        });
        await this.editStatus({
          id: id,
          status: "completed",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<template>
  <div class="rounded border-black shadow border p-6 m-4 w-auto flex flex-col">
    <div class="w-auto bg-gray-200 p-3 rounded">
      <h1 class="text-center font-serif text-2xl">{{ todo.title }}</h1>
    </div>
    <div class="mt-2">
      <p class="font-serif ml-1">{{ todo.description }}</p>
    </div>
    <div class="flex justify-between mt-4">
      <div>
        <h2
          v-if="todo.status === 'completed'"
          class="border-2 border-blue-500 px-2 rounded-lg font-bold text-blue-500"
        >
          {{ todo.status }}
        </h2>
        <h2
          v-else
          class="border-2 border-red-500 px-2 rounded-lg font-bold text-red-500"
        >
          {{ todo.status }}
        </h2>
      </div>
      <div class="">
        <button
          v-if="todo.status !== 'completed'"
          @click="changeStatus(todo.id)"
          class="border border-black rounded px-2 text-black-500 text-md font-semibold"
        >
          <i class="fa-regular fa-square-check"></i>
        </button>
        <button
          v-if="todo.status !== 'completed'"
          @click="navigateEdit"
          class="border mx-2 border-black rounded px-2 text-black-500 text-md font-semibold"
        >
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          @click="$emit('deleteTodo', todo.id)"
          class="border border-black rounded px-2 text-black-500 text-md font-semibold"
        >
          <i class="fa-sharp fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>
