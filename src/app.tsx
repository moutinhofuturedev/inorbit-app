import { EmptyGoals } from '@/components/empty-goals'
import { Dialog } from '@/components/ui/dialog'
import { CreateGoal } from '@/services/components/create-goal'
import { Summary } from '@/services/components/summary'
import { useSummary } from '@/services/hooks/useSummary'

export const App = () => {
	const { data: summary } = useSummary()

	return (
		<Dialog>
			{summary?.total && summary.total > 0 ? <Summary /> : <EmptyGoals />}

			<CreateGoal />
		</Dialog>
	)
}
