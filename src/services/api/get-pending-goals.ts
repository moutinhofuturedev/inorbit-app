import { api } from '@/lib/axios'
import axios from 'axios'

export interface PendingGoalsResponse {
	id: string
	title: string
	desiredWeeklyFrequency: number
	createdAt: Date
	completionCount: number
}
;[]

export const getPendingGoals = async (): Promise<
	PendingGoalsResponse[] | undefined
> => {
	try {
		const response = await api.get('/pending-goals')
		const data = await response.data

		return data.pendingGoals
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.response?.data)
			console.error(error.status)
		}
	}
}
