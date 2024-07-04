import CustomTextInput from "@/components/CustomInputs/CustomTextInput"
import { constants } from "@/utilities/constants"
import { useFormik } from "formik"
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import CustomButton from "@/components/CustomButton"
import { colors } from "@/utilities/themes/colors"
import { useNavigate } from "react-router-dom"
import { routes } from "@/utilities/routes"

export default function LoginForm(){
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			showPassword: false
		},
		onSubmit: (values) => {
			console.log(values)
		}
	})
	const navigate = useNavigate()
  return (
		<>
			<div className='mb-large'>
				<h2 className='text-lg'>{constants.LOG_IN}</h2>
				<h3 className='text-md-1'>{constants.ENTER_CREDENTIALS_MESSAGE}</h3>
			</div>
			<form onSubmit={formik.handleSubmit}>
				<CustomTextInput
					inputLabel='email address'
					name='email'
					handleChange={formik.handleChange}
					handleBlur={formik.handleBlur}
					value={formik.values.email}
					placeholder='example@email.com'
					children
					type='text'
				/>
				<CustomTextInput
					inputLabel='Password'
					name='password'
					rightIcon={
						<span className='cursor-pointer' onClick={() => formik.setFieldValue('showPassword', !formik.values.showPassword)}>
							{
								formik.values.showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />
							}
						</span>
					}
					handleChange={formik.handleChange}
					handleBlur={formik.handleBlur}
					value={formik.values.password}
					placeholder='Enter password'
					children
					type={formik.values.showPassword ? 'text' : 'password'}
				/>
				<div onClick={() => navigate(`${routes.HOME}${routes.AUTH}${routes.FORGOT_PASSWORD}`)} className='text-md-1 my-basic text-right underline cursor-pointer'>{constants.FORGOT_PASSWORD_PROMPT}</div>
				<CustomButton
					buttonStyles={{ 
						width: '100%',
						my: 2,
						bgcolor: colors.BLACK,
						boxShadow: 'none',
						":hover": {
							bgcolor: colors.BLACK
						}
					}}
					btnChild={<span className='capitalize text-white'>Log In</span>}
					variant='contained'
					type='submit'
				/>
			</form>
		</>
	)
}