import { showAuthModalAtom } from "@/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import Login from "./Login";

const AuthModal = () => {
  const [disabled, setDisabled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useAtom(showAuthModalAtom);

  const closeModal = () => {
    setShowAuthModal(false);
  };

  // Reset modal
  useEffect(() => {
    if (!showAuthModal) {
      // Wait for 200ms for aniamtion to finish
      setTimeout(() => {
        setDisabled(false);
      }, 200);
    }
  }, [showAuthModal]);

  // Remove pending toasts if any
  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <Modal showModal={showAuthModal} closeModal={closeModal}>
      <Login />
    </Modal>
  );
};

export default AuthModal;
