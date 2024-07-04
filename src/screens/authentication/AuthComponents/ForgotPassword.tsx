import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomInputs/CustomTextInput";
import OTP from "@/components/OTP";
import { constants } from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import { colors } from "@/utilities/themes/colors";
import { useFormik } from "formik";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

export default function ForgotPassword(){
	const [showVerifyOTP, setShowVerifyOTP] = useState<boolean>(false)
	const navigator = useNavigate()
	const formik = useFormik({
		initialValues: {
			'email': ''
		},
		onSubmit: (values) => {
			setShowVerifyOTP(true)
			console.log(values)
		}
	})
  return (
		<>
			{
				showVerifyOTP ? 
				<OTP
					handleSubmit={() => navigator(`${routes.HOME}${routes.AUTH}${routes.RESET_PASSWORD}`)}
					goBackHandler={() => setShowVerifyOTP(false)} 
					title={<span className='font-semi-bold'>{constants.FORGOT_MY_PASSWORD_TITLE}</span>} 
					subtitle={<span className='text-md-1'>{constants.SENT_OTP_PROMPT}</span>} /> : 
				<>
					<div className='mb-large text-center'>
						<h2 className='text-lg'>{constants.FORGOT_MY_PASSWORD_TITLE}</h2>
						<h3 className='text-md-1'>{constants.FORGOT_MY_PASSWORD_SUBTITLE}</h3>
					</div>
					<form onSubmit={formik.handleSubmit}>
						<CustomTextInput
							type="text"
							name="email"
							inputLabel={'Email address'}
							placeholder="Enter Email"
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
						/>
						<div className="w-full my-moderate">
							<CustomButton
								buttonStyles={{
									width: '100%',
									bgcolor: colors.BLACK,
									":hover": {
										bgcolor: colors.BLACK
									}
								}}
								type="submit"
								variant="contained"
								btnChild={<span className="capitalize">send link</span>}
							/>
						</div>
					</form>
				</>
			}
		</>
	)
}