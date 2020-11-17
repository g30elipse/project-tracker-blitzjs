import { Ctx } from "blitz"
import db, { DeploymentCreateArgs } from "db"

type CreateDeploymentInput = Pick<DeploymentCreateArgs, "data">
export default async function createDeployment({ data }: CreateDeploymentInput, ctx: Ctx) {
  ctx.session.authorize()

  const deployment = await db.deployment.create({ data })

  return deployment
}
