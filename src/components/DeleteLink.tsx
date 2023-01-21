import { Teensy } from "@prisma/client";
import { trpc } from "../utils/trpc";
import Button from "./Button";

type DeleteLinkProps = {
  currentTeensy: Teensy;
  onClose: () => void;
};

const DeleteLink = ({ currentTeensy, onClose }: DeleteLinkProps) => {
  const deleteTeensy = trpc.deleteSlug.useMutation();

  return (
    <div className="flex w-full flex-col justify-center gap-4 p-8">
      <h1 className="text-center text-2xl sm:text-xl">
        Are you sure you want to delete this teensy?
      </h1>
      <div className="flex flex-row items-center justify-center gap-4">
        <Button
          variant="tertiary"
          onClick={async () => {
            await deleteTeensy.mutateAsync({ id: currentTeensy!.id });
            onClose();
          }}
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
