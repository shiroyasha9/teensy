import { kv } from "@vercel/kv";
import VersionAlertDialog from "./VersionAlertDialog";

const VersionModal = async () => {
  const backendVersion = (await kv.get("teensyVersion")) as string;
  return <VersionAlertDialog backendVersion={backendVersion} />;
};

export default VersionModal;
