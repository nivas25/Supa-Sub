import Coupons from "@/components/coupons/Coupons";

export const metadata = {
  title: "Coupons | SubStarter",
  description: "Manage your discount codes and promotions",
};

export default function CouponsPage() {
  return (
    <main>
      <Coupons />
    </main>
  );
}
