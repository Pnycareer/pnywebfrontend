'use client'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import animation1 from '@/components/Animation/robot.json'

const Animation = () => {
  return (
    <>
      <div className="grid grid-cols-3">
        <div>
        <DotLottieReact
           animationData={animation1}
          loop
          autoplay
        />
        </div>
        {/* <div>
        <DotLottieReact
          src="https://lottie.host/9e015b22-1b77-457b-88ab-51dfea1e736a/81Lv7TNBFW.lottie"
          loop
          autoplay
        />
        </div> */}
        {/* <div>
        <DotLottieReact
          src="https://lottie.host/0237c7cf-ffc2-418e-bee0-7d4fbbc00970/4DM7dCeC9B.lottie"
          loop
          autoplay
        />
        </div> */}
        <div>
        
        </div>
      </div>
    </>
  );
};

export default Animation;
