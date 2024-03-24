import { useState } from "react";
import { License } from "../types/license";

type Props = {
  onDataReceived: (data: License) => void;
};

export function SecureFillBtn(props: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const idifyImage = async () => {
    setIsLoading(true);

    const sendToServer = () =>
      new Promise<License>((resolve) => {
        setTimeout(() => {
          const data: License = {
            family_name: "Doe",
            given_name: "John",
            address: "123 Main St",
            date_of_birth: "2000-01-01",
            license_number: "123456-123",
            sex: "M",
          };
          resolve(data);
        }, 3000); // 3 seconds
      });

    const data = await sendToServer();
    props.onDataReceived(data);
    setIsLoading(false);
  };

  return (
    <button
      type="button"
      className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow shadow-purple-500/50 dark:shadow dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      onClick={() => idifyImage()}
    >
      {isLoading ? "..." : "Secure Alberta Autofill"}
    </button>
  );
}
