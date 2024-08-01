import CustomTextAreaInput from "@/components/CustomInputs/CustomTextAreaInput";
import CustomButton from "@/components/CustomButton";
import { colors } from "@/utilities/themes/colors";
import CustomTextInput from "@/components/CustomInputs/CustomTextInput";
import { useNavigate } from "react-router-dom";
import { routes } from "@/utilities/routes";

export default function BusinessInsightAndSuggestions() {
  const navigator = useNavigate()
  return (
    <>
      <div className="flex flex-row px-xLarge py-large">
        <div className="grow">
          <h2 className="text-lg-1 font-semi-bold">Specify Output Format</h2>
          <h3 className="text-md-1 text-grey ">
            Select the desired output format for your data.
          </h3>
          <form className="flex flex-col gap-4 mt-moderate">
            <div>
              <CustomTextAreaInput
                inputBoxStyles={{
                  backgroundColor: colors.SECONDARY_THEME,
                }}
                inputStyles={{
                  backgroundColor: colors.SECONDARY_THEME,
                }}
                // handleChange={}
                name="businessInsightsReport"
                // value={}
                inputLabel={
                  <span className="font-semi-bold text-md-1 tracking-wide">
                    Business Insights Report
                  </span>
                }
              />
            </div>
            <div>
              <CustomTextAreaInput
                inputBoxStyles={{
                  backgroundColor: colors.SECONDARY_THEME,
                }}
                inputStyles={{
                  backgroundColor: colors.SECONDARY_THEME,
                }}
                // value={}
                name="outputFormatDescription"
                // handleChange={}
                inputLabel={
                  <span className="font-semi-bold text-md-1 tracking-wide">
                    Describe Output Format
                  </span>
                }
              />
            </div>
            <div>
              <CustomTextInput
                inputLabel={"Email"}
                placeholder="Enter your email"
                inputBoxStyles={{
                  backgroundColor: colors.SECONDARY_THEME,
                }}
                inputStyles={{
                  backgroundColor: colors.SECONDARY_THEME,
                }}
                // value={}
                name="Email"
                // handleChange={}
                type="text"
              />
            </div>
            <div className="w-[40%] mx-auto">
              <CustomButton
                handleClick={() => {
                  navigator(`/${routes.UPLOAD}`)
                }}
                variant="contained"
                buttonStyles={{
                  py: 1,
                  bgcolor: colors.BLACK,
                  width: "100%",
                }}
                btnChild={<span>Next</span>}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
