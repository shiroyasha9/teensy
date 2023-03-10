import { api } from "$utils/api";
import type { Teensy } from "@prisma/client";
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
    <div className="mt-6 flex w-full flex-col justify-center gap-4 p-8">
      <h1 className="text-center text-lg">
        Are you sure you want to delete this teensy?
      </h1>
      <div className="flex flex-row items-center justify-center gap-4">
        <Button
          variant="danger"
          onClick={() => void deleteTeensyHandler()}
          title="Delete"
          className="w-full"
        />

        <Button
          variant="outlined"
          className="w-full !text-black dark:!text-white"
          onClick={onClose}
          title="Cancel"
        />
      </div>
    </div>
  );
};

export default DeleteLink;
