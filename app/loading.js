import { DualRing } from 'react-css-spinners'



function Loading() {

    return (
        <div className='h-screen bg-[#c5c5c5] flex justify-center items-center'>
        <DualRing color="rgba(100,100,100,1)" size={100} thickness={3} />
        </div>
    )
}

export default Loading;