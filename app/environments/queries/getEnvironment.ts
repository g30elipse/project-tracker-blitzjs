import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstEnvironmentArgs } from "db"

type GetEnvironmentInput = Pick<FindFirstEnvironmentArgs, "where">

export default async function getEnvironment({ where }: GetEnvironmentInput, ctx: Ctx) {
  ctx.session.authorize()

  const environment = await db.environment.findFirst({ where })

  if (!environment) throw new NotFoundError()

  return environment
}
