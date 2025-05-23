"use client";

import { useGetUsers } from "@/main/hooks";
import { Skeleton } from "@/presentation/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/ui/table";

import { Badge } from "../../badges/Badge";
import { UserEditDropdown } from "./UserEditDropdown";

export function UsersTable() {
  const { data: users, isPending } = useGetUsers();
  return (
    <Table className="mt-14">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Cargo</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="w-[70px] text-center">Ativo</TableHead>
          <TableHead className="text-right">Data de Criação</TableHead>
          <TableHead className="text-right">Data de Atualização</TableHead>
          <TableHead></TableHead>
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
                <TableCell>
                  <Badge.Status status={user.isActiveUser} />
                </TableCell>
                <TableCell className="text-right">{user.createdAt}</TableCell>
                <TableCell className="text-right">{user.updatedAt}</TableCell>
                <TableCell className="w-full flex justify-center items-center">
                  <UserEditDropdown />
                </TableCell>
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
        <TableRow className="h-12">
          <TableCell colSpan={7} className="text-right">
            Total de Usuários: {users?.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
