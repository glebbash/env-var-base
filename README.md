# env-var-base

> status: DEPRECATED
> 
> This wrapper proved to not bring enough value. The following pattern should be used instead: 
> ```ts
> import { Injectable } from '@nestjs/common';
> import envVar from 'env-var';
> 
> @Injectable()
> export class ConfigService {
>   #env = envVar.from(process.env);
>   get = this.#env.get;
> 
>   port = this.get('PORT').default(8080).asPortNumber();
> }
> ```

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Coverage Status](https://coveralls.io/repos/github/glebbash/env-var-base/badge.svg?branch=master)](https://coveralls.io/github/glebbash/env-var-base?branch=master)

Base configuration class that uses
[env-var](https://github.com/evanshortiss/env-var)
and
[dotenv](https://github.com/motdotla/dotenv)

Installation:

```sh
npm i env-var-base
```

Usage:

```ts
class AppConfig extends BaseConfig {
  port = this.get('PORT').default(3000).asPortNumber()
}
const config = new AppConfig()
console.log(config.port) // 3000
```

Env names can also be typed like this:

```ts
type Env = { PORT: string, HOST: string }

class AppConfig extends BaseConfig<keyof Env> {}
```

or directly:

```ts
class AppConfig extends BaseConfig<'PORT' | 'HOST'> {}
```

Bootstrapped with <https://github.com/LuisReinoso/typescript-library-starter>
