class IndiceCampo {
  private readonly x: number;
  private readonly y: number;

  constructor(x: number, y: number) {
    this.verificarIndice(x);
    this.verificarIndice(y);

    this.x = x;
    this.y = y;
  }

  public getX(): number {
    return this.x;
  }
  public getY(): number {
    return this.y;
  }

  private verificarIndice(indice: number): void {
    if (indice == null || indice === undefined || indice < 0) {
      throw new Error("Atributo indice do campo não pode estar vazio.");
    }
  }
}

export default IndiceCampo;
