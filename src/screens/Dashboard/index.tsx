import { DummyProfilePic, ExcelInsightLogo } from "@/assets";
import { resetState } from "@/redux/combineStore";
import { routes } from "@/utilities/routes";
import { Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function Dashboard(){
	const ancor = useRef<HTMLDivElement | null>(null)
	const [menuVisible, setMenuVisible] = useState<boolean>(false)
	const navigator = useNavigate()
	const dispatch = useDispatch()
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
					<div className="flex flex-col justify-center p-basic cursor-pointer" ref={ancor} onClick={() => setMenuVisible(true)}>
						<img width={40} src={DummyProfilePic} />
					</div>
				</div>
			</div>
			<Outlet />
			<Menu
				anchorEl={ancor.current}
				open={menuVisible}
				onClose={() => {setMenuVisible(false)}}
			>
				<MenuItem className="capitalize" onClick={() => navigator(`${routes.HOME}${routes.UPLOAD}`)}>upload</MenuItem>
				<MenuItem className="capitalize" onClick={() => dispatch(resetState())}>log out</MenuItem>
			</Menu>
		</div>
	)
}