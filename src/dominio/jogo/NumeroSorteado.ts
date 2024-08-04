class NumeroSorteado {
  private readonly valor: number = 0;
  private readonly achado: boolean = false;
  private readonly indiceCampo: number = -1;

  constructor(valor: number, achado: boolean, indice: number = -1) {
    if (achado) {
      this.verificarIndiceCampo(indice);
      this.indiceCampo = indice;
    }
    this.verificarNumero(valor);
    this.valor = valor;
    this.achado = achado;
  }

  public getValor() {
    return this.valor;
  }
  public getAchado() {
    return this.achado;
  }
  public getIndiceCampo() {
    if (this.achado) {
      return this.indiceCampo;
    } else {
      return -1;
    }
  }

  private verificarNumero(numero: number) {
    const isValido = (numero: number): boolean =>
      numero != null && numero != undefined && numero >= 0;
    if (!isValido(numero)) {
      throw new Error("Número sorteado não pode ser vazio ou ser negativo.");
    }
  }
  private verificarIndiceCampo(numero: number) {
    const isValido = (numero: number): boolean =>
      numero != null && numero != undefined && numero >= 0;
    if (!isValido(numero)) {
      throw new Error(
        "índice do campo da tabela não pode ser vazio ou ser negativo."
      );
    }
  }
}

export default NumeroSorteado;
