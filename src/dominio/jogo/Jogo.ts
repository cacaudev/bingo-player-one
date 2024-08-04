import Campo from "./Campo";
import NumeroSorteado from "./NumeroSorteado";
import RegrasBingo from "./RegrasBingo";
import Tabela from "./Tabela";

class Jogo {
  private nome: string;
  private readonly dataCriacao: Date;

  public readonly tabela: Tabela;
  public regras: RegrasBingo;
  public numerosSorteados: NumeroSorteado[];

  constructor(
    nomeJogo: string,
    quantidadeColunas: number,
    quantidadeLinhas: number
  ) {
    Jogo.verificarNome(nomeJogo);

    this.nome = nomeJogo;
    this.tabela = new Tabela(quantidadeColunas, quantidadeLinhas);
    this.regras = new RegrasBingo();
    this.numerosSorteados = [];
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
    for (let i = 0; i < this.tabela.getQuantidadeCamposTabela(); i++) {
      this.tabela.campos[i].atualizarMarcado(false);
    }
    this.numerosSorteados = [];
  }

  validarTabelaParaIniciarJogo(): void {
    this.tabela.validarTabela();
  }

  adicionarNumeroSorteado(numeroSorteado: NumeroSorteado): void {
    this.numerosSorteados.push(numeroSorteado);
  }
  removerUltimoNumeroSorteado(): void {
    this.numerosSorteados.pop();
  }

  public jogarNumero(valorSorteado: number): {
    foiBingo: boolean;
  } {
    /**
     * Verificar se valor sorteado é um número e não está vazio
     */
    new Campo(0, valorSorteado, false);
    let numeroFoiAchadoNaTabela = false;
    let indiceDoCampoOndeNumeroFoiAchado: number = -1;

    for (let i = 0; i < this.tabela.getQuantidadeCamposTabela(); i++) {
      if (
        this.tabela.campos[i].getValor() == valorSorteado &&
        !this.tabela.campos[i].getMarcado()
      ) {
        this.tabela.campos[i].atualizarMarcado(true);
        numeroFoiAchadoNaTabela = true;
        indiceDoCampoOndeNumeroFoiAchado = i;
      }
    }

    let novoNumeroSorteado: NumeroSorteado;

    if (numeroFoiAchadoNaTabela) {
      novoNumeroSorteado = new NumeroSorteado(
        valorSorteado,
        numeroFoiAchadoNaTabela,
        indiceDoCampoOndeNumeroFoiAchado
      );
    } else {
      novoNumeroSorteado = new NumeroSorteado(
        valorSorteado,
        numeroFoiAchadoNaTabela
      );
    }
    this.adicionarNumeroSorteado(novoNumeroSorteado);

    const considerouBingo: boolean = this.verificarSeBingo();

    return {
      foiBingo: considerouBingo,
    };
  }

  public desfazerUltimoNumeroJogado() {
    if (this.numerosSorteados.length == 0) {
      return;
    }
    let ultimoNumeroSorteado: NumeroSorteado =
      this.numerosSorteados[this.numerosSorteados.length - 1];
    if (
      ultimoNumeroSorteado.getAchado() &&
      ultimoNumeroSorteado.getIndiceCampo() != -1
    ) {
      this.tabela.campos[
        ultimoNumeroSorteado.getIndiceCampo()
      ].atualizarMarcado(false);
    }
  }

  public verificarSeBingo(): boolean {
    let bingoPorTabelaToda = false;
    if (this.regras.getTabelaMarcada()) {
      bingoPorTabelaToda = this.verificarSeBingoPorTabelaToda();
    }

    let bingoPorColuna = false;
    if (this.regras.getColunaMarcada()) {
      bingoPorColuna = this.verificarSeBingoPorColuna();
    }

    let bingoPorLinha = false;
    if (this.regras.getLinhaMarcada()) {
      bingoPorColuna = this.verificarSeBingoPorLinha();
    }

    if (bingoPorTabelaToda || bingoPorColuna || bingoPorLinha) {
      return true;
    }

    return false;
  }

  private verificarSeBingoPorTabelaToda(): boolean {
    let foiBingo: boolean = true;
    for (let i = 0; i < this.tabela.getQuantidadeCamposTabela(); i++) {
      if (this.tabela.campos[i].getConsiderar()) {
        if (!this.tabela.campos[i].getMarcado()) {
          foiBingo = false;
        }
      }
    }
    return foiBingo;
  }

  private verificarSeBingoPorColuna(): boolean {
    let foiBingo: boolean = true;

    /**
     * Inicializa verificador de cada coluna como true
     */
    let colunas: boolean[] = [];
    for (let i = 0; i < this.tabela.getQuantidadeColunas(); i++) {
      colunas.push(true);
    }

    for (let i = 0; i < this.tabela.getQuantidadeColunas(); i++) {
      let colunaTodaMarcada = true;

      for (let j = 0; j < this.tabela.getQuantidadeLinhas(); j++) {
        if (this.tabela.campos[i * j].getConsiderar()) {
          if (!this.tabela.campos[i * j].getMarcado()) {
            colunaTodaMarcada = false;
          }
        }

        colunas[i] = colunaTodaMarcada;
      }
    }

    if (colunas.filter((coluna) => !coluna).length > 0) {
      foiBingo = false;
    }

    return foiBingo;
  }

  private verificarSeBingoPorLinha(): boolean {
    let foiBingo: boolean = true;

    /**
     * Inicializa verificador de cada linha como true
     */
    let linhasMarcadas: boolean[] = [];
    for (let i = 0; i < this.tabela.getQuantidadeLinhas(); i++) {
      linhasMarcadas.push(true);
    }

    for (let i = 0; i < this.tabela.getQuantidadeLinhas(); i++) {
      let linhaTodaMarcada = true;

      for (let j = 0; j < this.tabela.getQuantidadeColunas(); j++) {
        if (this.tabela.campos[i * j].getConsiderar()) {
          if (!this.tabela.campos[i * j].getMarcado()) {
            linhaTodaMarcada = false;
          }
        }

        linhasMarcadas[i] = linhaTodaMarcada;
      }
    }

    if (linhasMarcadas.filter((linha) => !linha).length > 0) {
      foiBingo = false;
    }

    return foiBingo;
  }
}

export default Jogo;
