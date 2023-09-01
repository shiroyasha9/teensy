import TeensyForm from "./TeensyForm";

type CreateLinkProps = {
  ownerId: string | undefined;
};

const CreateLink = ({ ownerId }: CreateLinkProps) => {
  return <TeensyForm ownerId={ownerId} />;
};

export default CreateLink;
