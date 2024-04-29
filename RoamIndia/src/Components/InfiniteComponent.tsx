import React from 'react'

interface props {
    image?: string,
    name?: string
}

const InfiniteComponent: React.FC = ({image,name}: props) => {
    return (
        <div>
            <blockquote>
                <div className="flex justify-center items-center">
                    <img
                        src={image}
                        // height="1000"
                        // width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                    <span className="absolute z-auto leading-[1.6] text-white text-2xl">
                        {name}
                    </span>

                </div>
                <div className="relative z-20 flex flex-row items-center">
                    <span className="flex flex-col gap-1">
                    </span>
                </div>
            </blockquote></div>
    )
}

export default InfiniteComponent