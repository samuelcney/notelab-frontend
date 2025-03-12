import { UsersTable } from "@/components/admin/Tables/UsersTable";
import { PageRoot } from "@/components/layout/PageRoot";

export default function UsersPage() {
  return (
    <PageRoot>
      <div className="flex flex-1 w-full items-center h-full justify-center px-2">
        <UsersTable />
      </div>
    </PageRoot>
  );
}
