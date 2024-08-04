import IndiceCampo from "./IndiceCampo";

class NumeroSorteado {
  private readonly valor: number = 0;
  private readonly achado: boolean = false;
  private readonly indiceCampo: IndiceCampo = new IndiceCampo(-1,-1);

  constructor(valor: number, achado: boolean, indice: IndiceCampo = new IndiceCampo(-1,-1)) {
    if (achado) {
      this.indiceCampo = indice;
    }
    NumeroSorteado.verificarNumero(valor);
    this.valor = valor;
    this.achado = achado;
  }

  public getValor() {
    return this.valor;
  }
  public getAchado() {
    return this.achado;
  }
  public getIndiceCampo(): IndiceCampo {
    if (this.achado) {
      return this.indiceCampo;
    } else {
      return new IndiceCampo(-1, -1);
    }
  }

  public static verificarNumero(numero: number) {
    const isValido = (numero: number): boolean =>
      numero != null && numero != undefined && numero >= 0;
    if (!isValido(numero)) {
      throw new Error("Número sorteado não pode ser vazio ou ser negativo.");
    }
  }
}

export default NumeroSorteado;
