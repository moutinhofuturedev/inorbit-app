import { getSummary } from '@/services/api/get-summary'
import { useQuery } from '@tanstack/react-query'

export const useSummary = () => {
	return useQuery({
		queryKey: ['summary'],
		queryFn: getSummary,
		staleTime: 1000 * 60, // 60 seconds
	})
}
