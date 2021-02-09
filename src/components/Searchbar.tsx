import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "../hooks";
import { Topic } from "../types";

interface Props {
  items: Topic[];
}

function getFilteredItems(searchText: string, topics: Topic[]) {
  let results: Topic[] = [];
  if (searchText) {
    results = topics.filter(
      (topic) =>
        topic.keywords.filter((keyword) =>
          keyword.toLowerCase().includes(searchText.toLowerCase())
        ).length > 0
    );
  }
  return results;
}

export default function SearchBar({ items }: Props): React.ReactElement {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTerm = useDebounce(searchText, 500);
  const [filteredItems, setFilteredItems] = useState<Topic[] | null>(null);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setFilteredItems(getFilteredItems(debouncedSearchTerm, items));
    } else {
      setFilteredItems(null);
    }
  }, [debouncedSearchTerm, setFilteredItems, items]);

  return (
    <>
      <div
        className={clsx(
          "border-solid border shadow-sm relative py-3 px-6 text-xl border-gray-400 flex items-center bg-white",
          {
            "rounded-lg":
              debouncedSearchTerm === "" ||
              !filteredItems ||
              filteredItems.length === 0,
          },
          {
            "rounded-t-lg": filteredItems && filteredItems.length > 0,
          }
        )}
      >
        <FontAwesomeIcon
          icon={faSearch}
          className="mr-6"
          width="20"
          height="20"
        />
        <input
          type="text"
          name="search"
          className="focus:outline-none w-full"
          placeholder="Search..."
          autoComplete="off"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <FontAwesomeIcon
          icon={faTimes}
          className={clsx(
            "cursor-pointer",
            "ml-6",
            { block: !!searchText },
            { hidden: !searchText }
          )}
          width="13.75"
          height="20"
          onClick={() => setSearchText("")}
        />
        {filteredItems && filteredItems.length > 0 && (
          <div className="absolute top-12 -inset-x-px bg-white border border-gray-400">
            {filteredItems.map((item) => (
              <Link key={item.slug} href={item.slug}>
                <div className="cursor-pointer hover:text-gray-600 hover:bg-gray-200">
                  <div className="p-2">{item.title}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
