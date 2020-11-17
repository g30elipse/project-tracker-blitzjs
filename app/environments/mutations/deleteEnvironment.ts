import { Ctx } from "blitz"
import db, { EnvironmentDeleteArgs } from "db"

type DeleteEnvironmentInput = Pick<EnvironmentDeleteArgs, "where">

export default async function deleteEnvironment({ where }: DeleteEnvironmentInput, ctx: Ctx) {
  ctx.session.authorize()

  const environment = await db.environment.delete({ where })

  return environment
}
