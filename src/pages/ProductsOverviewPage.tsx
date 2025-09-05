import { Navigation } from "@/components/ui/navigation";
import { ProductsOverview } from "@/components/ProductsOverview";
import { Footer } from "@/components/Footer";

const ProductsOverviewPage = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <main className="pt-20">
        <ProductsOverview />
      </main>
      <Footer />
    </div>
  );
};

export default ProductsOverviewPage;
