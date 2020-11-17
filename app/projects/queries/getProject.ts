import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstProjectArgs } from "db"

type GetProjectInput = Pick<FindFirstProjectArgs, "where">

export default async function getProject({ where }: GetProjectInput, ctx: Ctx) {
  ctx.session.authorize()

  const project = await db.project.findFirst({ where, include: { deployments: { include: { environment: true } } } })

  if (!project) throw new NotFoundError()

  return project
}
