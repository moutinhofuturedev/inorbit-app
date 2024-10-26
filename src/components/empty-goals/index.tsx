import LetsStart from '@/assets/lets-start.svg'
import LogoInOrbit from '@/assets/logo-in-orbit.svg'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'

export const EmptyGoals = () => {
	return (
		<div className='h-screen flex flex-col items-center justify-center gap-8'>
			<img src={LogoInOrbit} alt='Logo do in.orbit' />
			<img src={LetsStart} alt='Ilustração de tela inicial' />
			<p className='text-zinc-300 leading-relaxed text-center max-w-80'>
				Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
			</p>
			<DialogTrigger asChild>
				<Button type='button'>
					<Plus size={20} /> <span>Cadastrar meta</span>
				</Button>
			</DialogTrigger>
		</div>
	)
}
