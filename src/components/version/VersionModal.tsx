import VersionAlertDialog from "./VersionAlertDialog";
import { appVersion } from "@/constants/config";

const VersionModal = () => {
  return <VersionAlertDialog backendVersion={appVersion} />;
};

export default VersionModal;
