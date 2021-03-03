import { BaseConfig } from '../src/env-var-base'
import * as envVar from 'env-var'
import * as dotenv from 'dotenv'

describe('env-var-base', () => {
  afterEach(() => jest.restoreAllMocks())

  it('uses provided env obj', () => {
    const fromSpy = jest.spyOn(envVar, 'from')
    const env = {}

    new BaseConfig(env)

    expect(fromSpy).toBeCalledWith(env)
  })

  it('defaults to process.env and calls dotenv', () => {
    const fromSpy = jest.spyOn(envVar, 'from').mockReturnThis()
    const dotenvConfigSpy = jest.spyOn(dotenv, 'config').mockReturnThis()

    new BaseConfig()

    expect(dotenvConfigSpy).toBeCalled()
    expect(fromSpy).toBeCalledWith(process.env)
  })

  it('works when extending class', () => {
    class AppConfig extends BaseConfig {
      port = this.get('PORT').required().asPortNumber()
    }

    const config = new AppConfig({ PORT: '3000' })

    expect(config.port).toBe(3000)
  })
})
