import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string,
  input: ReactNode,
  error?: FieldError,
  vertical?: boolean,
}

export const InputField = ({ label, input, error, vertical }: InputFieldProps) => {
  return (
    <div className="w-full">
      <span className={`${vertical ? " flex-col" : "flex-row"} flex gap-2 rounded-md border border-black bg-white px-4 py-3`}>
        <label className='w-fit font-bold'>{label}:</label>
        {input}
      </span>
      {error && <i>{error.message}</i>}
    </div>
  )
}