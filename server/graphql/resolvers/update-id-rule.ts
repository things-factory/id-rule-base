import { getRepository } from 'typeorm'
import { IdRule } from '../../entities'

export const updateIdRule = {
  async updateIdRule(_: any, { type, patch }, context: any) {
    const repository = getRepository(IdRule)
    const idRule = await repository.findOne({
      where: { type, domain: context.state.domain }
    })

    return await repository.save({
      ...idRule,
      ...patch,
      updater: context.state.user
    })
  }
}
