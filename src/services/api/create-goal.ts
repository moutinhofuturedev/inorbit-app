import { api } from '@/lib/axios'
import axios from 'axios'

interface CreateGoalFormData {
	title: string
	desiredWeeklyFrequency: number
}

export const createGoal = async ({
	title,
	desiredWeeklyFrequency,
}: CreateGoalFormData) => {
	try {
		await api.post('/goals', {
			title,
			desiredWeeklyFrequency,
		})
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(`Erro na requisição: ${error.message}`)
			throw new Error(
				'Não foi possível criar a meta. Por favor, tente novamente.',
			)
		} else {
			console.error(`Erro desconhecido: ${error}`)
			throw new Error('Algo deu errado. Por favor, tente novamente.')
		}
	}
}
