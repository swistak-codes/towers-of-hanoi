export type AlgorithmGenerator = Generator<AlgorithmReturnType>;

export type Disc = {
  value: number;
  isActive: boolean;
};

export type Algorithm = {
  doWork: (pegA: Disc[]) => AlgorithmGenerator;
  name: string;
};

export type AlgorithmReturnType = {
  pegA: Disc[];
  pegB: Disc[];
  pegC: Disc[];
  consoleOutput: string[];
  moveCount: number;
};

export type DataUpdateCallback = (data: AlgorithmReturnType) => void;
