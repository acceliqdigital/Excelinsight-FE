import { CustomButtonProp } from "@/utilities/commonInterface";
import { colors } from "@/utilities/themes/colors";
import { Button, CircularProgress } from "@mui/material";

export default function CustomButton({
	handleClick,
	variant = 'outlined',
	type = 'button',
	showLoader,
	disabled=false,
	btnChild,
	buttonStyles 
}: CustomButtonProp){
  return (
		<Button sx={
			{":hover": {
				bgcolor: colors.BLACK
			}, ...buttonStyles}
		} disabled={disabled || showLoader} onClick={handleClick} variant={variant} type={type}>
			<div className="flex items-center gap-2">
        {showLoader && <CircularProgress size={20} />}
        {btnChild}
      </div>
		</Button>
	)
}