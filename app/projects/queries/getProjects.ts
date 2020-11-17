import { Ctx } from "blitz"
import db, { FindManyProjectArgs } from "db"

type GetProjectsInput = Pick<FindManyProjectArgs, "where" | "orderBy" | "skip" | "take">

export default async function getProjects(
  { where, orderBy, skip = 0, take }: GetProjectsInput,
  ctx: Ctx
) {
  ctx.session.authorize()
  const userId = ctx.session.userId
  const projects = await db.project.findMany({
    where: { ...where, userId },
    orderBy,
    take,
    skip,
  })

  const count = await db.project.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    projects,
    nextPage,
    hasMore,
    count,
  }
}
