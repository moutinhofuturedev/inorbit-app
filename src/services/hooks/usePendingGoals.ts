import { getPendingGoals } from '@/services/api/get-pending-goals'
import { useQuery } from '@tanstack/react-query'

export const usePendingGoals = () => {
	return useQuery({
		queryKey: ['pending-goals'],
		queryFn: getPendingGoals,
		staleTime: 1000 * 60,
	})
}
