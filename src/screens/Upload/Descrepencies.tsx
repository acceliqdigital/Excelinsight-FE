import CustomButton from "@/components/CustomButton";
import { GenericObjectInterface } from "@/utilities/commonInterface";
import { routes } from "@/utilities/routes";
import { colors } from "@/utilities/themes/colors";
import { useNavigate } from "react-router-dom";

export default function Descrepencies({
	discrepencyPayload
}: {
	// formik: FormikProps<UploadFormikProps>
	discrepencyPayload: GenericObjectInterface | null
}){
	const navigate = useNavigate();
  return (
		<div className="flex flex-col justify-start items-center h-full">
			<div className="w-1/2 my-moderate">
				<h4 className="text-lg text-center my-large">Discrepancies Display</h4>
				{
					discrepencyPayload !==null && (
						<div className="grid grid-cols-2 gap-basic my-large">
							<div className="bg-primary-theme py-basic px-moderate rounded-md flex flex-col gap-basic">
								<h5 className="capitalize text-lg-2">missing columns</h5>
								<h5 className="capitalize text-md-1">number of missing columns: {discrepencyPayload['Missing Columns']?.length}</h5>
							</div>
							<div className="bg-primary-theme py-basic px-moderate rounded-md flex flex-col gap-basic">
								<h5 className="capitalize text-lg-2">missing values</h5>
								<h5 className="capitalize text-md-1">number of missing values: {discrepencyPayload['Missing Values']}</h5>
							</div>
						</div>
					)
				}
				<div className="w-[40%] mx-auto">
					<CustomButton
						type="button"
						handleClick={() => navigate(routes.HOME)}
						variant="contained"
						buttonStyles={{
							py: 1,
							bgcolor: colors.BLACK,
							width: '100%'
						}} btnChild={<span>Next</span>} />
				</div>
			</div>
		</div>
	)
}