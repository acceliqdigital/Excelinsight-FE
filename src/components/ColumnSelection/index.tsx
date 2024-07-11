import { HeaderProp } from "@/utilities/commonInterface";
import { Checkbox } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import { colors } from "@/utilities/themes/colors";

export default function ColumnSelection({
  headerList,
  handleSelectionForIndex,
}: {
  headerList: HeaderProp[];
  handleSelectionForIndex: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-basic max-w-[20rem]">
      {headerList.map((header, i) => (
        <div key={header.headerName} className="border-b border-grey py-basic flex flex-row items-center">
          <Checkbox
            sx={{
              py: 0,
              px: 1,
							color: colors.BLACK,
							'&.Mui-checked': {
								color: colors.BLACK,
							},
            }}
            checked={header.selectionIsPrivate}
            onChange={() => handleSelectionForIndex(i)}
          />
          <span>{header.headerName}</span>
          {header.selectionIsPrivate && (
            <span className="text-yellow capitalize border flex border-yellow rounded-[20px] mx-basic px-basic">
							<span className="flex text-md-1 align-baseline flex-row justify-center items-center gap-1 mx-1">
								<SecurityIcon
									sx={{
										fontSize: 15,
									}}
								/>
								<span className="flex flex-row justify-center items-center">
									private
								</span>
							</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
