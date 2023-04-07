import Input from "@/components/Core/Input";
import { useKeyword } from "@/hooks/useKeyword";
import colors from "@/styles/colors";

import { useRef } from "react";
import { FaSearch } from "react-icons/fa";

function Search() {
  const searchRef = useRef<HTMLFormElement>(null);
  const { handleChange, keyword } = useKeyword();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // const handleScroll = () => {
  //   if (window.scrollY < 81) {
  //     searchRef.current?.classList.add("d-none");
  //   } else {
  //     searchRef.current?.classList.remove("d-none");
  //   }
  // };

  // useEffect(() => {
  //   if (router.pathname === "/") {
  //     searchRef.current?.classList.add("d-none");
  //     window.addEventListener("scroll", handleScroll);
  //   } else {
  //     searchRef.current?.classList.remove("d-none");
  //   }

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [router.pathname]);

  return (
    <form
      onSubmit={handleSubmit}
      ref={searchRef}
      className="ml-auto bg-gray-50 flex items-center placeholder:text-dark  gap-2 px-3 focus-within:outline-2 focus:outline-neutral-950 w-full md:min-w-[40%] rounded-md"
    >
      <FaSearch color={colors.secondary} size={15} />
      <Input
        placeholder="Search for food, drinks and more."
        onChange={handleChange}
        value={keyword}
        type="search"
      />
    </form>
  );
}

export default Search;
