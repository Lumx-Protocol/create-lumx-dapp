'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mint } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { Spinner } from './ui/spinner';

const transactionHash = '';

const SubmitButtonForm = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			type='submit'
			aria-disabled={pending}
			className='disabled:opacity-50'
			disabled={pending}
		>
			{pending ? (
				<div className='flex items-center gap-2'>
					<Spinner className='stroke-white' />
					Claiming
				</div>
			) : (
				'Mint'
			)}
		</Button>
	);
};

export const ClaimForm = () => {
	const mintWithWalletId = mint.bind(
		null,
		'fc779ee2-3a3b-4332-9900-71bde7545aee'
	);
	const [state, formAction] = useFormState(mintWithWalletId, transactionHash);

	useEffect(() => {
		if (state.includes('0x')) {
			redirect(`?hash=${state}`);
		}
	}, [state]);

	return (
		<form action={formAction} className='flex gap-4 pt-4'>
			<Input
				id='quantity'
				type='number'
				name='quantity'
				className='w-[111px] text-center'
				required
			/>
			<SubmitButtonForm />
		</form>
	);
};