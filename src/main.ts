import App from './components/App.svelte';
import { recursive } from './algorithms/recursive';

const app = new App({
  target: document.body,
  props: {
    algorithm: recursive,
  },
});

export default app;
