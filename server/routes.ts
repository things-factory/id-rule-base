import { generateId } from './controllers/id-generator'
import { IdRuleType } from './entities/id-rule'

process.on('bootstrap-module-history-fallback' as any, (app, fallbackOption) => {
  /*
   * fallback white list를 추가할 수 있다
   *
   * ex)
   * var paths = [
   *   'aaa',
   *   'bbb'
   * ]
   * fallbackOption.whiteList.push(`^\/(${paths.join('|')})($|[/?#])`)
   */

  var paths = ['get-next-pattern']
  fallbackOption.whiteList.push(`^\/(${paths.join('|')})($|[/?#])`)
})

process.on('bootstrap-module-route' as any, (app, routes) => {
  /*
   * koa application에 routes 를 추가할 수 있다.
   *
   * ex) routes.get('/path', async(context, next) => {})
   * ex) routes.post('/path', async(context, next) => {})
   */
  routes.get('/get-next-pattern/:type', async (context, next) => {
    const { type } = context.params

    const domain = '73038de0-7d86-44b3-91ee-9bd9ca368d08'

    var id = await generateId({
      domain,
      type,
      seed: {}
    })

    context.status = 200
    context.body = id
  })
})