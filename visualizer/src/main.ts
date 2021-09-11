import App from './components/App.svelte';
import { recursive } from './algorithms/recursive';
import { iterative } from './algorithms/iterative';

const params = new URLSearchParams(window.location.search);

function getAlgorithm() {
  return params.get('algorithm') === 'recursive' ? recursive : iterative;
}

const app = new App({
  target: document.body,
  props: {
    algorithm: getAlgorithm(),
  },
});

export default app;
