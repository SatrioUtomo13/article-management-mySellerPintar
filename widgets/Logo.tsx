'use client'

import React from 'react'
import Image from 'next/image'

export default function Logo({ bodyClassName, textClassName }: { bodyClassName: string, textClassName: string }) {
    return (
        <div className={bodyClassName}>
            <Image
                src={"/image-white.png"}
                alt="Logo"
                width={22}
                height={20}
            />
            <h4 className={textClassName}>Logoipsum</h4>
        </div>
    )
}
