import { from } from 'env-var'

/**
 * Base configuration class that uses env-var and dotenv
 *
 * Usage:
 * ```ts
 * class AppConfig extends BaseConfig {
 *   port = this.get('PORT').default(3000).asPortNumber()
 * }
 *
 * const config = new AppConfig()
 * console.log(config.port) // 3000
 * ```
 */
export class BaseConfig {
  protected env: ReturnType<typeof from>

  /**
   * @param env Environmental variables source,
   * if not specified defaults to process.env with dotenv
   */
  constructor(env?: Record<string, string>) {
    if (env) {
      this.env = from(env)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('dotenv').config()
      this.env = from(process.env)
    }
  }

  /**
   * Usage:
   * ```ts
   * port = this.get('PORT').default(3000).asPortNumber()
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected get(name: string) {
    return this.env.get(name)
  }
}
