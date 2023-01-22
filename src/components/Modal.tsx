import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiX } from "react-icons/hi";

type ModalProps = {
  children: React.ReactNode;
  showModal: boolean;
  closeModal: () => void;
};

const Modal = ({ children, showModal, closeModal }: ModalProps) => {
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center text-gray-950">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-[90%] max-w-md transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
              {/* Close icon */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 shrink-0 rounded-md p-1 transition hover:bg-gray-100 focus:outline-none"
              >
                <HiX className="h-5 w-5" />
              </button>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
