import Image from "next/image";

const CloseFriendItem = ({ session }) => {
  return (
    <div className="close-friend-item flex-shrink-0 cursor-pointer w-[120px] rounded border border-subtext border-dashed px-2 py-2 flex flex-col items-center">
      <div className="profile w-full rounded-full overflow-hidden aspect-square relative">
        <Image src={session.user.image} fill alt="profile" />
      </div>
      <p className="font-semibold text-lg">{session.user.name}</p>
    </div>
  );
};

export default CloseFriendItem;
