import AddSubscriber from "@/components/AddSubscriber";
import Subscribers from "@/components/Subscribers";

export default function Dashboard() {
  return (
    <div className="w-full min-h-[calc(100vh-10rem)] p-4 sm:p-8 md:p-12 lg:px-16 xl:px-20 space-y-8 lg:space-y-12">
      <AddSubscriber />
      <Subscribers />
    </div>
  );
};
