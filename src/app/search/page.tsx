import dynamic from "next/dynamic";

const SearchComponent = dynamic(() => import("@/app/components/Search"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

export default function SearchPage() {
  return <>
    <SearchComponent />
  </>;
}
