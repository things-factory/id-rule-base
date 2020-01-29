import { getRepository } from 'typeorm'
import { IdRule } from '../../entities'

export const createIdRule = {
  async createIdRule(_: any, { idRule }, context: any) {
    return await getRepository(IdRule).save({
      ...idRule,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
