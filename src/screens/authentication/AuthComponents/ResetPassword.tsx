import CustomTextInput from "@/components/CustomInputs/CustomTextInput"
import { constants } from "@/utilities/constants"
import { useFormik } from "formik"
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import CustomButton from "@/components/CustomButton"
import { colors } from "@/utilities/themes/colors"
import { useNavigate } from "react-router-dom"
import { routes } from "@/utilities/routes"
export default function ResetPassword(){
	const navigate = useNavigate()
  const formik = useFormik({
		initialValues: {
			newPassword: '',
			showNewPassword: false,
			comfirmPassword: '',
			showConfirmPassword: false
		},
		onSubmit: (values) => {
			console.log(values)
			navigate(`${routes.HOME}${routes.AUTH}`)
		}
	})
	return (
		<>
			<div className='mb-large text-center'>
				<h2 className='text-lg font-semi-bold'>{constants.RESET_PASSWORD}</h2>
				<h3 className='text-md-1'>{constants.RESET_PASSWORD_SUBTITLE}</h3>
			</div>
			<form onSubmit={formik.handleSubmit}>
				<CustomTextInput
					inputLabel='New Password'
					name='newPassword'
					rightIcon={
						<span className='cursor-pointer' onClick={() => formik.setFieldValue('showNewPassword', !formik.values.showNewPassword)}>
							{
								formik.values.showNewPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />
							}
						</span>
					}
					handleChange={formik.handleChange}
					handleBlur={formik.handleBlur}
					value={formik.values.newPassword}
					placeholder='Enter password'
					children
					type={formik.values.showNewPassword ? 'text' : 'password'}
				/>
				<CustomTextInput
					inputLabel='Confirm Password'
					name='comfirmPassword'
					rightIcon={
						<span className='cursor-pointer' onClick={() => formik.setFieldValue('showConfirmPassword', !formik.values.showConfirmPassword)}>
							{
								formik.values.showConfirmPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />
							}
						</span>
					}
					handleChange={formik.handleChange}
					handleBlur={formik.handleBlur}
					value={formik.values.comfirmPassword}
					placeholder='Enter password'
					children
					type={formik.values.showConfirmPassword ? 'text' : 'password'}
				/>
				<CustomButton
					buttonStyles={{ 
						width: '100%',
						my: 2,
						bgcolor: colors.PRIMARY_THEME,
						boxShadow: 'none',
						":hover": {
							bgcolor: colors.PRIMARY_THEME
						}
					}}
					btnChild={<span className='capitalize text-black'>Reset Password</span>}
					variant='contained'
					type='submit'
				/>
			</form>
		</>
	)
}