import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomInputs/CustomTextInput";
import { UploadFormikProps } from "@/utilities/commonInterface";
import { colors } from "@/utilities/themes/colors";
import { ArrowUpward } from "@mui/icons-material";
import { FormikProps } from "formik";
import { useState } from "react";

export default function ClarificationChat({
	formik,
}: {
	formik: FormikProps<UploadFormikProps>;
}){
	formik
	const [prompt, setPrompt] = useState<string>('')
	const handleSubmit = async (userPrompt: string) => {
		console.log(userPrompt)
	}
  return (
		<>
			<div className="flex flex-row h-full">
				<div className="bg-secondary-theme-2 w-1/5">
					{/* Chat references */}
				</div>
        <div className="grow bg-secondary-theme p-basic flex flex-col">
					<div className="grow">
						
					</div>
					<div>
						<CustomTextInput
							name="query"
							value={prompt}
							handleChange={(ev) => setPrompt(ev.target.value)}
							rightIcon={
								<CustomButton
									type="button"
									buttonStyles={{
										border: "none",
										":hover": {
											bgcolor: "transparent",
											border: "none",
										},
									}}
									btnChild={
										<span onClick={() => handleSubmit(prompt).then(() => setPrompt(''))} className="bg-primary-background cursor-pointer p-1.5 rounded-full">
											<ArrowUpward />
										</span>
									}
								/>
							}
							placeholder="Ask anything!"
							type={"text"}
							inputStyles={{
								backgroundColor: colors.WHITE,
								paddingLeft: 10,
							}}
							inputBoxStyles={{
								backgroundColor: colors.WHITE,
								borderRadius: 20,
							}}
						/>
					</div>
				</div>
			</div>
		</>
	)
}