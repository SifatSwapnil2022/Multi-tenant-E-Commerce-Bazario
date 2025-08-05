import configPromise from "@payload-config";
import { getPayload } from "payload";
// https:localhost:3000/admin
import { Navbar } from "./navbar";
import { Footer } from "./footer"; // Adjusted import path
import { SearchFilters } from "./search-filters";

interface Props {
  children: React.ReactNode;
}
type CategoryDoc = {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
  subcategories?: {
    docs?: CategoryDoc[];
  };
};

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  });
  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  });
  const formattedData = (data.docs as CategoryDoc[]).map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...doc,
      subcategories: undefined,
    })),
  }));
  console.log("Categories Data:", data, formattedData);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;
