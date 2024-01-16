import { FaArrowAltCircleUp } from "react-icons/fa";

export default function ScrollToTop() {
  const changeScroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full flex items-center"
        onClick={changeScroll}
      >
        <FaArrowAltCircleUp className="mr-2 " /> Scroll to Top
      </button>
    </>
  );
}
