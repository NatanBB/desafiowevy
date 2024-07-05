interface ToggleButtonProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

export const ToggleButton = ({
  label,
  isChecked,
  onChange
}: ToggleButtonProps): JSX.Element => {
  return (
    <div>
      <input
        type="radio"
        name="option"
        id={label}
        className="peer hidden"
        defaultChecked={isChecked}
      />
      <label
        htmlFor={label}
        onClick={onChange}
        className="block cursor-pointer select-none rounded-xl p-[0.4rem] text-center peer-checked:bg-gray-800 peer-checked:font-bold peer-checked:text-white"
      >
        {label}
      </label>
    </div>
  );
};