import { api } from '@/lib/axios'
import axios from 'axios'

export const createGoalCompletion = async (goalsId: string) => {
	try {
		await api.post('/completions', {
			goalsId,
		})
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(`Erro na requisição: ${error.message}`)
			throw new Error(
				' Não foi possível completar a meta. Por favor, tente novamente.',
			)
		}
	}
}
