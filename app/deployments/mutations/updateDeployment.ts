import { Ctx } from "blitz"
import db, { DeploymentUpdateArgs } from "db"

type UpdateDeploymentInput = Pick<DeploymentUpdateArgs, "where" | "data">

export default async function updateDeployment({ where, data }: UpdateDeploymentInput, ctx: Ctx) {
  ctx.session.authorize()

  const deployment = await db.deployment.update({ where, data })

  return deployment
}
