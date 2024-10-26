import { OutlineButton } from '@/components/ui/outline-button'
import { createGoalCompletion } from '@/services/api/create-goal-completion'
import { usePendingGoals } from '@/services/hooks/usePendingGoals'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

export const PendingGoals = () => {
	const queryClient = useQueryClient()
	const { data: pendingGoals } = usePendingGoals()

	const { mutateAsync: createGoalCompletionFn } = useMutation({
		mutationFn: createGoalCompletion,

		onSuccess: () => {
			toast.success('Você concluiu sua meta diária!', {
				position: 'bottom-left',
				duration: 5000,
				className:
					'bg-violet-500 text-violet-50 border border-violet-50 flex items-start gap-2',
			})
		},

		onError: error => {
			toast.error(error.message, {
				position: 'bottom-left',
				duration: 5000,
				className:
					'bg-zinc-900 text-zinc-300 border border-zinc-300 flex items-start gap-2',
			})
		},
	})

	if (!pendingGoals) {
		return null
	}

	const handleGoalCompletion = async (goalId: string) => {
		await createGoalCompletionFn(goalId)

		await queryClient.invalidateQueries({ queryKey: ['summary'] })
		await queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
	}

	return (
		<section className='flex flex-wrap gap-3'>
			{pendingGoals.map(goal => {
				const isCompleted = goal.completionCount >= goal.desiredWeeklyFrequency
				return (
					<OutlineButton
						onClick={() => handleGoalCompletion(goal.id)}
						key={goal.id}
						disabled={isCompleted}
					>
						<Plus size={20} className='text-zinc-600' />
						<span className='text-zinc-300 text-sm'>{goal.title}</span>
					</OutlineButton>
				)
			})}
		</section>
	)
}