import { derived, writable } from 'svelte/store';
import type { Disc } from './types';

export const pegA = writable<Disc[]>([]);
export const pegB = writable<Disc[]>([]);
export const pegC = writable<Disc[]>([]);

export const movesCount = writable(0);
export const console = writable<string[]>([]);

export const isIterationFinished = writable(false);
export const isFreshData = writable(true);

export const isDataPresent = derived(
  [pegA, pegB, pegC],
  ([$pegA, $pegB, $pegC]) =>
    $pegA.length > 0 || $pegB.length > 0 || $pegC.length > 0,
);
export const canExecuteIteration = derived(
  [isIterationFinished, isDataPresent],
  ([$isIterationFinished, $isDataPresent]) =>
    !$isIterationFinished && $isDataPresent,
);
