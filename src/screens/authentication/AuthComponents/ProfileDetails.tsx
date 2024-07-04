import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomInputs/CustomTextInput";
import { constants } from "@/utilities/constants";
import { colors } from "@/utilities/themes/colors";
import { Avatar, Badge, FormControl } from "@mui/material";
import { useFormik } from "formik";
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { UserDummyIcon } from "@/assets";

export default function ProfileDetails(){
  const formik = useFormik({
		initialValues: {
			organizationName: '',
			role: '',
			profileImage: ''
		},
		onSubmit: (values) => {
			console.log(values)
		}
	})
	return (
		<>
			<div className='mb-large'>
				<h2 className='text-lg'>{constants.KYC_TITLE}</h2>
				<h3 className='text-md-1'>{constants.KYC_TITLE_SUBTITLE}</h3>
			</div>
			<form onSubmit={formik.handleSubmit}>
				<div className="flex flex-row justify-center my-moderate">
					<FormControl>
						<input
							onChange={(e) => {
								formik.setFieldValue(
									"profileImage",
									e.target.files?.item(0)
								);
							}}
							className=" hidden"
							name="profileImage"
							id="profileImage"
							type="file"
						/>
						<label
							htmlFor="profileImage"
							className=" flex flex-col items-center"
						>
							<Badge
								className=" cursor-pointer"
								anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
								overlap="circular"
								badgeContent={
									<EditRoundedIcon
										sx={{
											width: 20,
											height: 20,
											bgcolor: colors.BLACK,
											color: colors.BACKGROUND_COLOR,
											p: "2px",
											borderRadius: "100%",
										}}
									/>
								}
							>
								<Avatar
									variant={"circular"}
									sx={{ width: 74, height: 74 }}
									src={
										formik.errors.profileImage
											? ""
											: typeof formik.values.profileImage == "string"
											? ""
											: URL.createObjectURL(
													formik.values.profileImage as File
												)
									}
								>
									<img src={UserDummyIcon} />
								</Avatar>
							</Badge>
						</label>
						<div className="h-3">
							{formik.touched.profileImage &&
								formik.errors.profileImage && (
									<div className="text-right text-sm text-error-color px-basic">
										{formik.errors.profileImage}
									</div>
								)}
						</div>
					</FormControl>
				</div>
				<CustomTextInput
					inputLabel='Organization Name'
					name='organizationName'
					handleChange={formik.handleChange}
					handleBlur={formik.handleBlur}
					value={formik.values.organizationName}
					placeholder='Enter Organization Name'
					type='text'
				/>
				<CustomTextInput
					inputLabel='Your Role'
					name='role'
					handleChange={formik.handleChange}
					handleBlur={formik.handleBlur}
					value={formik.values.role}
					placeholder='Enter Role'
					type='text'
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
					btnChild={<span className='capitalize text-black'>Continue</span>}
					variant='contained'
					type='submit'
				/>
			</form>
		</>
	)
}