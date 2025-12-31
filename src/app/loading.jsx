import Spinner from "../components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <Spinner />
    </div>
  );
}
