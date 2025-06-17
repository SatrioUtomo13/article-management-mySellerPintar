'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks'
import { setToken } from '@/store/authSlice'

export default function TokenInitializer() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            dispatch(setToken(storedToken));
        }
    }, [dispatch]);

    return null;
}

