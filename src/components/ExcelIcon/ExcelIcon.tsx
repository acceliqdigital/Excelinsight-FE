import { colors } from '@/utilities'
import { Menu } from '@mui/icons-material'

function ExcelIcon({height=35, width=35, iconSize=18}:{height?:string|number, width?:string|number, iconSize?:number}) {
  return (
    <div className='bg-black rounded-full flex flex-col items-center justify-center' style={{height: height, width: width}} >
      <Menu style={{color: colors.WHITE, fontSize: iconSize}} />  
    </div>
  )
}

export default ExcelIcon