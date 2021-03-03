import { from } from 'env-var'
import { config } from 'dotenv'

/**
 * Base configuration class that uses env-var and dotenv
 *
 * Usage:
 * ```
 * class AppConfig extends BaseConfig {
 *  port = this.get('PORT').default(3000).asPortNumber()
 * }
 *
 * const config = new AppConfig()
 * console.log(config.port) // 3000
 * ```
 */
export class BaseConfig {
  protected env: ReturnType<typeof from>

  constructor(env?: Record<string, string>) {
    if (env) {
      this.env = from(env)
    } else {
      config()
      this.env = from(process.env)
    }
  }

  /**
   * Usage:
   * ```
   * port = this.get('PORT').default(3000).asPortNumber()
   * ```
   * @param name
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected get(name: string) {
    return this.env.get(name)
  }
}
