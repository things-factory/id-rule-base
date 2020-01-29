import { getRepository } from 'typeorm'
import { IdRule } from '../../entities'

export const idRuleResolver = {
  async idRule(_: any, { type }, context: any) {
    const rule = await getRepository(IdRule).findOne({
      where: {
        domain: context.state.domain,
        type
      }
    })

    return rule
  }
}
