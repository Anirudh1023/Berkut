import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  return (
    <div
      id="contact"
      className="py-20 min-h-96 w-screen  px-10 bg-berkut-light"
    >
      <div className="relative rounded-lg bg-berkut-dark py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox src="/img/horse.jpg" clipClass="contact-clip-path-1" />
          <ImageClipBox
            src="/img/tea.jpg"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/statue.jpg"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 text-[12px] uppercase z-50">
            Are You Excited For Your Next Adventure?
          </p>

          <AnimatedTitle
            title="let&#39;s create one of the most unforgettable experiences of your life!"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <Button
            title="contact us"
            containerClass="mt-10 cursor-pointer !bg-berkut-tint"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
