/* eslint-disable react/prop-types */
export default function StyledButton({ btnText, onClick, color }) {
  if (color == "blue")
    return (
      <button
        className={`bg-blue-400 text-white rounded-md px-4`}
        onClick={onClick}
      >
        {btnText}
      </button>
    );

  if (color == "green")
    return (
      <button
        className={`bg-green-400 text-white rounded-md px-4`}
        onClick={onClick}
      >
        {btnText}
      </button>
    );

  if (color == "red")
    return (
      <button
        className={`bg-red-400 text-white rounded-md px-4`}
        onClick={onClick}
      >
        {btnText}
      </button>
    );
}
