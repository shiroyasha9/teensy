import copy from "copy-to-clipboard";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Toaster, toast } from "react-hot-toast";
import { formAtom, isSuccessfulAtom, teenyUrlAtom } from "../stores";
import Button from "./Button";

const Success = () => {
  const [{ slug }, setForm] = useAtom(formAtom);
  const teenyUrl = useAtomValue(teenyUrlAtom);
  const setIsSuccessful = useSetAtom(isSuccessfulAtom);

  const resetHandler = () => {
    setForm({ slug: "", url: "" });
    setIsSuccessful(false);
  };

  const showToastMessage = () => {
    toast("Link Copied!", {
      icon: "✅",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <>
      <h1 className="mb-5 flex cursor-default justify-center text-5xl text-lemon-400">
        teeny
      </h1>
      <div className="flex flex-col items-center justify-center">
        <h3 className="mb-3 text-xl">
          Successful! 🥳 Here&apos;s your teeny link:{" "}
        </h3>
        <a
          href={`/${slug}`}
          className="mt-1 rounded-2xl bg-gray-200/30 px-3 py-1"
        >
          <h1>{`${teenyUrl}/${slug}`}</h1>
        </a>
      </div>
      <div className="">
        <Button
          title="Copy Link"
          onClick={() => {
            copy(`${window.location.protocol}//${teenyUrl}/${slug}`);
            showToastMessage();
          }}
        />

        <Button
          title="Another one"
          variant="secondary"
          onClick={resetHandler}
        />
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default Success;
