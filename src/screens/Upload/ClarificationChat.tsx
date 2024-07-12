import { DummyProfilePic, DummyImage } from "@/assets";
import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomInputs/CustomTextInput";
import { RootState } from "@/redux/combineStore";
import { Chat } from "@/redux/reducerInterface";
import { appendChat, clearChat } from "@/redux/reducers/chatReducer";
import { GenericObjectInterface, UploadFormikProps } from "@/utilities/commonInterface";
import { colors } from "@/utilities/themes/colors";
import { ArrowUpward } from "@mui/icons-material";
import { FormikProps } from "formik";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridLoader, BeatLoader } from "react-spinners";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'

export default function ClarificationChat({
  formik,
}: {
  formik: FormikProps<UploadFormikProps>;
}) {
  formik;
  const [prompt, setPrompt] = useState<string>("");
  const [chatLoading, setChatLoading] = useState<boolean>(false);
	const dispatch = useDispatch()
  const { chatSessionId: sessionId, chatHistory, mediaRoot } = useSelector(
    (state: RootState) => state.chatStateReducer
  );
	const [isBotMessageLoading, setIsBotMessageLoading] = useState<boolean>(false)
  const socket = useRef<WebSocket | null>(null);
  useEffect(() => {
    const socketPath = `ws://localhost:8008/ws/chat/${sessionId}/`;
    socket.current = new WebSocket(socketPath);
    socket.current.addEventListener("open", () => {
      console.log("socket has been connected");
      setChatLoading(false);
    });
    socket.current.addEventListener("message", (ev) => {
      console.log(JSON.parse(ev.data));
			const payload: GenericObjectInterface = JSON.parse(ev.data)
			dispatch(appendChat({
				message: payload['message'],
				owner: 'bot'
			}))
			setIsBotMessageLoading(false)
    });
		return () => {
			socket.current?.close()
			dispatch(clearChat())
		}
  }, [dispatch, sessionId]);
  const handleSubmit = async (userPrompt: string) => {
    if (userPrompt.length <= 0) return;
    if (socket.current == null) return;
		dispatch(appendChat({
			message: userPrompt,
			owner: 'user'
		}))
		setIsBotMessageLoading(true)
    socket.current.send(
      JSON.stringify({
        message: userPrompt,
      })
    );
  };

  const renderChatHistory = useCallback<(messages: Chat[]) => ReactNode>((messages: Chat[]): ReactNode => {
    return messages.map<ReactNode>((message) => (
			<div key={message.messageId} className="flex flex-row p-basic bg-primary-background rounded-md">
				<div className="flex flex-col justify-start mr-basic">
					<img className="w-10" src={message.owner == 'bot' ? DummyProfilePic : DummyImage} />
				</div>
				<div className="w-[80%]">{message.message}</div>
			</div>
		));
  }, []);
	const renderBotLoadingMessage = useCallback<(isLoading: boolean) => ReactNode>((isLoading: boolean): ReactNode => {
		console.log(isLoading, 'show loading')
		if(isLoading){
			return (
				<div key={'loading'} className="flex flex-row p-basic bg-primary-background rounded-md">
					<div className="flex flex-col justify-start mr-basic">
						<img src={DummyProfilePic} />
					</div>
					<div className="w-[80%] flex flex-row justify-start items-center">
						<BeatLoader />
					</div>
				</div>
			)
		} else {
			return null
		}
	}, [])

  return (
    <>
      <div className="flex flex-row h-full max-h-[85vh]">
        <div className="bg-secondary-theme-2 w-[20%]">
          {/* Chat references */}
          <div className="flex flex-row justify-end my-moderate mx-basic bg-primary-background p-basic rounded-md">
            <a download={'merge.xlsx'} href={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${mediaRoot}`}>
							<span>Download<DownloadRoundedIcon /></span>
						</a>
          </div>
					<div className="w-24 ml-auto">
						<CustomButton
							type="button"
							handleClick={() => {
								formik.resetForm()
								formik.setFieldValue("uploadStage", "upload")
							}}
							variant="contained"
							buttonStyles={{
								py: 1,
								bgcolor: colors.BLACK,
								width: "100%",
							}}
							btnChild={<span>Resubmit</span>}
						/>
					</div>
        </div>
        <div className="grow bg-secondary-theme p-basic flex flex-col w-[80%]">
          <div className="grow flex flex-col justify-start overflow-scroll">
            {chatLoading ? (
              <div className="mx-auto flex flex-col justify-center items-center">
                <GridLoader loading={true} color={colors.BLACK} size={25} />
                <span className="text-lg-1 my-moderate">Loading</span>
              </div>
            ) : (
							<div className="grow flex flex-col justify-end gap-basic">
								{
									renderChatHistory(chatHistory)
								}
								{
									renderBotLoadingMessage(isBotMessageLoading)
								}
							</div>
						)}
          </div>
          <div>
            <CustomTextInput
              name="query"
              handleKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  handleSubmit(prompt).then(() => setPrompt(""));
                }
              }}
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
                  handleClick={() =>
                    handleSubmit(prompt).then(() => setPrompt(""))
                  }
                  btnChild={
                    <span className="bg-primary-background cursor-pointer p-1.5 rounded-full">
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
  );
}
