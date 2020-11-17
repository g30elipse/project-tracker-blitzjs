import { Ctx } from "blitz"
import db, { FindManyEnvironmentArgs } from "db"

type GetEnvironmentsInput = Pick<FindManyEnvironmentArgs, "where" | "orderBy" | "skip" | "take">

export default async function getEnvironments(
  { where, orderBy, skip = 0, take }: GetEnvironmentsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const environments = await db.environment.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.environment.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    environments,
    nextPage,
    hasMore,
    count,
  }
}
