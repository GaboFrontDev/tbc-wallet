"use client";

import { useRouter } from "next/navigation";

export default function LinkWithAction(props: {
  href: string;
  children: React.ReactNode;
}) {
  const { href, children } = props;
  const router = useRouter();
  async function makeRequestWithUserGesture() {
    const hasAccess = await document.hasStorageAccess();
    if (hasAccess) {
      console.log("granted");
      router.push(href);
      return;
    }
    var promise = document.requestStorageAccess();
    promise.then(
      function () {
        console.log("granted");
      },
      function () {
        // Storage access was denied.
      }
    );
  }

  return (
    <button className="my-2" onClick={makeRequestWithUserGesture}>
      {children}
    </button>
  );
}
