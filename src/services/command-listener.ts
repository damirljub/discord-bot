import { injectable } from "inversify"

@injectable()
export class CommandListener {

  private regexp = ['!who', '!roll']

  public isWhoCommand(string: string): boolean {
    return string.search(this.regexp[0]) >= 0
  }
  public isRollCommand(string: string): boolean {
    return string.search(this.regexp[1]) >= 0
  }
  
}