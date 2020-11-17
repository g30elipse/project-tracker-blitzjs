import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstDeploymentArgs } from "db"

type GetDeploymentInput = Pick<FindFirstDeploymentArgs, "where">

export default async function getDeployment({ where }: GetDeploymentInput, ctx: Ctx) {
  ctx.session.authorize()

  const deployment = await db.deployment.findFirst({ where })

  if (!deployment) throw new NotFoundError()

  return deployment
}
