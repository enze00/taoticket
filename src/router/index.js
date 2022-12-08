import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/views/Index";
import Login from "@/views/Login";
import Main from "@/views/Main";
import Test from "@/views/Test";
Vue.use(VueRouter)

const routes = [
  {
    path: '/seat_order_temp',
    name: 'SeatOrderTemp',
    component: () => import('../views/Order/SeatOrderTemp'),
    props:  route => ({
      film_times_id: route.query.film_times_id
    })
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/movies',
        name: 'Movies',
        component: () => import('../views/Movies/Movies'),
        children: [
          {
            path: '/movies_info',
            name: 'MoviesInfo',
            component: () => import('../views/Movies/MoviesInfo')
          },
          {
            path: '/movies_detail',
            name: 'MoviesDetail',
            component: () => import('../views/Movies/MoviesDetail'),
            props:  route => ({
              film_id: route.query.film_id,
            })
          },
          {
            path: '/movies_temp',
            name: 'MoviesTemp',
            component: () => import('../views/Movies/MoviesTemp'),
            props:  route => ({
              film_id: route.query.film_id,
            })
          },
          {
            path: '/pay_order',
            name: 'PayOrder',
            component: () => import('../views/Order/PayOrder'),
            props:  route => ({
              telephone: route.query.telephone,
              film_times_id: route.query.film_times_id,
              actual_money: route.query.actual_money,
              order_temp_id: route.query.order_temp_id
            })
          },
        ]
      },
      {
        path: '/cinema',
        name: 'Cinema',
        component: () => import('../views/Cinema/Cinema'),
        children: [
          {
            path: '/cinema_info',
            name: 'CinemaInfo',
            component: () => import('../views/Cinema/CinemaInfo'),
          },
          {
            path: '/cinema_detail',
            name: 'CinemaDetail',
            component: () => import('../views/Cinema/CinemaDetail'),
            props:  route => ({
              cinema_id: route.query.cinema_id,
            })
          },
          {
            path: '/seat_order',
            name: 'SeatOrder',
            component: () => import('../views/Order/SeatOrder'),
            props:  route => ({
              film_times_id: route.query.film_times_id
            })
          },
        ]
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
