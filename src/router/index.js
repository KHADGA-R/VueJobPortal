import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobsView from "@/views/jobsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import JobView from "@/views/JobView.vue";
import AddJobView from "@/views/AddJobView.vue";
import EditJobView from "@/views/EditJobView.vue";
import Login from "@/components/Login.vue"; 
import Register from "@/components/Register.vue";


const router = createRouter ({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true }
        },

        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { requiresAuth: false }
        },

        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: { requiresAuth: false }
        },

        {
            path: '/jobs',
            name: 'jobs',
            component: JobsView,
            meta: { requiresAuth: true }
        },

        {
            path: '/jobs/:id',
            name: 'job',
            component: JobView,
            meta: { requiresAuth: true }
            
        },

        {
            path: '/jobs/add',
            name: 'add-job',
            component: AddJobView,
            meta: { requiresAuth: true }

        },

        { 
            path: '/jobs/edit/:id',
            name: 'edit-job',
            component: EditJobView,
            meta: { requiresAuth: true }
        },

        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: NotFoundView
        },
    ],
});

//Navigation gaurd
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (to.meta.requiresAuth && !isAuthenticated) {
        // Redirect to login page if not authenticated
        next('/login');
    } else if (to.path === '/login' && isAuthenticated) {
        // Redirect to home page if already authenticated
        next('/');
    } else {
        // Continue to the requested route
        next();
    }
});


export default router;