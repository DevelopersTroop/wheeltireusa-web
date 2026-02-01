import Container from "@/components/ui/container/container";

const Loading = () => {

    return (
        <Container>
            <div className='w-full flex gap-4 mt-12'>
                <div className='w-1/2 flex flex-col gap-16'>
                    {/* Thumbnail Skeleton */}
                    <div className='flex justify-center'>
                        <div className='w-full md:w-4/5 flex justify-center'>
                            <div className='aspect-square h-full w-4/5 mx-auto rounded-full animate-color-pulse'></div>
                        </div>
                    </div>
                    {/* buttons */}
                    <div className='flex justify-between gap-3'>
                        <div className='w-full h-12 rounded-3xl mt-2  animate-color-pulse'></div>
                        <div className='w-full h-12 rounded-3xl mt-2  animate-color-pulse'></div>
                        <div className='w-full h-12 rounded-3xl mt-2  animate-color-pulse'></div>
                    </div>
                </div>
                <div className="w-1/2">
                    {/* Product Title */}
                    <div className='h-5 w-full animate-color-pulse rounded-2xl'></div>
                    <div className='h-5 w-2/3 animate-color-pulse mt-4 rounded-2xl'></div>
                    {/* SKU */}
                    <div className="h-4 w-1/3 animate-color-pulse rounded-xl mt-4"></div>
                    {/* Product Price */}
                    <div className="w-3/5 h-8 animate-color-pulse rounded-2xl mt-8"></div>
                    {/* Description */}
                    <div className='h-4 w-full mt-8 animate-color-pulse rounded-2xl'></div>
                    <div className='h-4 w-full animate-color-pulse mt-4 rounded-2xl'></div>
                    <div className='h-4 w-full animate-color-pulse mt-4 rounded-2xl'></div>
                    <div className='h-4 w-2/3 animate-color-pulse mt-4 rounded-2xl'></div>
                    {/* Quantity */}
                    <div className='flex justify-between mt-10'>
                        <div className='w-1/3 h-12 rounded-3xl animate-color-pulse'></div>
                        <div className='w-1/2 h-12 rounded-3xl animate-color-pulse'></div>
                    </div>
                    {/* Action buttons */}
                    <div className='w-full h-12 rounded-3xl mt-8 animate-color-pulse'></div>
                    <div className='w-full h-12 rounded-3xl mt-4 animate-color-pulse'></div>
                    <div className='w-full h-12 rounded-3xl mt-4 animate-color-pulse'></div>
                </div>
            </div>
            <div className='h-4 w-full mt-12 animate-color-pulse rounded-2xl'></div>
            <div className='h-4 w-full animate-color-pulse mt-4 rounded-2xl'></div>
            <div className='h-4 w-full animate-color-pulse mt-4 rounded-2xl'></div>
            <div className='h-4 w-2/3 animate-color-pulse mt-4 rounded-2xl'></div>
        </Container>
    );
};

export default Loading;