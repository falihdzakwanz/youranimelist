import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation";

const UserActionButton = () => {
  const { status } = useSession()
  const disableDashboardButton = ["/users/dashboard"]
  const pathName = usePathname()

  return (
    <div className="flex gap-4 justify-between">


      {status === "authenticated" ?
        !disableDashboardButton.includes(pathName) &&
        <Link href="/users/dashboard" className="bg-color-dark text-color-accent py-1 px-12 inline-block rounded hover:text-color-primary transition-all">Dashboard</Link> : null}
      {status === "authenticated" ?
        <button className="bg-color-dark text-color-accent py-1 px-12 inline-block rounded hover:text-color-primary transition-all" onClick={() => signOut()}>Log Out</button>
        :
        <button className="bg-color-dark text-color-accent py-1 px-12 inline-block rounded hover:text-color-primary transition-all" onClick={() => signIn()}>Log In</button>
      }
    </div>
  );
};

export default UserActionButton;