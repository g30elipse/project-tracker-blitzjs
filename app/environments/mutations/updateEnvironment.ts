import { Ctx } from "blitz"
import db, { EnvironmentUpdateArgs } from "db"

type UpdateEnvironmentInput = Pick<EnvironmentUpdateArgs, "where" | "data">

export default async function updateEnvironment({ where, data }: UpdateEnvironmentInput, ctx: Ctx) {
  ctx.session.authorize()

  const environment = await db.environment.update({ where, data })

  return environment
}
