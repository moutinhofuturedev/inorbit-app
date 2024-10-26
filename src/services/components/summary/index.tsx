import Logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Progress, ProgressIndicator } from '@/components/ui/progress-bar'
import { Separator } from '@/components/ui/separator'
import { PendingGoals } from '@/services/components/pending-goals'
import { useSummary } from '@/services/hooks/useSummary'
import {
	dayOfWeek,
	firstDayOfWeek,
	formatedDate,
	lastDayOfWeek,
	timeCompletedGoals,
} from '@/utils/date-formatting'
import { CheckCircle2, Plus } from 'lucide-react'

export const Summary = () => {
	const { data: summary } = useSummary()
	if (!summary) {
		return null
	}

	const completedPercentage = Math.round(
		(summary.completed * 100) / summary.total,
	)

	return (
		<div className='py-10 px-5 max-w-[520px] mx-auto flex flex-col gap-6'>
			<header className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<img src={Logo} alt='Logo do in.orbit' />
					<span className='font-semibold text-lg'>
						{firstDayOfWeek} - {lastDayOfWeek}
					</span>
				</div>
				<DialogTrigger asChild>
					<Button type='button' size='sm'>
						<Plus size={20} /> <span>Cadastrar meta</span>
					</Button>
				</DialogTrigger>
			</header>

			{/* section de progresso */}
			<section className='flex flex-col gap-3'>
				<Progress value={summary.completed} max={summary.total}>
					<ProgressIndicator style={{ width: `${completedPercentage}%` }} />
				</Progress>

				<div className='flex items-center justify-between text-xs text-zinc-400'>
					<span>
						Você completou{' '}
						<span className='text-zinc-100'>{summary.completed}</span> de{' '}
						<span className='text-zinc-100'>{summary.total}</span> metas nessa
						semana.
					</span>
					<span>{completedPercentage}%</span>
				</div>
			</section>

			<Separator />

			{/* section de metas */}
			<PendingGoals />

			{/* section de metas completadas */}
			<section className='flex flex-col gap-6'>
				<h2 className='text-zinc-100 text-xl'>Sua semana</h2>

				{Object.entries(summary.goalsPerDay).map(([day, goals]) => {
					return (
						<div key={day} className='flex flex-col gap-4'>
							<h3 className='font-medium text-base'>
								{dayOfWeek(day)}{' '}
								<span className='text-zinc-400 text-xs'>
									{formatedDate(day)},
								</span>
							</h3>

							<ul className='flex flex-col gap-3'>
								{goals.map(goal => {
									return (
										<li key={goal.id} className='flex items-center gap-2'>
											<CheckCircle2 className='text-pink-500 size-4' />
											<span className='text-zinc-400'>
												Você completou “
												<span className='text-zinc-100 text-sm font-medium'>
													{goal.title}
												</span>
												” às{' '}
												<span className='text-zinc-100 text-sm font-medium'>
													{timeCompletedGoals(goal.completedAt)}h
												</span>
											</span>
										</li>
									)
								})}
							</ul>
						</div>
					)
				})}
			</section>
		</div>
	)
}
