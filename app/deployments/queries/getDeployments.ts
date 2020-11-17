import { Ctx } from "blitz"
import db, { FindManyDeploymentArgs } from "db"

type GetDeploymentsInput = Pick<FindManyDeploymentArgs, "where" | "orderBy" | "skip" | "take">

export default async function getDeployments(
  { where, orderBy, skip = 0, take }: GetDeploymentsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const deployments = await db.deployment.findMany({
    where,
    orderBy,
    take,
    skip,
    include: { environment: true, project: true }
  })

  const count = await db.deployment.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    deployments,
    nextPage,
    hasMore,
    count,
  }
}
