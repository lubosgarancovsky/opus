import { avatar } from "@/utils/auth";

export const PublicAvatar = ({
  name,
  showName,
}: {
  name: string;
  showName?: boolean;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="rounded-full p-2 bg-slate-200 grid place-items-center h-fit w-fit">
        {avatar(name)}
      </div>
      {showName && <p>{name}</p>}
    </div>
  );
};
