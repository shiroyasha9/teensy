import { appVersion } from "@/constants/config";
import VersionAlertDialog from "./VersionAlertDialog";

const VersionModal = () => {
	return <VersionAlertDialog backendVersion={appVersion} />;
};

export default VersionModal;
