import Campo from "./Campo";

class Jogo {
  private nome: string;
  private readonly quantidadeColunas: number;
  private readonly quantidadeLinhas: number;
  public readonly campos: Campo[];

  constructor(
    nomeJogo: string,
    quantidadeColunas: number,
    quantidadeLinhas: number
  ) {
    Jogo.verificarNome(nomeJogo);
    Jogo.verificarQuantidadeColunas(quantidadeColunas);
    Jogo.verificarQuantidadeLinhas(quantidadeLinhas);

    this.nome = nomeJogo;
    this.quantidadeColunas = quantidadeColunas;
    this.quantidadeLinhas = quantidadeLinhas;

    const numeroCampos = quantidadeColunas * quantidadeColunas;
    this.campos = Jogo.gerarTabelaInicial(numeroCampos);
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
  public getCampos(): Campo[] {
    return this.campos;
  }
  public getNome(): string {
    return this.nome;
  }

  /**
   * Set Functions
   */
  public atualizarNome(nomeNovo: string): void {
    Jogo.verificarNome(nomeNovo);
    this.nome = nomeNovo;
  }

  /**
   * Sanitize quantidade colunas
   * @param quantidadeColunas number
   */
  private static verificarQuantidadeColunas(quantidadeColunas: number): void {
    const isVazio = (valor: number): boolean =>
      valor == null || valor == undefined;
    const minimoColunas = 3;
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
    const minimoLinhas = 3;
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

  private static verificarNome(nome: string): void {
    const isVazio = (nome: string): boolean =>
      nome == null || nome == "" || nome == undefined;

    const maximoCaracters = 50;
    const minimoCaracters = 5;

    if (isVazio(nome)) {
      throw new Error("Nome do jogo não pode ser vazio.");
    }
    if (nome.length < minimoCaracters) {
      throw new Error(
        `Nome do jogo deve ter no mínimo ${minimoCaracters} letras.`
      );
    }
    if (nome.length > maximoCaracters) {
      throw new Error(
        `Nome do jogo deve ter no máximo ${maximoCaracters} letras.`
      );
    }
  }

  private static gerarTabelaInicial(numeroCampos: number): Campo[] {
    const novosCampos: Campo[] = [];
    for (let i = 0; i < numeroCampos; i++) {
      novosCampos.push(new Campo(null, false));
    }
    return novosCampos;
  }

  getNumeroCamposJogo(): number {
    return this.quantidadeColunas * this.quantidadeLinhas;
  }

  /**
   * Reseta o status de marcado de todos os campos para valor inicial false
   */
  resetarJogo(): void {
    for (let i = 0; i < this.getNumeroCamposJogo(); i++) {
      this.campos[i].atualizarMarcado(false);
    }
  }
}

export default Jogo;
