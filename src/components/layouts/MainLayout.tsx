import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps): React.ReactElement {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-4 col-span-6">
        <div className="mt-4">
          <Link href="/">
            <div className="rounded-full h-16 w-16 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
