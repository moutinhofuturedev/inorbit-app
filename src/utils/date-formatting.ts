import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

dayjs.locale(ptBR)

export const firstDayOfWeek = dayjs().startOf('week').format('D [de] MMM')
export const lastDayOfWeek = dayjs().endOf('week').format('D [de] MMM')

export const dayOfWeek = (date: string) => {
	return dayjs(date).format('dddd')
}

export const formatedDate = (date: string) => {
	return dayjs(date).format('D [de] MMMM')
}

export const timeCompletedGoals = (time: string) => {
	return dayjs(time).format('HH:mm')
}
