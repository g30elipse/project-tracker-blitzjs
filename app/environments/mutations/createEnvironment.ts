import { Ctx } from "blitz"
import db, { EnvironmentCreateArgs } from "db"

type CreateEnvironmentInput = Pick<EnvironmentCreateArgs, "data">
export default async function createEnvironment({ data }: CreateEnvironmentInput, ctx: Ctx) {
  ctx.session.authorize()

  const environment = await db.environment.create({ data })

  return environment
}
