import { Logout } from "@/components/logout";
import { PageWrapper } from "@/components/page-wrapper";

export default function Page() {
  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
      <h1>Dashboard Home</h1>
    </PageWrapper>
  );
}
