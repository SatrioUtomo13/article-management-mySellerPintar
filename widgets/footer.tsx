import React from 'react'
import Image from 'next/image'

export default function footer() {
    return (
        <div className="flex flex-col py-5 items-center bg-[#2563EBDB] xl:flex-row xl:justify-center xl:space-x-3">
            <div className="flex space-x-2">
                <Image
                    src={"/image-white.png"}
                    alt="Logo"
                    width={18}
                    height={20}
                />
                <h4 className="text-white font-bold">Logoipsum</h4>
            </div>
            <div className="text-white text-center">
                <p className="text-sm"> © 2025 Blog genzet. All rights reserved.</p>
            </div>
        </div>
    )
}
