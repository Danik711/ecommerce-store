type TextInputType = {
  type: string;
};

function TextInput({ type }: TextInputType) {
  return (
    <input
      type={type}
      className={"border-b-2 focus:border-mainBlue outline-none"}
    />
  );
}

export default TextInput;
