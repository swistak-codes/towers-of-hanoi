import type {
  Algorithm,
  AlgorithmGenerator,
  AlgorithmReturnType,
  Disc,
} from '../types';

export const iterative: Algorithm = {
  doWork: solveHanoi,
  name: 'Algorytm Idle Peg',
};

type Move = {
  source: Disc[];
  sourceName: string;
  target: Disc[];
  targetName: string;
} | null;

const idToPeg = {
  0: 'pegA',
  1: 'pegB',
  2: 'pegC',
};

const pegToId = {
  pegA: 0,
  pegB: 1,
  pegC: 2,
};

const idToPegName = {
  0: 'A',
  1: 'B',
  2: 'C',
};

function* solveHanoi(pegA: Disc[]): AlgorithmGenerator {
  const result: AlgorithmReturnType = {
    pegA: pegA,
    pegB: [],
    pegC: [],
    consoleOutput: [],
    moveCount: 0,
  };

  // spisujemy rozmiar zagadki
  const size = pegA.length;
  // obliczamy kierunek zmiany nieczynnego słupka
  const direction = (-1) ** pegA.length * 2;
  result.consoleOutput.push(`Kierunek ruchów: ${direction}`);
  let currentIdle = 0;
  result.consoleOutput.push(`Nieczynny słupek: ${idToPegName[currentIdle]}`);
  yield result;

  // wykonujemy pętlę tak długo, aż wszystkie krążki będą na docelowym słupku
  while (result.pegC.length < size) {
    // czyszczenie oznaczeń na krążkach
    result.pegA = clearIsActive(result.pegA);
    result.pegB = clearIsActive(result.pegB);
    result.pegC = clearIsActive(result.pegC);

    // obliczenie aktualnego nieczynnego słupka
    currentIdle = mod(currentIdle + direction, 3);
    result.consoleOutput.push(`Nieczynny słupek: ${idToPegName[currentIdle]}`);

    // wyciągamy pozostałe słupki
    const nonIdle = [0, 1, 2]
      .filter((x) => x !== currentIdle)
      .map((x) => idToPeg[x]);
    // pobieramy dostępny ruch
    const move = getValidMove(
      result[nonIdle[0]],
      result[nonIdle[1]],
      pegToId[nonIdle[0]],
      pegToId[nonIdle[1]],
    );

    if (move) {
      // przenosimy krążek między słupkami
      result.consoleOutput.push(
        `Przenoszę krążek ze słupka ${move.sourceName} na krążek ${move.targetName}`,
      );
      move.source[move.source.length - 1].isActive = true;
      yield result;
      move.target.push(move.source.pop());
      result.moveCount++;
    } else {
      result.consoleOutput.push('Brak poprawnego ruchu');
    }
    yield result;
  }

  return result;
}

/**
 * Funkcja wyszukująca dozwolony ruch
 * @param peg1
 * @param peg2
 * @param peg1Id
 * @param peg2Id
 */
function getValidMove(
  peg1: Disc[],
  peg2: Disc[],
  peg1Id: number,
  peg2Id: number,
): Move {
  if (
    peg1.length > 0 &&
    ((peg2.length > 0 &&
      peg2[peg2.length - 1].value > peg1[peg1.length - 1].value) ||
      peg2.length === 0)
  ) {
    return {
      source: peg1,
      target: peg2,
      sourceName: idToPegName[peg1Id],
      targetName: idToPegName[peg2Id],
    };
  }
  if (
    peg2.length > 0 &&
    ((peg1.length > 0 &&
      peg1[peg1.length - 1].value > peg2[peg2.length - 1].value) ||
      peg1.length === 0)
  ) {
    return {
      source: peg2,
      target: peg1,
      sourceName: idToPegName[peg2Id],
      targetName: idToPegName[peg1Id],
    };
  }
  return null;
}

/**
 * Funkcja czyszcząca parametr isActive
 * @param peg
 */
function clearIsActive(peg: Disc[]) {
  return peg.map((x) => ({ ...x, isActive: false }));
}

/**
 * Funkcja obliczająca resztę z dzielenia
 * @param a
 * @param b
 */
function mod(a, b) {
  let r = a % b;
  if (r < 0) {
    if (b > 0) {
      r = r + b;
    } else {
      r = r - b;
    }
  }
  return r;
}
