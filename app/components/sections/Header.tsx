import React from "react";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-semibold">Slambots Dashboard</h1>
      <nav>
        <ul className="flex space-x-4 gap-5">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          <li>
            <Link href="/login">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
