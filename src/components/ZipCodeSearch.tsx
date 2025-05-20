import React from "react";
import { NoticeBox } from "@dhis2/ui";
import { SetFieldValueProps } from "../Plugin.types";
import { useZipCodeLookup } from "../hooks/useZipcodeLookup";

type Props = {
  setFieldValue: (values: SetFieldValueProps) => void;
  zipCode: string;
};

export const ZipCodeSearch = ({ setFieldValue, zipCode }: Props) => {
  const { search, message } = useZipCodeLookup({ setFieldValue });
  React.useEffect(() => {
    if (zipCode) {
      search(zipCode);
    }
  }, [zipCode, search]);

  if (!message) {
    return null;
  }

  return (
    <div className="bg-white w-lvw flex p-2 text-sm">
      <div className={"w-full flex"}>
        <div className="flex-1">
          <NoticeBox
            warning={message.type === "warning"}
            error={message.type === "error"}
          >
            {message.text}
          </NoticeBox>
        </div>
      </div>
    </div>
  );
};
