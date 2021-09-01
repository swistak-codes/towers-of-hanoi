import type {
  Algorithm,
  AlgorithmGenerator,
  AlgorithmReturnType,
  Disc,
} from '../types';

export const recursive: Algorithm = {
  doWork: solveHanoi,
  name: 'Algorytm rekurencyjny',
};

type Peg = {
  name: 'A' | 'B' | 'C';
  contents: Disc[];
};

let moveCount = 0;

function* solveHanoi(pegA: Disc[]): AlgorithmGenerator {
  let result: AlgorithmReturnType = {
    pegA: pegA,
    pegB: [],
    pegC: [],
    consoleOutput: [],
    moveCount: 0,
  };
  moveCount = 0;
  yield* recursiveSolve(
    pegA.length,
    { contents: pegA, name: 'A' },
    { contents: [], name: 'B' },
    { contents: [], name: 'C' },
    result,
  );
}

function* recursiveSolve(
  n: number,
  a: Peg,
  b: Peg,
  c: Peg,
  result: AlgorithmReturnType,
): AlgorithmGenerator {
  // jeżeli zeszliśmy rekurencyjnie do n == 0, to przerywamy schodzenie w głąb
  if (n === 0) {
    result.consoleOutput.push('Zakończenie wywołań rekurencyjnych (n == 0)');
    yield generateResult(
      [clearIsActive(a), clearIsActive(b), clearIsActive(c)],
      result,
    );
    return;
  }

  if (n > 1) {
    // zaznaczamy interesujące nas w tej iteracji dyski
    for (let i = 1; i <= n; i++) {
      a.contents[a.contents.length - i].isActive = true;
    }
    yield generateResult([a, b, c], result);
  }

  // wywołujemy rekurencyjnie funkcję z kolejnością słupków A C B (przenoszenie z A na B)
  result.consoleOutput.push(
    `Wywołanie rekurencyjne, kolejność ${a.name} ${c.name} ${b.name}`,
  );
  yield* recursiveSolve(
    n - 1,
    clearIsActive(a),
    clearIsActive(c),
    clearIsActive(b),
    generateResult([a, c, b], result),
  );

  // przenosimy krążek z A na C
  result.consoleOutput.push(
    `Przenoszę krążek ze słupka ${a.name} na krążek ${c.name}`,
  );
  a.contents[a.contents.length - 1].isActive = true;
  yield generateResult([a, b, c], result);
  c.contents.push(a.contents.pop());
  moveCount++;
  yield generateResult([a, b, c], result);

  // wywołujemy rekurencyjnie funkcję z kolejnością słupków B A C (przenoszenie z B na C)
  result.consoleOutput.push(
    `Wywołanie rekurencyjne, kolejność ${b.name} ${a.name} ${c.name}`,
  );
  yield* recursiveSolve(
    n - 1,
    clearIsActive(b),
    clearIsActive(a),
    clearIsActive(c),
    generateResult([b, a, c], result),
  );
}

/**
 * Funkcja mapująca aktualny zapis słupków do wyniku przedstawianego na rysunku
 * @param pegs
 * @param result
 */
function generateResult(pegs: Peg[], result: AlgorithmReturnType) {
  return {
    ...result,
    moveCount: moveCount,
    pegA: pegs.find((x) => x.name === 'A').contents,
    pegB: pegs.find((x) => x.name === 'B').contents,
    pegC: pegs.find((x) => x.name === 'C').contents,
  };
}

/**
 * Funkcja czyszcząca parametr isActive
 * @param peg
 */
function clearIsActive(peg: Peg) {
  peg.contents.forEach((x) => (x.isActive = false));
  return {
    name: peg.name,
    contents: peg.contents,
  };
}
