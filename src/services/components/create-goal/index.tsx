import { Button } from '@/components/ui/button'
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	RadioGroup,
	RadioGroupIndicator,
	RadioGroupItem,
} from '@/components/ui/radio-group'
import { createGoal } from '@/services/api/create-goal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const createSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Informe a atividade que deseja praticar' }),
	desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoalFormData = z.infer<typeof createSchema>

export const CreateGoal = () => {
	const queryClient = useQueryClient()
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<CreateGoalFormData>({
		resolver: zodResolver(createSchema),
		mode: 'onChange',
	})

	const { mutateAsync: createGoalFn } = useMutation({
		mutationFn: createGoal,
		onSuccess: () => {
			toast.success('Meta criada com sucesso!', {
				position: 'bottom-left',
				duration: 5000,
				className:
					'bg-violet-500 text-violet-50 border border-violet-50 flex items-start gap-2',
			})

			reset()
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

	const handleCreateGoal = async ({
		title,
		desiredWeeklyFrequency,
	}: CreateGoalFormData) => {
		await createGoalFn({
			title,
			desiredWeeklyFrequency,
		})

		await queryClient.invalidateQueries({ queryKey: ['summary'] })
		await queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
	}

	return (
		<DialogContent>
			<div className='flex flex-col gap-6 h-full'>
				<div className='flex flex-col gap-3'>
					<div className='flex items-center justify-between'>
						<DialogTitle className='font-semibold text-lg '>
							Cadastrar meta
						</DialogTitle>
						<DialogClose>
							<X className='size-5 text-zinc-600' />
						</DialogClose>
					</div>

					<DialogDescription className='text-zinc-400 text-sm leading-relaxed'>
						Adicione atividades que te fazem bem e que você quer continuar
						praticando toda semana.
					</DialogDescription>
				</div>

				<form
					action=''
					onSubmit={handleSubmit(handleCreateGoal)}
					className='flex flex-col justify-between flex-1'
				>
					<div className='flex flex-col gap-3'>
						<div className='flex flex-col gap-2'>
							<Label
								htmlFor='title'
								className='text-zinc-100 font-medium text-sm'
							>
								Qual a atividade?
							</Label>
							<Input
								id='title'
								autoFocus
								placeholder='Praticar exercícios, meditar, etc...'
								{...register('title')}
							/>
							<span className='text-sm text-red-500'>
								{errors.title?.message}
							</span>
						</div>
						<div className='flex flex-col gap-2'>
							<Label className='text-zinc-100 font-medium text-sm'>
								Quantas vezes na semana?
							</Label>
							<Controller
								control={control}
								name='desiredWeeklyFrequency'
								render={({ field }) => {
									return (
										<RadioGroup
											onValueChange={field.onChange}
											value={String(field.value)}
											defaultValue={String(field.value)}
										>
											<RadioGroupItem value='1'>
												<RadioGroupIndicator />
												<span className='text-sm font-medium text-zinc-300 leading-none'>
													1x na semana
												</span>
												<span className='text-lg leading-none'>🥱</span>
											</RadioGroupItem>
											<RadioGroupItem value='2'>
												<RadioGroupIndicator />
												<span className='text-sm font-medium text-zinc-300 leading-none'>
													2x na semana
												</span>
												<span className='text-lg leading-none'>🙂</span>
											</RadioGroupItem>
											<RadioGroupItem value='3'>
												<RadioGroupIndicator />
												<span className='text-sm font-medium text-zinc-300 leading-none'>
													3x na semana
												</span>
												<span className='text-lg leading-none'>😎</span>
											</RadioGroupItem>
											<RadioGroupItem value='4'>
												<RadioGroupIndicator />
												<span className='text-sm font-medium text-zinc-300 leading-none'>
													4x na semana
												</span>
												<span className='text-lg leading-none'>😜</span>
											</RadioGroupItem>
											<RadioGroupItem value='5'>
												<RadioGroupIndicator />
												<span className='text-sm font-medium text-zinc-300 leading-none'>
													5x na semana
												</span>
												<span className='text-lg leading-none'>🤨</span>
											</RadioGroupItem>
											<RadioGroupItem value='6'>
												<RadioGroupIndicator />
												<span className='text-sm font-medium text-zinc-300 leading-none'>
													6x na semana
												</span>
												<span className='text-lg leading-none'>🤯</span>
											</RadioGroupItem>
											<RadioGroupItem value='7'>
												<RadioGroupIndicator />
												<span className='text-sm font-medium text-zinc-300 leading-none'>
													Todos dias da semana
												</span>
												<span className='text-lg leading-none'>🔥</span>
											</RadioGroupItem>
										</RadioGroup>
									)
								}}
							/>
						</div>
					</div>
					<div className='flex items-center gap-3'>
						<DialogClose asChild>
							<Button variant='secondary' className='w-full' type='button'>
								Fechar
							</Button>
						</DialogClose>
						<Button className='w-full' type='submit'>
							Salvar
						</Button>
					</div>
				</form>
			</div>
		</DialogContent>
	)
}
