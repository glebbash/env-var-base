import { cd, exec, echo, touch } from 'shelljs'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('package.json') as any)
const repoUrl = (() => {
  if (typeof pkg.repository === 'object') {
    if (!pkg.repository.hasOwnProperty('url')) {
      throw new Error('URL does not exist in repository section')
    }
    return pkg.repository.url
  } else {
    return pkg.repository
  }
})()

const parsedUrl = new URL(repoUrl)
const repository = parsedUrl.host + parsedUrl.pathname
const ghToken = process.env.GH_TOKEN

console.log(repoUrl)
console.log(repository)

echo('Deploying docs!!!')
cd('docs')
touch('.nojekyll')
exec('git init')
exec('git add .')
exec('git config user.name "glebbash"')
exec('git config user.email "glebbash@gmail.com"')
exec('git commit -m "docs(docs): update gh-pages"')
exec(`git push --force --quiet "https://${ghToken}@${repository}" master:gh-pages`)
echo('Docs deployed!!')
