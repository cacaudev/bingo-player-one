export type ValorCampo = number | string | null;

class Campo {
  private readonly indice: number;
  private valor: ValorCampo;
  private marcado: boolean;
  private considerar: boolean;

  public constructor(
    indice: number,
    valor: ValorCampo,
    marcado: boolean = false,
    considerar = true
  ) {
    Campo.verificarIndice(indice);
    Campo.verificarValorInicial(valor);
    Campo.verificarMarcado(marcado);
    Campo.verificarConsiderar(considerar);

    this.indice = indice;
    this.valor = valor;
    this.marcado = considerar ? marcado : true;
    this.considerar = considerar;
  }

  public verificarValorFinal(): boolean {
    if (this.valor == null || this.valor === undefined) {
      return false;
    }
    return true;
  }

  private static verificarValorInicial(valor: ValorCampo): void {
    if (valor === undefined) {
      throw new Error(
        "Valor do campo final não pode ser undefined. Valores possíveis iniciais: números ou textos ou null."
      );
    }
  }

  private static verificarIndice(indice: number): void {
    if (indice == null || indice === undefined || indice < 0) {
      throw new Error("Atributo indice do campo não pode estar vazio.");
    }
  }
  private static verificarMarcado(marcado: boolean): void {
    if (marcado == null || marcado === undefined) {
      throw new Error("Atributo marcado do campo não pode estar vazio.");
    }
  }
  private static verificarConsiderar(regra: boolean): void {
    if (regra == null || regra === undefined) {
      throw new Error("Atributo considerar do campo não pode estar vazio.");
    }
  }

  /**
   * Get Functions
   */
  public getValor(): ValorCampo {
    return this.valor;
  }
  public getMarcado(): boolean {
    return this.marcado;
  }
  public getConsiderar(): boolean {
    return this.considerar;
  }
  public getIndice(): number {
    return this.indice;
  }

  /**
   * Set Functions
   */
  public atualizarValor(valor: ValorCampo) {
    Campo.verificarValorInicial(valor);
    this.valor = valor;
  }
  public atualizarMarcado(marcado: boolean) {
    Campo.verificarMarcado(marcado);
    this.marcado = marcado;
  }
  public atualizarConsiderar(regra: boolean) {
    Campo.verificarConsiderar(regra);
    this.considerar = regra;
  }
}

export default Campo;
