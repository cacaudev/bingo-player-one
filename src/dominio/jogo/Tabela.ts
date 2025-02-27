import Campo, { ValorCampo } from "./Campo";
import IndiceCampo from "./IndiceCampo";

class Tabela {
  private readonly quantidadeColunas: number;
  private readonly quantidadeLinhas: number;
  public readonly campos: Campo[][];
  private tabelaValidada: boolean;

  constructor(quantidadeColunas: number, quantidadeLinhas: number) {
    Tabela.verificarQuantidadeColunas(quantidadeColunas);
    Tabela.verificarQuantidadeLinhas(quantidadeLinhas);

    this.quantidadeColunas = quantidadeColunas;
    this.quantidadeLinhas = quantidadeLinhas;
    this.tabelaValidada = false;
    this.campos = Tabela.gerarTabelaInicial(
      quantidadeColunas,
      quantidadeLinhas
    );
  }

  /**
   * Get Functions
   */
  public getQuantidadeColunas(): number {
    return this.quantidadeColunas;
  }
  public getQuantidadeLinhas(): number {
    return this.quantidadeLinhas;
  }
  public getTabelaValidada(): boolean {
    return this.tabelaValidada;
  }

  /**
   * Sanitize quantidade colunas
   * @param quantidadeColunas number
   */
  private static verificarQuantidadeColunas(quantidadeColunas: number): void {
    const isVazio = (valor: number): boolean =>
      valor == null || valor == undefined;
    const minimoColunas = 2;
    const maximoColunas = 5;

    if (isVazio(quantidadeColunas)) {
      throw new Error("Quantidade de colunas do jogo não pode ser vazia.");
    }
    if (quantidadeColunas < minimoColunas) {
      throw new Error(
        `Quantidade de colunas do jogo deve ter valor mínimo de ${minimoColunas} colunas.`
      );
    }
    if (quantidadeColunas > maximoColunas) {
      throw new Error(
        `Quantidade de colunas do jogo deve ter valor máximo de ${maximoColunas} colunas.`
      );
    }
  }

  /**
   * Sanitize quantidade linhas
   * @param quantidadeLinhas number
   */
  private static verificarQuantidadeLinhas(quantidadeLinhas: number): void {
    const isVazio = (valor: number): boolean =>
      valor == null || valor == undefined;
    const minimoLinhas = 2;
    const maximoLinhas = 5;

    if (isVazio(quantidadeLinhas)) {
      throw new Error("Quantidade de linhas do jogo não pode ser vazia.");
    }
    if (quantidadeLinhas < minimoLinhas) {
      throw new Error(
        `Quantidade de linhas do jogo deve ter valor mínimo de ${minimoLinhas} linhas.`
      );
    }
    if (quantidadeLinhas > maximoLinhas) {
      throw new Error(
        `Quantidade de linhas do jogo deve ter valor máximo de ${maximoLinhas} linhas.`
      );
    }
  }

  private static gerarTabelaInicial(
    quantidadeColunas: number,
    quantidadeLinhas: number
  ): Campo[][] {
    const novosCampos = [];
    for (let i = 0; i < quantidadeLinhas; i++) {
      let novaLinha: Campo[] = [];

      for (let j = 0; j < quantidadeColunas; j++) {
        novaLinha.push(new Campo(new IndiceCampo(i, j), null, false));
      }

      novosCampos.push(novaLinha);
    }
    return novosCampos;
  }

  public getQuantidadeCamposTabela(): number {
    return this.quantidadeColunas * this.quantidadeLinhas;
  }

  public validarTabela(): void {
    for (let i = 0; i < this.getQuantidadeLinhas(); i++) {
      for (let j = 0; j < this.getQuantidadeColunas(); j++) {
        if (!this.campos[i][j].verificarValorFinal()) {
          throw new Error(
            "Valor de um dos campos da tabela é inválido ou está vazio."
          );
        }
      }
    }
    this.tabelaValidada = true;
  }

  private verificarSeValorJaExisteNaTabela(valor: ValorCampo) {
    if (valor == null || valor == undefined || valor == "") {
      return false;
    }

    for (let i = 0; i < this.getQuantidadeLinhas(); i++) {
      for (let j = 0; j < this.getQuantidadeColunas(); j++) {
        if (
          this.campos[i][j].getConsiderar() &&
          this.campos[i][j].getValor() === valor
        ) {
          return true;
        }
      }
    }
    return false;
  }

  public atualizarCampo(campoAtualizado: Campo) {
    if (this.verificarSeValorJaExisteNaTabela(campoAtualizado.getValor())) {
      throw new Error("Valor já existe na tabela.");
    }
    const indice = campoAtualizado.getIndice();
    this.campos[indice.getX()][indice.getY()] = campoAtualizado;
  }

  public resetarMarcacaoDeTodosOsCampos() {
    for (let i = 0; i < this.getQuantidadeLinhas(); i++) {
      for (let j = 0; j < this.getQuantidadeColunas(); j++) {
        this.campos[i][j].atualizarMarcado(false);
      }
    }
  }
}

export default Tabela;
