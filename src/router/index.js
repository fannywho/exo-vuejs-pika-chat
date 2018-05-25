import Vue from 'vue';
import Router from 'vue-router';

import Index from '../views/Index.vue';
import Profile from '../views/Profile.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import trakt from '../views/trakt.vue';

Vue.use(Router);

import { firebaseApp } from '../../firebase.config';

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresAno: true
      }
    },
    {
      path: '/sign-up',
      name: 'Sign up',
      component: SignUp
    },
    {
      path: '/home',
      name: 'Home',
      component: Index,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/trakt',
      name: 'trakt',
      component: trakt
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebaseApp.auth().currentUser) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAno)) {
    if (firebaseApp.auth().currentUser && (to.name === 'Login' || to.name === 'Sign Up' )) {
      next({
        path: '/home',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router;
