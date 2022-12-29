import axios from 'axios'
import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', {
  state: () => ({
    baseUrl: `http://localhost:3000/Todo`,
    todos: [],
    todo: {}
  }),
  actions: {
    async fetchTodos(title, item, status) {
      try {
        const {data} = await axios({
          url: this.baseUrl,
          method: 'GET',
          params: {
            title_like: title ? title : '',
            q: item ? item : '',
            status: status === "all" ? null : status
          }
        })
        console.log(data)
        this.todos = data
      } catch (err) {
        console.log(err)
      }
    },
    async addTodo(payload) {
      try {
          await axios({
          url: this.baseUrl,
          method: 'POST',
          data: {
            title: payload.title,
            description: payload.description,
            status: "incomplete"
          }
        })
        this.fetchTodos()
      } catch (err) {
        console.log(err)
      }
    },
    async getDataById(payload) {
      try {
        const {data} = await axios({
          url: `${this.baseUrl}/${payload.id}`,
          method: 'GET',
        })
        console.log(data)
        this.todo = data
      } catch (err) {
        console.log(err)
      }
    },
    resetTodo() {
      this.todo = {}
    },
    async updateTodo(payload) {
      try {
        await axios({
          url: `${this.baseUrl}/${payload.id}`,
          method: 'PUT',
          data: {
            title: payload.title,
            description: payload.description,
            status: 'incomplete'
          }
        })
        this.fetchTodos()
      } catch (err) {
        console.log(err)
      }
    },
    async editStatus(payload) {
      try {
        await axios({
          url: `${this.baseUrl}/${payload.id}`,
          method: 'PATCH',
          data: {
            status: payload.status
          }
        })
        this.fetchTodos()
      } catch (err) {
        console.log(err)
      }
    }
  },
})
