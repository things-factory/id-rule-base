import { getRepository, MoreThan } from 'typeorm'
import { IdRule, Sequence } from '../entities'

type getNextArgs = {
  domain: string
  pattern: string
  expirationDate?: Date
}

export async function generateId({ domain, type, seed }) {
  const idRuleRepo = getRepository(IdRule)
  const rule = await idRuleRepo.findOne({
    where: {
      domain,
      type
    }
  })

  if (!rule) throw Error('Rule not found')

  let evalFunc = eval(`async (domain, seed) => {
    ${rule.rule}
  }`)

  const nextId = await evalFunc(domain, {
    ...seed
  })

  return nextId
}

async function getNext({ domain, pattern, expirationDate }: getNextArgs) {
  const seqRepo = getRepository(Sequence)
  const now = new Date()
  let last = await seqRepo.findOne({
    domain,
    pattern,
    expiresAt: MoreThan(now)
  })

  var expiresAt = expirationDate
  if (!expirationDate) expiresAt = new Date(now.setMonth(now.getMonth() + 6))

  if (last) {
    last.seq++
    last.expiresAt = expiresAt
    await seqRepo.save(last)
  } else {
    if (!expirationDate) now.setMonth(now.getMonth() + 6)

    last = await seqRepo.save({
      domain,
      pattern,
      seq: 1,
      expiresAt
    })
  }

  return last.seq
}
