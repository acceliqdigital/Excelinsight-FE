import { DummyProfilePic, ExcelInsightLogo } from "@/assets";
import { Outlet } from "react-router-dom";

export default function Dashboard(){
  return (
		<div className="min-h-[100vh] bg-primary-theme flex flex-col">
			<div className="flex p-moderate bg-white flex-row justify-between shadow-shadow-md">
				<div className="my-auto">
					<img className="h-10" src={ExcelInsightLogo} />
				</div>
				<div className="flex flex-row">
					<div className="text-right flex flex-col justify-center">
						<h5 className="text-md">John Shell</h5>
						<h6 className="text-md-1">johnshell55@email.com</h6>
					</div>
					<div className="flex flex-col justify-center p-basic">
						<img width={40} src={DummyProfilePic} />
					</div>
				</div>
			</div>
			<Outlet />
		</div>
	)
}