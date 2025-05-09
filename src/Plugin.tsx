import "./tailwind.css";
import "./index.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IDataEntryPluginProps } from "./Plugin.types";
import { ZipCodeSearch } from "./components/ZipCodeSearch";

const queryClient = new QueryClient();
const PluginInner = (propsFromParent: IDataEntryPluginProps) => {
  const { setFieldValue, values } = propsFromParent;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-white w-lvw flex p-2 text-sm">
        <ZipCodeSearch
          setFieldValue={setFieldValue}
          zipCode={values?.zipCode ?? ""}
        />
      </div>
    </QueryClientProvider>
  );
};

export default PluginInner;
