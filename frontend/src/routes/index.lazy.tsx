import {
  CameraIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/20/solid";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <Features />
      <Team />
    </div>
  );
}

function Features() {
  const features = [
    {
      name: "Scan",
      description: "Scan your document from your device's camera",
      icon: CameraIcon,
    },
    {
      name: "Auto-Fill Forms",
      description: "Auto-Fill forms from your scanned document",
      icon: PencilSquareIcon,
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <BoltIcon className="inline size-6" /> ID-ify
          </h2>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function Team() {
  const people = [
    {
      name: "Devin MacGillivray",
      imageUrl: "https://avatars.githubusercontent.com/u/52307383?v=4",
      role: "",
    },
    {
      name: "Ian Baguio",
      imageUrl:
        "https://media.licdn.com/dms/image/C5603AQG3vfvMrPbxbQ/profile-displayphoto-shrink_800_800/0/1517094766495?e=1717027200&v=beta&t=5reeDCpEseoHu81jZgp7mFXrrtXD_lBqD7CTLiIoCiM",
      role: "",
    },
    { name: "Ricky Zhang", imageUrl: "", role: "" },
    {
      name: "Habib Rahman",
      imageUrl: "https://avatars.githubusercontent.com/u/7229873?v=4",
      role: "",
    },
    {
      name: "Hubert Lin",
      imageUrl: "https://avatars.githubusercontent.com/u/10420994?v=4",
      role: "",
    },
  ];
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our Team
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're building an auto-fill web component to make filling forms more
            accesible, especially for social workers and healthcare
            professionals filling out forms for their patients and clients.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                {person.imageUrl
                  ? (
                    <img
                      className="size-24 rounded-full"
                      src={person.imageUrl}
                    />
                  )
                  : (
                    <UserCircleIcon className="size-24 rounded-full stroke-slate-400 fill-gray-50" />
                  )}
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
