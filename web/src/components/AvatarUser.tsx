import { AvatarUserProps } from "../types/commonTypes"

export const AvatarUser = ({
  avatarUrl
}: AvatarUserProps): JSX.Element => {
  return (
    <div className="flex overflow-hidden">
      <img
        className="inline-block h-10 w-10 rounded-full ring-1 ring-gray-700"
        src={avatarUrl}
        alt="Avatar Icon"
      />
    </div>
  )
}