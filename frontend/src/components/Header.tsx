import { BoltIcon } from "@heroicons/react/20/solid";

export default function Header() {
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl text-center font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            <BoltIcon className="inline size-6" /> ID-ify
          </h2>
        </div>
      </div>
      <hr />
    </>
  );
}
