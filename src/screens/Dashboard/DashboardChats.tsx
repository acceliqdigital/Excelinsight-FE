import CustomTextInput from "@/components/CustomInputs/CustomTextInput";
import {
  API_END_POINTS,
  ApiStatusCodes,
  BASE_URL,
  colors,
  fetchData,
  GenericObjectInterface,
  headersList,
  postData,
} from "@/utilities";
import { useFormik } from "formik";
import CustomButton from "@/components/CustomButton";
import { DummyImage, ExcelInsightLogo } from "@/assets";
import { LegacyRef, useCallback, useEffect, useRef, useState } from "react";
import {
  AccountCircle,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import style from "./dashboardChatsStyles.module.scss";
import ExcelIcon from "@/components/ExcelIcon/ExcelIcon";
// import LottieAnimationProvider from "@/components/LottieProvider/LottieAnimationProvider";
import TypeWriterUI from "@/components/TypeWriterUI/TypeWriterUI";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/combineStore";
import { useNavigate } from "react-router-dom";
import { routes } from "@/utilities/routes";
import CustomLoader from "@/components/customLoaders/CustomLoader";
import markdownit from 'markdown-it'

export interface ChatSpaceInput {
  query: string;
}

const mapSender = {
  USER: "user",
  BOT: "bot",
};
const initialQuestionsType = "initial_questions";

const BotMessageComponent = ({
  index,
  msg,
  isImage,
  userMessageRef,
  isBotMessageLoading,
  handleAnimFinished,
  metaData,
  showTypeWriterAnimation,
  handleRespondInitialQuestion,
}: {
  msg: string;
  isImage: boolean;
  index: number;
  size?: "small" | "medium";
  userMessageRef: LegacyRef<HTMLDivElement>;
  isBotMessageLoading?: boolean;
  handleAnimFinished: () => void;
  metaData?: { type: "initial_questions"; questionId: string };
  showTypeWriterAnimation: boolean;
  handleRespondInitialQuestion: (param: boolean, questionId: string) => void;
}) => {
  const md = markdownit()

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
          // <LottieAnimationProvider
          //   animationFile={AnimatedLoader}
          //   height={55}
          //   width={55}
          //   lottieStyle={{ paddingLeft: 8, marginTop: -12 }}
          // />
          // <CircularProgress size={20} />
          <CustomLoader />
        ) : isImage ? (
          <img
            src={`data:image/png;base64, ${msg}`}
            alt=""
            className="h-[450px] rounded-md overflow-hidden"
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
            className={`${style.botResponseMarkdown} text-justify rounded-md lg:text-[16px] text-md-1 px-basic min-w-[100px] overflow-hidden font-medium break-words`}
            style={{
              color:
                msg ===
                `Something went wrong while fetching your data. Please try again later!`
                  ? "rgba(255, 40, 40, 1)"
                  : colors.BLACK,
            }}
            dangerouslySetInnerHTML={{__html: md.render(msg)}}
          >
            {/* {md.render(msg)} */}
          </div>
        )}

        {metaData &&
          metaData.type === initialQuestionsType &&
          userMessageRef !== null && (
            <>
              <div className="flex items-center gap-3 mt-large">
                {/* <span className="text-md-1 font-medium italic text-grey" >Select your answer:</span> */}
                <CustomButton
                  btnChild="Yes"
                  variant="contained"
                  buttonStyles={{
                    borderRadius: "99px",
                    bgcolor: colors.BLACK,
                    height: "30px",
                    textTransform: "capitalize",
                  }}
                  handleClick={useCallback(
                    () =>
                      handleRespondInitialQuestion(true, metaData.questionId),
                    []
                  )}
                />
                <CustomButton
                  btnChild="No"
                  variant="outlined"
                  buttonStyles={{
                    borderRadius: "99px",
                    bgcolor: "transparent",
                    borderColor: colors.BLACK,
                    ":hover": { borderColor: colors.BLACK },
                    color: colors.BLACK,
                    height: "30px",
                    textTransform: "capitalize",
                  }}
                  handleClick={useCallback(
                    () =>
                      handleRespondInitialQuestion(false, metaData.questionId),
                    []
                  )}
                />
              </div>
            </>
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

const SampleQuestionsCards = ({
  question,
  hanleSubmitSampleQuestion,
}: {
  question: string;
  hanleSubmitSampleQuestion: (question: string) => void;
}) => {
  return (
    <button
      onClick={() => hanleSubmitSampleQuestion(question)}
      className="bg-white shadow-shadow-md flex flex-col justify-center p-moderate rounded-lg w-[250px] h-[100px]"
    >
      <span className="font-medium text-md-1">{question}</span>
    </button>
  );
};

export default function ChatSpace() {
  const navigate = useNavigate();
  const { chatSessionId } = useSelector(
    (state: RootState) => state.chatStateReducer
  );
  const { userToken } = useSelector(
    (state: RootState) => state.userStateReducer
  );
  const [botMessageLoading, setBotMessageLoading] = useState(false);
  const [chatData, setChatData] = useState<GenericObjectInterface[]>([]);
  const [showScrollToBottomButton, setShowScrollToBottomButton] =
    useState(false);
  const [showTypewriterAnimation, setShowTypewriterAnimation] = useState(false);
  const [initialQuestionLoading, setInitialQuestionLoading] = useState(false);
  const [initialQuestions, setInitialQuestions] = useState<
    GenericObjectInterface[]
  >([]);
  const [initialQuestionsCompleted, setInitialQuestionsCompleted] =
    useState(false);
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
    if (
      chatData[chatData?.length - 1]?.sender === mapSender.USER &&
      userMessageRef.current
    ) {
      userMessageRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (userMessageRef.current && !showScrollToBottomButton) {
      userMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatData, showScrollToBottomButton]);

  const handleStartQuestioning = async () => {
    setInitialQuestionLoading(true);
    try {
      const headerList = {
        ...headersList,
        Authorization: `Token ${userToken}`,
      };
      const response: GenericObjectInterface = await fetchData(
        headerList,
        null,
        `${API_END_POINTS.EXCEL_QUESTIONS}?sessionid=${chatSessionId}`
      );
      if (response.status === ApiStatusCodes.SUCCESS) {
        setInitialQuestions(
          response?.data?.filter(
            (el: GenericObjectInterface) => !el?.completed_status
          )
        );
        setTimeout(() => {
          setChatData([
            {
              id: chatData?.length + 1,
              sender: mapSender.BOT,
              message: `${
                response?.data?.find(
                  (el: GenericObjectInterface) => !el?.completed_status
                )?.question
              }`,
              meta: {
                type: initialQuestionsType,
                questionId: response?.data?.find(
                  (el: GenericObjectInterface) => !el?.completed_status
                )?.questionid,
              },
            },
          ]);
        }, 500);
      }
    } catch (error) {
    } finally {
      setInitialQuestionLoading(false);
    }
  };

  const handleAnswerInitialQuestions = async (
    reply: boolean,
    qestionId: string
  ) => {
    const isLastQuestion =
      initialQuestions?.findIndex((item) => item?.questionid === qestionId) ===
      initialQuestions?.length - 1;

    setChatData((prev) => [
      ...prev,
      {
        id: chatData?.length + 1,
        sender: mapSender.USER,
        message: `${reply ? "Yes." : "No."}`,
      },
    ]);
    try {
      const headerList = {
        ...headersList,
        Authorization: `Token ${userToken}`,
      };
      const data = {
        questionid: qestionId,
        process_query: reply ? "True" : "False",
      };
      await postData(
        headerList,
        data,
        `${API_END_POINTS.EXCEL_QUESTIONS}?sessionid=${chatSessionId}`
      );
      if (!isLastQuestion) {
        setTimeout(() => {
          setChatData((prev) => [
            ...prev,
            {
              id: chatData?.length + 1,
              sender: mapSender.BOT,
              message: `${initialQuestions[prev?.length / 2]?.question}`,
              meta: {
                type: initialQuestionsType,
                questionId: initialQuestions[prev?.length / 2]?.questionid,
              },
            },
          ]);
        }, 500);
      } else {
        setInitialQuestionsCompleted(true);
      }
    } catch (error) {}
  };

  const handleSubmitMessage = useCallback(
    (query: string) => {
      if (query?.length > 0) {
        formik.setFieldValue("query", "");
        initializeMessage(query);
      }
    },
    [chatData]
  );

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

    try {
      const data = {
        message: message,
        sessionid: chatSessionId,
      };
      const headerList = {
        ...headersList,
        Authorization: `Token ${userToken}`,
      };
      const response = await axios.post(
        `${BASE_URL}${API_END_POINTS.EXCEL_CHATS}`,
        data,
        {
          headers: headerList,
        }
      );
      console.log(
        response?.data,
        response?.data?.llmresponse,
        "response?.data?.llmresponse"
      );

      setShowTypewriterAnimation(true);
      setChatData((prevData) => [
        ...prevData.slice(0, prevData.length - 1),
        {
          ...prevData[prevData.length - 1],
          message: response?.data?.llmresponse?.response,
          isImage: response?.data?.llmresponse?.is_plot,
        },
      ]);
    } catch (error: any) {
      console.log(error, "error");

      setChatData((prevData) => [
        ...prevData.slice(0, prevData.length - 1),
        {
          ...prevData[prevData.length - 1],
          message:
            "Something went wrong while fetching your data. Please try again later!",
        },
      ]);
    } finally {
      setBotMessageLoading(false);
    }
  };

  const handleAnimFinished = useCallback(() => {
    setShowTypewriterAnimation(false);
  }, []);

  return (
    <div className="flex flex-col grow bg-secondary-theme overflow-hidden relative">
      <CustomButton
        variant="contained"
        buttonStyles={{
          width: 100,
          backgroundColor: colors.BLACK,
          opacity: 0.8,
          textTransform: "capitalize",
          fontWeight: "500",
          position: "absolute",
          right: 20,
          top: 15,
          zIndex: 10,
          display: initialQuestionsCompleted ? "flex" : "none",
        }}
        handleClick={useCallback(() => {
          navigate(`${routes.UPLOAD}`);
        }, [])}
        btnChild="Next >"
      />
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
                setShowScrollToBottomButton(!isScrolledToBottom);
              }
            }}
            className={`${style.scrollingContainer} pr-[100px] grow rounded-2xl bg-secondary-theme flex flex-col overflow-y-scroll p-moderate gap-5`}
          >
            {chatData?.length > 0 &&
              chatData?.map((item, index) => {
                if (item.sender === mapSender.BOT) {
                  return (
                    <BotMessageComponent
                      index={index}
                      msg={item.message}
                      isImage={item?.isImage}
                      metaData={item?.meta}
                      isBotMessageLoading={
                        botMessageLoading &&
                        index === chatData?.length - 1 &&
                        index !== 0
                      }
                      // isLatest = {index === chatData?.length -1}
                      userMessageRef={
                        index === chatData?.length - 1 ? userMessageRef : null
                      }
                      handleAnimFinished={handleAnimFinished}
                      showTypeWriterAnimation={
                        showTypewriterAnimation &&
                        index === chatData?.length - 1 &&
                        index !== 0
                      }
                      handleRespondInitialQuestion={
                        handleAnswerInitialQuestions
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
        <div className="grow flex flex-col items-center justify-center gap-4 opacity-75">
          <span className="text-lg-1 font-semi-bold">Welcome to,</span>
          <img src={ExcelInsightLogo} alt="" className="h-24" />
          <p className="text-md font-semi-bold text-black text-center w-1/2">
            Before you start chatting with our AI, we need you to answer a few
            questions. This will help us provide you with a better and more
            personalized experience. Thank you for your cooperation!
          </p>
          <CustomButton
            variant="contained"
            showLoader={initialQuestionLoading}
            buttonStyles={{
              backgroundColor: colors.BLACK,
              textTransform: "capitalize",
            }}
            handleClick={handleStartQuestioning}
            btnChild={"Continue"}
          />
        </div>
      )}
      <div className="relative px-moderate mb-moderate">
        {showScrollToBottomButton && (
          <button
            className="absolute -top-10 left-1/2 shadow-shadow-md bg-white h-8 w-8 rounded-full flex flex-col items-center justify-center"
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
                disabled={!initialQuestionsCompleted}
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
            disabled={!initialQuestionsCompleted}
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
