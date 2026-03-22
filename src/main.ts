import './app.css';
import { mount } from 'svelte';
import App from './App.svelte';
import { inject } from '@vercel/analytics';

// Analytics — usa import.meta.env.DEV do Vite (não $app/environment do SvelteKit)
inject({ mode: import.meta.env.DEV ? 'development' : 'production' });

mount(App, { target: document.getElementById('app')! });