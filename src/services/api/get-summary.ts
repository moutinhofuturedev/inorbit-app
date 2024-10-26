import { api } from '@/lib/axios'
import axios from 'axios'

interface SummaryResponse {
	completed: number
	total: number
	goalsPerDay: Record<
		string,
		{
			id: string
			title: string
			completedAt: string
		}[]
	>
}

export const getSummary = async (): Promise<SummaryResponse | undefined> => {
	try {
		const response = await api.get('/summary')
		const data = await response.data

		return data.summary
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.response?.data)
			console.error(error.status)
		}
	}
}
