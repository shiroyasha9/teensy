"use client";
import CreateLinkForm from "@/components/CreateLink";
import { useAtomValue } from "jotai";
import { isSuccessfulAtom } from "@/store";
import dynamic from "next/dynamic";

const Success = dynamic(() => import("@/components/Success"), {
  ssr: true,
  loading: () => <p>Loading... ⏳</p>,
});

const Home = () => {
  const isSuccessful = useAtomValue(isSuccessfulAtom);
  return <>{isSuccessful ? <Success /> : <CreateLinkForm />}</>;
};

export default Home;
