import Lottie from "lottie-react";
import { lottieAnimProviderProptypes } from "@utilities/index";

function LottieAnimationProvider({
  animationFile,
  height = 250,
  width = 250,
  autoplay = true,
  loop = true,
  lottieStyle,
  handleAnimationEnd,
  classNameLottie,
}: lottieAnimProviderProptypes) {
  return (
    <>
      <Lottie
        className={classNameLottie}
        animationData={animationFile}
        loop={loop}
        style={{ height: height, width: width, ...lottieStyle }}
        autoplay={autoplay}
        // onAnimationEnd={handleAnimationEnd}
        onComplete={handleAnimationEnd}
        // onLoopComplete={()=>console.log("loop ended")}
      />
    </>
  );
}

export default LottieAnimationProvider;
