import { AuthenticationSideImage, ExcelInsightLogo } from "@/assets";
import { constants } from "@/utilities/constants";
import { Outlet } from "react-router-dom";

export default function Authentication() {
  return (
		<div className="flex flex-row h-[100vh]">
			<div className="bg-primary-theme w-1/2 flex flex-col justify-start">
				<div className="p-moderate">
					<img className="h-10" src={ExcelInsightLogo} />
				</div>
				<div className="flex flex-col grow justify-center items-center">
					<div>
						<img src={AuthenticationSideImage} className="w-96"/>
						<div>
							<h2 className="text-lg">{constants.DATA_MANAGEMENT_SYSTEM}</h2>
							<h3>{constants.AUTH_LEFT_SCREEN_SUBTITLE}</h3>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white flex flex-col justify-center items-center grow">
				<div>
					<Outlet />
				</div>
			</div>
		</div>
	)
}