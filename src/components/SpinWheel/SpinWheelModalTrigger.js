"use client";

import dynamic from "next/dynamic";

const DynamicSpinWheelModal = dynamic(
  () => import("./SpinWheelModal"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function SpinWheelModalTrigger(props) {
  return <DynamicSpinWheelModal {...props} />;
}
