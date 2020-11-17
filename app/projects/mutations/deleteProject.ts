import { Ctx } from "blitz"
import db, { ProjectDeleteArgs } from "db"

type DeleteProjectInput = Pick<ProjectDeleteArgs, "where">

export default async function deleteProject({ where }: DeleteProjectInput, ctx: Ctx) {
  ctx.session.authorize()

  const project = await db.project.delete({ where })

  return project
}
