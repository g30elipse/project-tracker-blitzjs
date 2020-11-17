import { Ctx } from "blitz"
import db, { ProjectCreateArgs } from "db"

export type CreateProjectInput = Pick<ProjectCreateArgs, "data">
export default async function createProject({ data }: CreateProjectInput, ctx: Ctx) {
  ctx.session.authorize()

  const project = await db.project.create({ data })

  return project
}
