"use client";

export const EditProfileModal = () => {
  return (
    <div className="flex flex-1 w-full justify-between flex-col">
      <div className="flex flex-col flex-1 p-1 gap-2 w-full">
        <h1 className="text-xl font-semibold tracking-wider">
          Dados da conta:
        </h1>
        <span className="w-full h-[1px] bg-light-gray" />

        <div className="flex items-center w-full justify-center pt-4"></div>
      </div>
    </div>
  );
};
