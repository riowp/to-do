import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Form from '../components/Form.vue'
import ListTodo from '../views/ListTodo.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'edit-form/:id',
          name: 'edit-form',
          component: Form,
        },
        {
          path: '',
          name: 'list-todo',
          component: ListTodo
        },
        {
          path: 'form',
          name: 'form',
          component: Form
        }
      ]
    },
  ]
})

export default router
