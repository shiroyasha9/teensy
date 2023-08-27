"use client";
import CreateLinkForm from "@/components/CreateLink";
import Confetti from "react-dom-confetti";
import { useAtomValue } from "jotai";
import { isSuccessfulAtom } from "@/store";
import dynamic from "next/dynamic";

const Success = dynamic(() => import("@/components/Success"), {
  ssr: true,
  loading: () => <p>Loading... ⏳</p>,
});

const config = {
  angle: 90,
  spread: 176,
  startVelocity: 30,
  elementCount: 133,
  dragFriction: 0.07,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const Home = () => {
  const isSuccessful = useAtomValue(isSuccessfulAtom);
  return (
    <>
      <Confetti active={isSuccessful} config={config} />
      {isSuccessful ? <Success /> : <CreateLinkForm />}
    </>
  );
};

export default Home;
