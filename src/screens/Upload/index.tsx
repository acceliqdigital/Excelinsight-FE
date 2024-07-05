import CustomButton from "@/components/CustomButton";
import CustomFileUpload from "@/components/CustomInputs/CustomFileUpload";
import CustomTextAreaInput from "@/components/CustomInputs/CustomTextAreaInput";
import { colors } from "@/utilities/themes/colors";
import { useFormik } from "formik";

export default function Upload(){
	const formik = useFormik<{
		'excel-file-1': null | File,
		'excel-file-2': null | File,
		'excel-file-3': null | File,
		'text-file-1': null | File,
		'text-file-2': null | File,
		businessModelText: string
	}>({
		initialValues: {
			'excel-file-1': null,
			'excel-file-2': null,
			'excel-file-3': null,
			'text-file-1': null,
			'text-file-2': null,
			businessModelText: ''
		},
		onSubmit: (values) => {
			console.log(values)
		}
	})
	return (
		<div className="flex flex-row grow self-stretch">
			<div className="w-1/4"></div>
			<div className="bg-white p-moderate grow m-basic mr-0">
				<div className="grid grid-cols-2 gap-5">
					<div className="flex flex-col gap-2">
						<h2 className="text-lg-1 font-semi-bold">Excel File Upload</h2>
						<div>
							<CustomFileUpload acceptString=".xls,.xlsx" handleChange={(files) => {
								if(files.item(0)){
									formik.setFieldValue('excel-file-1', files.item(0))
								}
							}} inputLabel={<span className="font-semi-bold tracking-wide">Excel file 1</span>} />
						</div>
						<div>
							<CustomFileUpload acceptString=".xls,.xlsx" handleChange={(files) => {
								if(files.item(0)){
									formik.setFieldValue('excel-file-2', files.item(0))
								}
							}} inputLabel={<span className="font-semi-bold tracking-wide">Excel file 2</span>} />
						</div>
						<div>
							<CustomFileUpload acceptString=".xls,.xlsx" handleChange={(files) => {
								if(files.item(0)){
									formik.setFieldValue('excel-file-3', files.item(0))
								}
							}} inputLabel={<span className="font-semi-bold tracking-wide">Excel file 3</span>} />
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<h2 className="text-lg-1 font-semi-bold">Text Document Upload</h2>
						<div>
							<CustomFileUpload acceptString=".txt" handleChange={(files) => {
								if(files.item(0)){
									formik.setFieldValue('text-file-1', files.item(0))
								}
							}} inputLabel={<span className="font-semi-bold tracking-wide">Text doc 1</span>} />
						</div>
						<div>
							<CustomFileUpload acceptString=".txt" handleChange={(files) => {
								if(files.item(0)){
									formik.setFieldValue('text-file-2', files.item(0))
								}
							}} inputLabel={<span className="font-semi-bold tracking-wide">Text doc 2</span>} />
						</div>
					</div>
					<div className="col-start-1 col-end-3">
						<h2 className="text-lg-1 font-semi-bold">Business Model Description</h2>
						<div>
							<CustomTextAreaInput value={formik.values.businessModelText} name="businessModelText" placeholder="Type here ..." handleChange={formik.handleChange} inputLabel={<span className="font-semi-bold tracking-wide">Describe your Business model</span>} />
						</div>
					</div>
					<div className="col-start-1 col-end-3">
						<div className="w-[40%] mx-auto">
							<CustomButton variant="contained" buttonStyles={{
								bgcolor: colors.BLACK,
								width: '100%',
								py: 1
							}} btnChild={<span className="capitalize font-semi-bold text-white">Next</span>} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}