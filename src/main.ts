import './app.css';
import { mount } from 'svelte';
import App from './App.svelte';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

inject({ mode: import.meta.env.DEV ? 'development' : 'production' });
injectSpeedInsights();

mount(App, { target: document.getElementById('app')! });