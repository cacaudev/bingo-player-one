/**
 * Configuração para considerar o bingo
 */
class RegrasBingo {
  private linhaMarcada: boolean;
  private colunaMarcada: boolean;
  private tabelaMarcada: boolean;

  constructor() {
    this.colunaMarcada = false;
    this.linhaMarcada = false;
    this.tabelaMarcada = false;
  }

  /**
   * Get Functions
   */
  public getLinhaMarcada(): boolean {
    return this.linhaMarcada;
  }
  public getColunaMarcada(): boolean {
    return this.colunaMarcada;
  }
  public getTabelaMarcada(): Boolean {
    return this.tabelaMarcada;
  }

  /**
   * Set Functions
   */
  public atualizarLinhaMarcada(regraAtualizada: boolean) {
    this.verificarRegra(regraAtualizada);
    this.linhaMarcada = regraAtualizada;
    if (regraAtualizada) {
      this.tabelaMarcada = false;
    }
  }
  public atualizarColunaMarcada(regraAtualizada: boolean) {
    this.verificarRegra(regraAtualizada);
    this.colunaMarcada = regraAtualizada;
    if (regraAtualizada) {
      this.tabelaMarcada = false;
    }
  }
  public atualizarTabelaMarcada(regraAtualizada: boolean) {
    this.verificarRegra(regraAtualizada);
    this.tabelaMarcada = regraAtualizada;
    if (regraAtualizada) {
      this.colunaMarcada = false;
      this.linhaMarcada = false;
    }
  }

  private verificarRegra(regraAtualizada: boolean) {
    const isVazio = (valor: boolean): boolean =>
      valor == null || valor == undefined;
    if (isVazio(regraAtualizada)) {
      throw new Error("Regra do jogo não pode ser vazia.");
    }
  }
}

export default RegrasBingo;
