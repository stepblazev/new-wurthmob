import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay: number) => {
	const [debounceValue, setDebounceValue] = useState<T>(value);

	useEffect(() => {
		const timer: number = setTimeout(() => {
			setDebounceValue(value);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debounceValue;
};

export default useDebounce;