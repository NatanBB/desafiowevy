import { useEffect, useState } from "react"
import { AvatarUser } from "../components/AvatarUser"
import { Input } from "../components/Input";
import { HeaderProps, User } from "../types/commonTypes";
import { useAuth } from "../contexts/AuthContext";

export const Header = ({
  searchCallback
}: HeaderProps) => {
  const [search, setSearch] = useState<string>("");
  const context = useAuth();

  useEffect(() => {
    searchCallback(search);
  }, [search]);

  return (
    <div className="fixed top-0 left-0 w-full z-10">
      <div className="flex justify-end p-4 items-center">
        <div className="mr-4">
          <Input
            handleChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Type to search"
            searchIcon
          />
        </div>
        <AvatarUser
          avatarUrl={context?.user?.avatarUrl}
        />
      </div>
    </div>
  )
}