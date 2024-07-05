interface ButtonProps {
  type?: "submit" | "reset" | "button";
  styles: string;
  handleSubmit?: (a) => void;
  textButton: string;
  onClick?: (c) => void;
}

export const Button = ({
  type = "button",
  styles,
  handleSubmit,
  textButton,
  onClick
}: ButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      className={styles}
      onSubmit={handleSubmit}
      onClick={onClick}
    >
      {textButton}
    </button>
  )
}