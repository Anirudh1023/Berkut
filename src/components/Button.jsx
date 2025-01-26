import clsx from "clsx";
import { memo } from "react";

const Button = memo(
  ({ id, title, rightIcon, leftIcon, containerClass, onClick }) => {
    return (
      <button
        id={id}
        className={clsx(
          "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black will-change-transform",
          containerClass
        )}
        onClick={onClick}
      >
        {leftIcon}

        <span className="relative inline-flex overflow-hidden text-xs uppercase will-change-transform">
          <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12 will-change-transform">
            {title}
          </div>
          <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0 will-change-transform">
            {title}
          </div>
        </span>

        {rightIcon}
      </button>
    );
  }
);

export default Button;
