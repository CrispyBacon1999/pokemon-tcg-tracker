export type Set = {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalites: {
    standard: string;
    expanded: string;
    unlimited: string;
  };
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  }
}