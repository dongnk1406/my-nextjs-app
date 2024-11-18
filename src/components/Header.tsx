import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  const logout = () => {
    signOut({ callbackUrl: "/login" });
  };
  return (
    <header className="bg-gray-800 text-white py-4 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Welcome {session?.user?.name}!!!
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link className="hover:text-gray-400 transition" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-400 transition" href="/profile">
                Profile
              </Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
