import copy from "copy-to-clipboard";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-hot-toast";
import { formAtom, isSuccessfulAtom, teensyUrlAtom } from "../stores";
import Button from "./Button";

const Success = () => {
  const [{ slug }, setForm] = useAtom(formAtom);
  const teensyUrl = useAtomValue(teensyUrlAtom);
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
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center  justify-center">
        <h3 className="mb-3 text-xl">
          Successful! 🥳 Here&apos;s your teensy:{" "}
        </h3>
        <a
          href={`/${slug}`}
          className="mt-1 rounded-2xl bg-gray-200/30 px-3 py-1"
        >
          <h1>{`${teensyUrl}/${slug}`}</h1>
        </a>
      </div>
      <div className="">
        <Button
          title="Copy Link"
          onClick={() => {
            copy(`${window.location.protocol}//${teensyUrl}/${slug}`);
            showToastMessage();
          }}
        />

        <Button
          title="Another one"
          variant="secondary"
          onClick={resetHandler}
        />
      </div>
    </div>
  );
};

export default Success;
