import { useContext, useEffect, useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import { Idify } from "../idify/components/Idify";
import { RadioGroup } from "@headlessui/react";

import { LicenceContext } from "../idify/context/IdContext";

export const Route = createLazyFileRoute("/license_form")({
  component: LicenseForm,
});

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function LicenseForm() {
  const { licenceData } = useContext(LicenceContext);

  // useffect for confirming data coming through to form

  const genderOptions = [
    {
      name: "M (Male)",
      value: "M",
    },
    {
      name: "F (Female)",
      value: "F",
    },
    {
      name: "X (Unspecified)",
      value: "X",
    },
  ];

  const [given_name, setGivenName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [family_name, setFamilyName] = useState("");
  const [birth_day, setBirthDay] = useState("");
  const [birth_month, setBirthMonth] = useState("");
  const [birth_year, setBirthYear] = useState("");
  const [gender, setGender] = useState("M");
  useEffect(() => {
    if (Object.keys(licenceData).length === 0) return;
    console.log(licenceData);

    const birthdate = new Date(licenceData.date_of_birth);

    setGivenName(licenceData.given_name);
    setFamilyName(licenceData.family_name);
    setBirthDay(birthdate.getDate().toString());

    setBirthMonth(`${birthdate.getMonth() + 1}`); // months are 0 indexed
    setBirthYear(birthdate.getFullYear().toString());
    setGender(licenceData.sex);
  }, [licenceData]);

  return (
    <div>
      <Header></Header>
      <div>
        <form className="bg-white max-w-md w-full font-acumin mx-auto rounded-lg p-12 m-12">
          <h1 className="text-center text-2xl font-bold py-4">
            Update personal information
          </h1>
          <div className="py-2">
            <label
              htmlFor="first-name"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={given_name}
                onChange={(event) => {
                  setGivenName(event.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="middle-name"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Middle Name(s) (optional)
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="middle-name"
                id="middle-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={middle_name}
                onChange={(event) => {
                  setMiddleName(event.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Last Name:
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={family_name}
                onChange={(event) => {
                  setFamilyName(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="inline-block w-full pl-0 p-4">
            <label
              htmlFor="birthdate"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              DOB (Date Of Birth)
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="birth-day"
                id="birth-day"
                className="inline-block w-1/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="DD"
                value={birth_day}
                onChange={(event) => {
                  setBirthDay(event.target.value);
                }}
              />
              <input
                type="text"
                name="month"
                id="month"
                className="inline-block w-1/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="MM"
                value={birth_month}
                onChange={(event) => {
                  setBirthMonth(event.target.value);
                }}
              />
              <input
                type="number"
                min={1900}
                max={2024}
                name="year"
                id="year"
                placeholder="YYYY"
                className="inline-block w-1/4 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={birth_year}
                onChange={(event) => {
                  setBirthYear(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium leading-6 text-gray-900">
                Gender
              </h2>
            </div>

            <RadioGroup
              value={gender}
              onChange={setGender}
              className="mt-2 w-full"
            >
              <RadioGroup.Label className="sr-only">Sex</RadioGroup.Label>
              <div className="grid grid-cols-3 gap-3">
                {genderOptions.map((option) => (
                  <RadioGroup.Option
                    key={option.name}
                    value={option.value}
                    className={({ active, checked }) =>
                      classNames(
                        "cursor-pointer focus:outline-none",
                        active ? "ring-2 ring-indigo-600 ring-offset-2" : "",
                        checked
                          ? "bg-indigo-600 text-white hover:bg-indigo-500"
                          : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                        "flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1",
                      )}
                  >
                    <RadioGroup.Label as="span" className="text-center">
                      {option.name}
                    </RadioGroup.Label>
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
          <div className="mt-4">
            <Idify />
          </div>
        </form>
      </div>
    </div>
  );
}
