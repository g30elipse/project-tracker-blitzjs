import { Ctx } from "blitz"
import db, { DeploymentDeleteArgs } from "db"

type DeleteDeploymentInput = Pick<DeploymentDeleteArgs, "where">

export default async function deleteDeployment({ where }: DeleteDeploymentInput, ctx: Ctx) {
  ctx.session.authorize()

  const deployment = await db.deployment.delete({ where })

  return deployment
}
