export default class Logger {
  private readonly origemErro: string

  constructor(pOrigemErro: string) {
    this.origemErro = pOrigemErro
  }

  public info(pMensagem: string): void {
    console.info(`[INFO] [${this.origemErro}]: ${pMensagem}`)
  }

  public warning(pMensagem: string): void {
    console.warn(`[WARNING] [${this.origemErro}]: ${pMensagem}`)
  }

  public log(pMensagem: string): void {
    console.log(`[LOG] [${this.origemErro}]: ${pMensagem}`)
  }

  public error(pMensagem: string | any): void {
    console.error(`[ERROR] [${this.origemErro}]: ${pMensagem}`)
  }
}
