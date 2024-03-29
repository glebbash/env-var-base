import { from } from 'env-var'

/**
 * Base configuration class that uses env-var and dotenv
 * Usage:
 *
 * ```ts
 * class AppConfig extends BaseConfig {
 *   port = this.get('PORT').default(3000).asPortNumber()
 * }
 * const config = new AppConfig()
 * console.log(config.port) // 3000
 * ```
 *
 * Env names can also be typed like this:
 *
 * ```ts
 * type Env = { PORT: string, HOST: string }
 *
 * class AppConfig extends BaseConfig<keyof Env> {}
 * ```
 *
 * or directly:
 *
 * ```ts
 * class AppConfig extends BaseConfig<'PORT' | 'HOST'> {}
 * ```
 */
export class BaseConfig<N extends string = string> {
  protected env: ReturnType<typeof from>

  /**
   * @param env Environmental variables source,
   * if not specified defaults to process.env with dotenv
   */
  constructor(env?: Record<N, string | undefined>) {
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
  protected get(name: N) {
    return this.env.get(name as never)
  }
}
