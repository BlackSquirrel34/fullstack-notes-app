import { PageWrapper } from "@/components/page-wrapper";
import { getNotebookById } from "@/server/notebooks";

export default async function NotePage({
  params,
}: {
  params: { notebookId: string };
}) {
  const { notebookId } = await params;

  const { notebook } = await getNotebookById(notebookId);

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: notebook?.name ?? "Notebook",
          href: `/dashboard/notebook/${notebookId}`,
        },
      ]}
    >
      <h1>{notebook?.name}</h1>
    </PageWrapper>
  );
}
