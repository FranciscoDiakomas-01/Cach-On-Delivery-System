export class Recommendation {
  constructor(
    public readonly userId: string,
    public readonly itemId: string,
    public score: number,
  ) {}

  updateScore(value: number) {
    this.score += value;
  }
}
