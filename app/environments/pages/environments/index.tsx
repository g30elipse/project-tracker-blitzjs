import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getEnvironments from "app/environments/queries/getEnvironments"

const ITEMS_PER_PAGE = 100

export const EnvironmentsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ environments, hasMore }] = usePaginatedQuery(getEnvironments, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {environments.map((environment) => (
          <li key={environment.id}>
            <Link href={`/environments/${environment.id}`}>
              <a>{environment.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const EnvironmentsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/environments/new">
          <a>Create Environment</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <EnvironmentsList />
      </Suspense>
    </div>
  )
}

EnvironmentsPage.getLayout = (page) => <Layout isContainer title={"Environments"}>{page}</Layout>

export default EnvironmentsPage
