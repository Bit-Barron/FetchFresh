// pages/Account.tsx

"use client";

import React from "react";
import { UserHook } from "@/components/hooks/user-hook";
import { OrderHook } from "@/components/hooks/order-hook";
import { SettingsSidebar } from "@/components/elements/settingsidebar";
import { toast, Toaster } from "sonner";
import AccountInfoForm from "@/components/elements/account/account-info";
import AddressSummary from "@/components/elements/account/address-summary";
import OrderSummary from "@/components/elements/account/order-summary";
import PersonalInfoForm from "@/components/elements/account/personal-info";
import {
  AccountInfoFormData,
  PersonalInfoFormData,
  User,
} from "@/types/account";

const Account: React.FC = () => {
  const { meQuery, updateUser } = UserHook();
  const { getOrderQuery } = OrderHook();
  const orderCount = getOrderQuery.data?.orders.length || 0;

  const handleUpdateUser = async (
    data: AccountInfoFormData | PersonalInfoFormData
  ) => {
    try {
      await updateUser.mutateAsync(data as any);
      toast.success("Daten erfolgreich gespeichert");
    } catch (error) {
      toast.error(
        "Fehler beim Speichern, bitte versuchen Sie es später erneut"
      );
      console.error("Fehler beim Aktualisieren des Benutzers:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <Toaster richColors position="top-right" />
      <SettingsSidebar />
      <div className="flex-1 p-6 md:p-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Kontoeinstellungen</h1>
        </div>
        <div className="grid gap-8">
          <AccountInfoForm
            user={meQuery.data as User}
            onUpdate={handleUpdateUser}
          />
          <PersonalInfoForm
            user={meQuery.data as User}
            onUpdate={handleUpdateUser}
          />
          <OrderSummary orderCount={orderCount} />
          <AddressSummary
            address={meQuery.data?.address as string}
            zipCode={meQuery.data?.zipCode as string}
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
