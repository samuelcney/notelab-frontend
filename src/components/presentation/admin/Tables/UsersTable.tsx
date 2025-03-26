"use client";
import { Badge } from "@/components/presentation/badges/Badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/main/hooks/users/useUsers";

export function UsersTable() {
  const { data: users, isPending } = useUsers();
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Cargo</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Data de Criação</TableHead>
          <TableHead className="text-right">Data de Atualização</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!isPending
          ? users?.map((user, index) => (
              <TableRow key={index} className="cursor-pointer h-12">
                <TableCell className="font-medium">
                  <Badge.Role roleName={user.role} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">{user.createdAt}</TableCell>
                <TableCell className="text-right">{user.updatedAt}</TableCell>
              </TableRow>
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-40" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-5 w-24" />
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="text-right">
            Total de Usuários: {users?.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
