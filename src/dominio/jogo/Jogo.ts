import RegrasBingo from "./RegrasBingo";
import Tabela from "./Tabela";

class Jogo {
  private nome: string;
  private readonly dataCriacao: Date;

  public readonly tabela: Tabela;
  public regras: RegrasBingo;

  constructor(
    nomeJogo: string,
    quantidadeColunas: number,
    quantidadeLinhas: number
  ) {
    Jogo.verificarNome(nomeJogo);

    this.nome = nomeJogo;
    this.tabela = new Tabela(quantidadeColunas, quantidadeLinhas);
    this.regras = new RegrasBingo();
  }

  /**
   * Get Functions
   */
  public getNome(): string {
    return this.nome;
  }
  public getDataCriacao(): Date {
    return this.dataCriacao;
  }

  /**
   * Set Functions
   */
  public atualizarNome(nomeNovo: string): void {
    Jogo.verificarNome(nomeNovo);
    this.nome = nomeNovo;
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

  /**
   * Reseta o status de marcado de todos os campos para valor inicial false
   */
  resetarJogo(): void {
    for (let i = 0; i < this.tabela.getNumeroCamposJogo(); i++) {
      this.tabela.campos[i].atualizarMarcado(false);
    }
  }
}

export default Jogo;
