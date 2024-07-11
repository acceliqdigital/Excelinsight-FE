import { UploadFormikProps } from "@/utilities/commonInterface";
import { FormikProps } from "formik";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CustomTextAreaInput from "@/components/CustomInputs/CustomTextAreaInput";
import CustomButton from "@/components/CustomButton";
import { colors } from "@/utilities/themes/colors";

export default function OutputFormat({
  formik,
}: {
  formik: FormikProps<UploadFormikProps>;
}) {
  return (
    <>
      <div className="flex flex-row">
        <span
          className="text-black cursor-pointer mr-1 leading-lg-1"
          onClick={() => formik.setFieldValue("uploadStage", "upload")}
        >
          <ArrowBackRoundedIcon />
        </span>
        <div className="grow">
          <h2 className="text-lg-1 font-semi-bold">Specify Output Format</h2>
          <h3 className="text-md-1 text-grey ">Select the desired output format for your data.</h3>
					<div className="flex flex-col gap-4 mt-moderate">
						<div>
							<CustomTextAreaInput handleChange={formik.handleChange} name="businessInsightsReport" value={formik.values.businessInsightsReport} inputLabel={<span className="font-semi-bold text-md-1 tracking-wide">Business Insights Report</span>} />
						</div>
						<div>
							<CustomTextAreaInput value={formik.values.outputFormatDescription} name="outputFormatDescription" handleChange={formik.handleChange} inputLabel={<span className="font-semi-bold text-md-1 tracking-wide">Describe Output Format</span>} />
						</div>
						<div className="w-[40%] mx-auto">
							<CustomButton
								type="submit"
								variant="contained"
								buttonStyles={{
									py: 1,
									bgcolor: colors.BLACK,
									width: '100%'
								}} btnChild={<span>Next</span>} />
						</div>
					</div>
        </div>
      </div>
    </>
  );
}
