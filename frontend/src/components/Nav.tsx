import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex">
        <NavContent onNavigated={() => setMobileMenuOpen(false)} />
      </div>

      <div className="flex md:hidden">
        <button
          className="fixed rounded-lg bg-indigo-600 text-white p-2 m-2 z-50"
          onClick={() => setMobileMenuOpen((o) => !o)}
        >
          {mobileMenuOpen
            ? <ArrowLeftStartOnRectangleIcon className="size-6" />
            : <ArrowRightStartOnRectangleIcon className="size-6" />}
        </button>
        {mobileMenuOpen && (
          <NavContent onNavigated={() => setMobileMenuOpen(false)} />
        )}
      </div>
    </>
  );
}

function NavContent(props: { onNavigated: () => void }) {
  const links = [
    { to: "/", label: "Home" },
    { to: "/license_form", label: "License Form" },
    { to: "/madi_verify_form", label: "Madi Verify" },
  ];
  return (
    <div className="flex w-72 bg-gray-900 px-6">
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <div className="text-2xl font-semibold leading-6 text-gray-200 pt-16 md:pt-12">
              <BoltIcon className="inline size-6" /> ID-ify
            </div>
            <ul role="list" className="-mx-2 pt-6 space-y-1.5">
              {links.map((link) => (
                <li>
                  <Link
                    to={link.to}
                    className={classNames(
                      "text-gray-400 hover:text-white hover:bg-gray-800 [&.active]:text-white [&.active]:underline",
                      "group flex gap-x-3 rounded-md p-2 leading-6 font-semibold",
                    )}
                    onClick={props.onNavigated}
                  >
                    <span className="truncate">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
