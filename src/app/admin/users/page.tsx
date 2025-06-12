import { UsersTable } from "@/presentation/components/admin/components/UsersTable";
import { PageRoot } from "@/presentation/layout/PageRoot";

export default function UsersPage() {
  return (
    <PageRoot>
      <div className="flex flex-1 w-full h-full justify-center pt-6">
        <UsersTable />
      </div>
    </PageRoot>
  );
}
