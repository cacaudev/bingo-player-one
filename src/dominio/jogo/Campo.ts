class Campo  {
  private valor: number | string | null;
  private marcado: boolean;

  public constructor(valor: number | string | null, marcado: boolean = false) {
    Campo.verificarMarcado(marcado);
    this.valor = valor;
    this.marcado = marcado;
  }

  protected static verificarValorFinal(valor: number | string | null): void {
    if (valor == null || valor == "" || valor === undefined) {
      throw new Error(
        "Valor do campo final não pode estar vazio. Valores possíveis finais: números ou textos."
      );
    }
  }
  private static verificarValorInicial(valor: number | string | null): void {
    if (valor === undefined) {
      throw new Error(
        "Valor do campo final não pode ser undefined. Valores possíveis iniciais: números ou textos ou null."
      );
    }
  }
  private static verificarMarcado(marcado: boolean): void {
    if (marcado == null || marcado === undefined) {
      throw new Error("Atributo marcado do campo não pode estar vazio.");
    }
  }

  /**
   * Get Functions
   */
  public getValor(): number | string | null {
    return this.valor;
  }
  
  public getMarcado(): boolean {
    return this.marcado;
  }

  /**
   * Set Functions
   */
  public atualizarValor(novoValor: number | string | null) {
    Campo.verificarValorInicial(novoValor);
    this.valor = novoValor;
  }

  public atualizarMarcado(marcado: boolean) {
    Campo.verificarMarcado(marcado);
    this.marcado = marcado;
  }
}

export default Campo;
