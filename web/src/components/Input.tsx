import { ChangeEventHandler } from "react";
import { Search } from "tabler-icons-react";

const fixedInputClass = "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-950"

interface InputProps {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  type: "text" | "email" | "password";
  placeholder: string;
  label?: string;
  searchIcon?: boolean;
  useTextArea?: boolean;
  styles?: string;
}

export default function Input({
  handleChange,
  value,
  type,
  placeholder,
  label,
  searchIcon = false,
  useTextArea = false,
  styles
}: InputProps): JSX.Element {
  return (
    <>
      <div>
        {label ? <div> {label} </div> : <></>}
        <div className={label ? "mb-5" : "my-5"}>
          {
            useTextArea ?
              <textarea
                onChange={handleChange as any}
                value={value}
                className={fixedInputClass + ` ${styles}`}
                placeholder={placeholder}
                style={{
                  height: '10rem'
                }}
                maxLength={500}
              />
              :
              <input
                onChange={handleChange}
                value={value}
                type={type}
                className={fixedInputClass + ` ${styles}`}
                placeholder={placeholder}
                maxLength={5000}
              />
          }

          {searchIcon &&
            <div className="absolute inset-y-0 right-20 flex items-center">
              <Search
                size={24}
                strokeWidth={2}
                color={'rgb(107 114 128)'}
              />
            </div>
          }
        </div>
      </div>
    </>
  )
}