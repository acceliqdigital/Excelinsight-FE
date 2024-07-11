import CustomTextInput from '@/components/CustomInputs/CustomTextInput'
import { constants } from '@/utilities/constants'
import { useFormik } from 'formik'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import CustomButton from '@/components/CustomButton'
import { colors } from '@/utilities/themes/colors'
import {useState} from 'react'
import OTP from '@/components/OTP'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/utilities/routes'

export default function SignupForm(){
	const [showVerifyOTP, setShowVerifyOTP] = useState<boolean>(false)
	const navigate = useNavigate()
	const navigator = useNavigate()
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			showPassword: false
		},
		onSubmit: (values) => {
			console.log(values, 'signup')
			setShowVerifyOTP(true)
		}
	})
  return (
		<>
			{
				showVerifyOTP ?
				// <div>OTP</div> :
				<OTP handleSubmit={() => {
					console.log('navigate to kyc')
					navigator(`${routes.HOME}${routes.PROFILE_KYC}`)
				}} goBackHandler={() => setShowVerifyOTP(false)} title={<span className='font-semi-bold'>Enter the OTP sent to <span className='whitespace-nowrap'>+91 9999999999</span></span>} /> :
				<>
					<div className='mb-large'>
						<h2 className='text-lg'>{constants.SIGN_UP}</h2>
						<h3 className='text-md-1'>{constants.ENTER_CREDENTIALS_MESSAGE}</h3>
					</div>
					<form onSubmit={e => formik.handleSubmit(e)}>
						<CustomTextInput
							inputLabel='email address'
							name='email'
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
							value={formik.values.email}
							placeholder='example@email.com'
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
							type={formik.values.showPassword ? 'text' : 'password'}
						/>
						<div onClick={() => navigate(`${routes.HOME}${routes.FORGOT_PASSWORD}`)} className='text-md-1 my-basic text-right underline cursor-pointer'>{constants.FORGOT_PASSWORD_PROMPT}</div>
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
							btnChild={<span className='capitalize text-black'>Send OTP</span>}
							variant='contained'
							type='submit'
						/>
					</form>
				</>
			}
		</>
	)
}