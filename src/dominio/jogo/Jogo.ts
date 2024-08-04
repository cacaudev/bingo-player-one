import Campo from "./Campo";
import IndiceCampo from "./IndiceCampo";
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
    this.dataCriacao = new Date();

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
    this.tabela.resetarMarcacaoDeTodosOsCampos();
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
    foiAchado: boolean;
    indiceCampo: IndiceCampo;
  } {
    /**
     * Verificar se valor sorteado é um número e não está vazio
     */
    NumeroSorteado.verificarNumero(valorSorteado);
    let numeroFoiAchadoNaTabela = false;
    let indiceDoCampoOndeNumeroFoiAchado: IndiceCampo = new IndiceCampo(-1, -1);

    for (let i = 0; i < this.tabela.getQuantidadeLinhas(); i++) {
      for (let j = 0; j < this.tabela.getQuantidadeColunas(); j++) {
        if (
          this.tabela.campos[i][j].getValor() == valorSorteado &&
          !this.tabela.campos[i][j].getMarcado()
        ) {
          this.tabela.campos[i][j].atualizarMarcado(true);
          numeroFoiAchadoNaTabela = true;
          indiceDoCampoOndeNumeroFoiAchado = new IndiceCampo(i, j);
        }
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
      foiAchado: numeroFoiAchadoNaTabela,
      indiceCampo: indiceDoCampoOndeNumeroFoiAchado,
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
      ultimoNumeroSorteado.getIndiceCampo().getX() != -1
    ) {
      this.tabela.campos[ultimoNumeroSorteado.getIndiceCampo().getX()][
        ultimoNumeroSorteado.getIndiceCampo().getY()
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
    for (let i = 0; i < this.tabela.getQuantidadeLinhas(); i++) {
      for (let j = 0; j < this.tabela.getQuantidadeColunas(); j++) {
        if (this.tabela.campos[i][j].getConsiderar()) {
          if (!this.tabela.campos[i][j].getMarcado()) {
            foiBingo = false;
          }
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

    for (let j = 0; j < this.tabela.getQuantidadeColunas(); j++) {
      let colunaTodaMarcada = true;

      for (let i = 0; i < this.tabela.getQuantidadeLinhas(); i++) {
        if (this.tabela.campos[i][j].getConsiderar()) {
          if (!this.tabela.campos[i][j].getMarcado()) {
            colunaTodaMarcada = false;
          }
        }
      }
      colunas.push(colunaTodaMarcada);
    }

    if (colunas.filter((coluna) => !coluna).length > 0) {
      foiBingo = false;
    }
    return foiBingo;
  }

  private verificarSeBingoPorLinha(): boolean {
    let foiBingo: boolean = true;
    let linhasMarcadas: boolean[] = [];

    for (let i = 0; i < this.tabela.getQuantidadeLinhas(); i++) {
      let linhaTodaMarcada = true;

      for (let j = 0; j < this.tabela.getQuantidadeColunas(); j++) {
        if (this.tabela.campos[i][j].getConsiderar()) {
          if (!this.tabela.campos[i][j].getMarcado()) {
            linhaTodaMarcada = false;
          }
        }

        linhasMarcadas.push(linhaTodaMarcada);
      }
    }

    if (linhasMarcadas.filter((linha) => !linha).length > 0) {
      foiBingo = false;
    }
    return foiBingo;
  }
}

export default Jogo;
