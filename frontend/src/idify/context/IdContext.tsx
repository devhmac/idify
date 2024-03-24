import { createContext, useState } from "react";
import { License } from "../../types/license";

const defaultVal = {
  licenceData: {
    given_name: "",
    middle_name: "",
    family_name: "",
    date_of_birth: "",
    address: "",
    license_number: "",
    sex: "M",
  } as License,
  setLicenceData: (licenceData: License) => {},
};

export const LicenceContext = createContext(defaultVal);

export const LicenceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [licenceData, setLicenceData] = useState(defaultVal.licenceData);

  return (
    <LicenceContext.Provider value={{ licenceData, setLicenceData }}>
      {children}
    </LicenceContext.Provider>
  );
};
