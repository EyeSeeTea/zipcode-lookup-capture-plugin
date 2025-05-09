import React from "react";
import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";
import { SetFieldValueProps } from "../Plugin.types";
import { useZipCodeLookup } from "../hooks/useZipcodeLookup";
import { MessageBox } from "./MessageBox";

type Props = {
  setFieldValue: (values: SetFieldValueProps) => void;
  zipCode: string;
};

export const ZipCodeSearch = ({ setFieldValue, zipCode }: Props) => {
  const { search, isLoading, message } = useZipCodeLookup({ setFieldValue });
  return (
    <div className={"w-full flex"}>
      <div className={"flex-1"}>{message && <MessageBox {...message} />}</div>
      <Button
        primary
        loading={isLoading}
        onClick={() => search(zipCode)}
        disabled={!zipCode}
      >
        {i18n.t("Search ZIP code")}
      </Button>
    </div>
  );
};
