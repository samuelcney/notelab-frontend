import { UsersTable } from "@/presentation/components/admin/Tables/UsersTable";
import { PageRoot } from "@/presentation/layout/PageRoot";

export default function UsersPage() {
  return (
    <PageRoot>
      <div className="flex flex-1 w-full h-full justify-center pt-6 px-1">
        <UsersTable />
      </div>
    </PageRoot>
  );
}
