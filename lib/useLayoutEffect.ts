import { useLayoutEffect as useEffect } from 'react';

export const useLayoutEffect = typeof window !== 'undefined' ? useEffect : () => { };
