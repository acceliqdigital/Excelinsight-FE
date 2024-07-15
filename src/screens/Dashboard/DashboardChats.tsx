import CustomTextInput from "@/components/CustomInputs/CustomTextInput";
import { colors, GenericObjectInterface } from "@/utilities";
import { useFormik } from "formik";
import CustomButton from "@/components/CustomButton";
import { AnimatedLoader, DummyImage, ExcelInsightLogo } from "@/assets";
import { LegacyRef, useCallback, useEffect, useRef, useState } from "react";
import {
  AccountCircle,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import style from "./dashboardChatsStyles.module.scss";
import ExcelIcon from "@/components/ExcelIcon/ExcelIcon";
import LottieAnimationProvider from "@/components/LottieProvider/LottieAnimationProvider";
import TypeWriterUI from "@/components/TypeWriterUI/TypeWriterUI";
export interface ChatSpaceInput {
  query: string;
}

const mapSender = {
  USER: "user",
  BOT: "bot",
};

const BotMessageComponent = ({
  index,
  msg,
  userMessageRef,
  isBotMessageLoading,
  handleAnimFinished,
  showTypeWriterAnimation,
}: {
  msg: string;
  index: number;
  size?: "small" | "medium";
  userMessageRef: LegacyRef<HTMLDivElement>;
  isBotMessageLoading?: boolean;
  handleAnimFinished: () => void;
  showTypeWriterAnimation: boolean;
}) => {
  return (
    <div
      // ref={userMessageRef}
      key={index}
      className={`${style.messageAnimation} flex pl-basic `}
    >
      <div
        style={{}}
        className="sticky top-0 h-[30px] w-[30px] rounded-full flex flex-col items-center justify-center"
      >
        <ExcelIcon height={30} width={30} iconSize={22} />
      </div>
      <div className={`max-w-[95%] px-basic pt-[2px]`}>
        {/* <h4 className={`text-black`}>Cielo</h4> */}
        {isBotMessageLoading && msg === "" ? (
          <LottieAnimationProvider
            animationFile={AnimatedLoader}
            height={55}
            width={55}
            lottieStyle={{ paddingLeft: 8, marginTop: -12 }}
          />
        ) : showTypeWriterAnimation ? (
          <div
            className={`text-justify rounded-md lg:text-[16px] text-md-1 px-basic min-w-[100px] overflow-hidden font-medium break-words`}
            style={{
              color:
                msg ===
                `Something went wrong while fetching your data. Please try again later!`
                  ? "rgba(255, 40, 40, 1)"
                  : colors.BLACK,
            }}
          >
            <TypeWriterUI
              botResponse={msg}
              delay={30}
              handleAnimationFinished={handleAnimFinished}
              textClass={`font-medium`}
            />
          </div>
        ) : (
          <div
            className={`text-justify rounded-md lg:text-[16px] text-md-1 px-basic min-w-[100px] overflow-hidden font-medium break-words`}
            style={{
              color:
                msg ===
                `Something went wrong while fetching your data. Please try again later!`
                  ? "rgba(255, 40, 40, 1)"
                  : colors.BLACK,
            }}
          >
            {msg}
          </div>
        )}
        <div ref={userMessageRef} className="h-1 w-1 opacity-0" />
      </div>
    </div>
  );
};
const UserMessageComponent = ({
  msg,
  index,
  userImg = DummyImage,
  userMessageRef,
}: {
  msg: string | number;
  index: number;
  userImg?: string;
  userMessageRef: LegacyRef<HTMLDivElement>;
  size?: "small" | "medium";
}) => {
  return (
    <div
      key={index}
      ref={userMessageRef}
      id={`usermessage_${index}`}
      className={`${style.messageAnimation} flex px-basic rounded-lg`}
    >
      <div className="h-[30px] w-[30px] sticky top-0 rounded-full flex flex-col bg-light-orange items-center justify-center">
        {userImg ? (
          <img
            src={userImg}
            alt=""
            className={`h-[30px] w-[30px] object-cover rounded-full`}
          />
        ) : (
          <AccountCircle style={{ color: colors.BLACK, fontSize: 30 }} />
        )}
      </div>
      <div className={`px-basic max-w-[95%] pt-[2px]`}>
        {/* <h4 className="text-black">You</h4> */}
        <div
          className={`rounded-md text-justify lg:text-[16px] text-md-1 px-basic bg-primary-text text-black overflow-hidden font-medium break-words`}
        >
          {msg}
        </div>
      </div>
    </div>
  );
};

export default function ChatSpace() {
  const [botMessageLoading, setBotMessageLoading] = useState(false);
  const [chatData, setChatData] = useState<GenericObjectInterface[]>([]);
  const [showScrollToBottomButton, setShowScrollToBottomButton] =
    useState(false);
  const [showTypewriterAnimation, setShowTypewriterAnimation] = useState(false);
  const userMessageRef = useRef<HTMLDivElement>(null);
  const scrollingDivRef = useRef<HTMLDivElement>(null);
  const formik = useFormik<ChatSpaceInput>({
    initialValues: {
      query: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmitMessage(values.query);
    },
  });

  useEffect(() => {
    console.log(userMessageRef.current, "userMessageRef.current");

    if (
      chatData[chatData?.length - 1]?.sender === mapSender.USER &&
      userMessageRef.current
    ) {
      userMessageRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (userMessageRef.current && !showScrollToBottomButton) {
      userMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatData, showScrollToBottomButton]);

  const handleSubmitMessage = (query: string) => {
    if (query?.length > 0) {
      formik.setFieldValue("query", "");
      initializeMessage(query);
    }
  };

  const initializeMessage = (message: string) => {
    setChatData((prevData) => [
      ...prevData,
      {
        id: chatData?.length + 1,
        sender: mapSender.USER,
        message: `${message}`,
      },
    ]);
    setTimeout(() => {
      setChatData((prevData) => [
        ...prevData,
        {
          id: chatData?.length + 1,
          sender: mapSender.BOT,
          message: "",
        },
      ]);
      sendMessageAPI(message);
    }, 500);
  };

  const sendMessageAPI = async (message: string) => {
    setBotMessageLoading(true);
    setTimeout(() => {
      setShowTypewriterAnimation(true);
      setChatData((prevData) => [
        ...prevData.slice(0, prevData.length - 1),
        {
          ...prevData[prevData.length - 1],
          message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        },
      ]);
      setBotMessageLoading(false);
    }, 2000);
    // try {
    //   const data = {
    //     query: message,
    //     allow_follow_ups: false,
    //   };
    //   const headerList = {
    //     ...headersList,
    //     Authorization: `Token ${userToken}`,
    //   };
    //   await axios.post(`${BASE_URL_CHAT}${endPoints.CHAT_API}`, data, {
    //     headers: headerList,
    //     responseType: "stream",
    //     onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
    //       const chunk = progressEvent?.event?.currentTarget?.response;
    //       setChatData((prevData) => [
    //         ...prevData.slice(0, prevData.length - 1),
    //         {
    //           ...prevData[prevData.length - 1],
    //           message: chunk,
    //         },
    //       ]);
    //     },
    //   });
    //   if (promptHistory !== null) {
    //     dispatch(
    //       updatePromptHistory([
    //         ...promptHistory,
    //         { id: promptHistory?.length, query: message },
    //       ])
    //     );
    //   } else {
    //     dispatch(
    //       updatePromptHistory([{ id: 0, query: message }])
    //     );
    //   }
    //   setTimeout(() => {
    //     getChatReferenceQuestions();
    //     getSuggestiveQuestions();
    //   }, 1000);
    // } catch (error: any) {
    //   setChatData((prevData) => [
    //     ...prevData.slice(0, prevData.length - 1),
    //     {
    //       ...prevData[prevData.length - 1],
    //       message:
    //         "Something went wrong while fetching your data. Please try again later!",
    //     },
    //   ]);
    // } finally {
    //   setBotMessageLoading(false);
    // }
  };

  const handleAnimFinished = useCallback(() => {
    setShowTypewriterAnimation(false);
  }, []);

  return (
    <div className="flex flex-col grow bg-secondary-theme overflow-hidden">
      {/* <div className="w-full-0.9 self-center flex flex-col items-end mt-moderate pb-basic" style={{backgroundColor:"transparent"}}>
        <CustomButton
          variant="contained"
          buttonStyles={{ backgroundColor: colors.BLACK, opacity: 0.8 }}
          btnChild="Next >"
        />
      </div> */}
      {chatData?.length > 0 ? (
        <>
          <div
            ref={scrollingDivRef}
            onScroll={() => {
              const container = scrollingDivRef.current;
              if (container) {
                const isScrolledToBottom =
                  container.scrollHeight - container.scrollTop - 50 <=
                  container.clientHeight;
                console.log(isScrolledToBottom, "isScrolledToBottom");

                setShowScrollToBottomButton(!isScrolledToBottom);
              }
            }}
            className={`${style.scrollingContainer} grow rounded-2xl bg-secondary-theme flex flex-col pb-moderate overflow-y-scroll p-moderate gap-5`}
          >
            {chatData?.length > 0 &&
              chatData?.map((item, index) => {
                if (item.sender === mapSender.BOT) {
                  return (
                    <BotMessageComponent
                      index={index}
                      msg={item.message}
                      isBotMessageLoading={
                        botMessageLoading &&
                        index === chatData?.length - 1 &&
                        index !== 0
                      }
                      userMessageRef={
                        index === chatData?.length - 1 ? userMessageRef : null
                      }
                      handleAnimFinished={handleAnimFinished}
                      showTypeWriterAnimation={
                        showTypewriterAnimation &&
                        index === chatData?.length - 1 &&
                        index !== 0
                      }
                    />
                  );
                } else {
                  return (
                    <UserMessageComponent
                      index={index}
                      msg={item.message}
                      //   userImg={userSampleImage as string}
                      userMessageRef={
                        index === chatData?.length - 1 ? userMessageRef : null
                      }
                    />
                  );
                }
              })}
          </div>
        </>
      ) : (
        <div className="grow flex flex-col items-center justify-center gap-2 opacity-50">
          {/* <img src={OncoChatIcon} alt="" className="h-6" /> */}
          <img src={ExcelInsightLogo} alt="" className="h-12" />
          <p className="text-md font-medium text-black text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
            nesciunt?
          </p>
        </div>
      )}
      <div className="relative px-moderate mb-moderate">
        {showScrollToBottomButton && (
          <button
            className="absolute -top-10 left-1/2 bg-white h-8 w-8 rounded-full flex flex-col items-center justify-center"
            onClick={() => {
              userMessageRef?.current?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <KeyboardArrowDown />
          </button>
        )}
        <form onSubmit={formik.handleSubmit}>
          <CustomTextInput
            name="query"
            value={formik.values.query}
            handleChange={formik.handleChange}
            rightIcon={
              <CustomButton
                type="submit"
                buttonStyles={{
                  border: "none",
                  ":hover": {
                    bgcolor: "transparent",
                    border: "none",
                  },
                }}
                btnChild={
                  <span className="bg-primary-background cursor-pointer p-1.5 rounded-full">
                    <KeyboardArrowUp />
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
        </form>
      </div>
    </div>
  );
}
