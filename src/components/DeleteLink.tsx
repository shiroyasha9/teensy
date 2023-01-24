import type { Teensy } from "@prisma/client";
import { api } from "../utils/api";
import Button from "./Button";

type DeleteLinkProps = {
  currentTeensy: Teensy;
  onClose: () => void;
};

const DeleteLink = ({ currentTeensy, onClose }: DeleteLinkProps) => {
  const deleteTeensy = api.deleteSlug.useMutation();

  async function deleteTeensyHandler() {
    await deleteTeensy.mutateAsync({ id: currentTeensy.id });
    onClose();
  }

  return (
    <div className="flex w-full flex-col justify-center gap-4 p-8">
      <h1 className="text-center text-2xl sm:text-xl">
        Are you sure you want to delete this teensy?
      </h1>
      <div className="flex flex-row items-center justify-center gap-4">
        <Button
          variant="tertiary"
          onClick={() => void deleteTeensyHandler()}
          title="Delete"
        />

        <Button
          variant="outlined"
          className="border-purple-600 !text-gray-950 hover:border-purple-900"
          onClick={onClose}
          title="Cancel"
        />
      </div>
    </div>
  );
};

export default DeleteLink;
