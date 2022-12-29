<script>
import { useIndexStore } from "@/stores/index";
import { mapActions, mapState } from "pinia";
import Swal from 'sweetalert2'
export default {
  computed: {
    ...mapState(useIndexStore, ["todo"]),
  },
  data() {
    return {
      data: {
        title: "",
        description: "",
      },
      Head : "Add New Todo Item"
    };
  },
  watch: {
    todo(newData) {
      this.data.title = newData.title;
      this.data.description = newData.description;
    },
  },
  created() {
    if (this.$route.name === "edit-form") {
      this.Head = "Edit Todo Item"
      this.getDataById(this.$route.params);
    } else {
      this.resetTodo();
    }

  },
  methods: {
    ...mapActions(useIndexStore, ["addTodo", "getDataById", "resetTodo", "updateTodo"]),
    submit() {
      if (this.$route.name === "edit-form") {
        this.updateTodo({
          id: this.$route.params.id,
          title: this.data.title,
          description: this.data.description,
        });
      } else {
        this.addTodo({
          title: this.data.title,
          description: this.data.description,
        });
      }
      this.data.title = "";
      this.data.description = "";
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <div class="border mx-4 rounded border-black mb-4">
    <div class="ml-4 my-6">
      <h1 class="text-2xl font-semibold">{{Head}}</h1>
    </div>
    <form @submit.prevent="submit">
      <div class="mx-4">
        <label
          for="small-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Title</label
        >
        <input
          v-model="data.title"
          type="text"
          id="small-input"
          class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="my-6 mx-4">
        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Description</label
        >
        <textarea
          v-model="data.description"
          id="message"
          rows="4"
          class="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>
      <div class="flex justify-end mr-5">
        <router-link
          to="/"
          class="border-2 border-black bg-white rounded px-2 text-xl mb-2 font-bold text-black"
        >
          Cancel
        </router-link>
        <button
          class="border-2 border-black mx-2 rounded px-2 text-xl mb-2 font-bold bg-black text-white"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
