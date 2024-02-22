import { useState, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";
import anime from "animejs";
import "./Search.css";

export const Search = ({ onSearch }: { onSearch: CallableFunction }) => {
  const [value, setValue] = useState<string | undefined>("");
  const [debouncedValue, setDebouncedValue] = useDebounceValue<
    string | undefined
  >("", 500);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);
  useEffect(() => {
    setDebouncedValue(value);
  }, [value]);

  useEffect(() => {
    anime({
      targets: ".search",
      scaleX: "100%",
      opacity: 1,
      duration: 750,
      delay: 700,
    });
  }, []);
  return (
    <>
      <input
        className="search"
        type="text"
        value={value}
        placeholder="Search..."
        onChange={(event) => setValue(event.target.value)}
      />
    </>
  );
};
