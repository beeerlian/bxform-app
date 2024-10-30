// Chakra imports
import { Flex, FormLabel, Input, Text, useColorModeValue } from '@chakra-ui/react';
import { FieldError, UseFormRegister } from 'react-hook-form';
// Custom components

export default function InputField(props: {
	id: string;
	label?: string;
	extra?: JSX.Element;
	placeholder?: string;
	type: string;
	mb?: any;
	name: string;
	register: UseFormRegister<any>;
	error?: FieldError | undefined;
	valueAsNumber?: boolean;
	[x: string]: any;
}) {
	const { id, label, extra, placeholder,error, type, mb, name, valueAsNumber, register,   ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

	return (
		<Flex direction='column' mb={mb ? mb : '30px'}>
			{
				label? <FormLabel
				display='flex'
				ms='10px'
				htmlFor={id}
				fontSize='sm'
				color={textColorPrimary}
				// fontWeight='bold'
				_hover={{ cursor: 'pointer' }}>
				{label}
				<Text fontSize='sm' fontWeight='400' ms='2px'>
					{extra}
				</Text>
			</FormLabel> : null
			} 
			<Input
				h={props.h ??  '44px'}
				maxH={props.maxH ??'44px'}
				type={type}
				id={id}
				fontWeight='500'
				{...register(name, { valueAsNumber })}
				variant='main'
				placeholder={placeholder}
				_placeholder={{ fontWeight: '400', color: 'secondaryGray.600' }}
				{...rest}
			/>
		</Flex>
	);
}
