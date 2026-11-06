import AnimatedRipple from "./components/animated-ripple";

const ButtonWithRipple = () => (
  <button
    type="button"
    className="relative overflow-hidden rounded-lg bg-blue-600 px-6 py-3 text-white"
  >
    Confirm
    <AnimatedRipple />
  </button>
);

export default ButtonWithRipple;