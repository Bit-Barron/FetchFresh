import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatPrice } from "@/utils";
import { MinusIcon, PlusIcon, XIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingListHook } from "../hooks/shopping-list-hook";

interface CartDialogProps {
  onClose: () => void;
}


const CartDialog: React.FC<CartDialogProps> = ({ onClose }) => {
  const router = useRouter();
  const { shoppingListQuery, deleteItemMutation, updateItemQuantityMutation } =
    ShoppingListHook();

  const [localShoppingList, setLocalShoppingList] = React.useState(
    shoppingListQuery.data || []
  );

  React.useEffect(() => {
    if (shoppingListQuery.data) {
      setLocalShoppingList((prevList) => {
        return shoppingListQuery.data.map((newItem) => {
          const existingItem = prevList.find((item) => item.id === newItem.id);
          return existingItem || newItem;
        });
      });
    }
  }, [shoppingListQuery.data]);

  const total = localShoppingList.reduce((acc, item) => {
    return acc + (item.price as number) * item.quantity;
  }, 0);

  const deleteItem = async (id: string) => {
    try {
      await deleteItemMutation.mutateAsync({ id } as any);
      setLocalShoppingList((prevList) =>
        prevList.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    shoppingListQuery.refetch();
  };

  const updateItemQuantity = async (id: string, quantity: number) => {
    try {
      if (quantity > 0) {
        await updateItemQuantityMutation.mutateAsync({ id, quantity } as any);
        setLocalShoppingList((prevList) =>
          prevList.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        );
      } else {
        await deleteItem(id);
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
    shoppingListQuery.refetch();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] w-full max-w-[95vw] sm:max-w-[600px] overflow-y-auto rounded-lg bg-white p-3 sm:p-6 shadow-lg">
        <DialogTitle className="text-lg sm:text-2xl font-bold mb-4 flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Warenkorb
        </DialogTitle>

        <div className="space-y-3">
          {localShoppingList.map(
            (item) =>
              item.quantity > 0 && (
                <div
                  key={item.id}
                  className="flex flex-col bg-gray-50 p-2 sm:p-3 rounded-lg shadow-sm"
                >
                  <div className="flex items-center">
                    <Image
                      src={
                        item.imageURL ? decodeURIComponent(item.imageURL) : ""
                      }
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover mr-2 sm:mr-3"
                      style={{ aspectRatio: "1/1", objectFit: "cover" }}
                      unoptimized
                    />
                    <div className="flex-grow min-w-0 mr-2">
                      <h3 className="font-semibold text-sm leading-tight truncate max-w-[150px] sm:max-w-[200px]">
                        {item.name}
                      </h3>
                      <p className="text-green-600 font-medium text-xs">
                        {formatPrice(item.price as number)}€
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 p-1 ml-auto"
                      onClick={() => deleteItem(item.id)}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="h-7 w-7 p-0"
                      >
                        <MinusIcon className="h-3 w-3" />
                      </Button>
                      <span className="w-7 text-center font-medium text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                        className="h-7 w-7 p-0"
                      >
                        <PlusIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>

        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mt-4 w-full">
          <p className="text-base font-medium">Total: {formatPrice(total)}€</p>
        </div>

        <div className="mt-4 space-y-2 w-full">
          <Button variant="outline" onClick={onClose} className="w-full">
            Weiter einkaufen
          </Button>
          <Button
            className="w-full bg-green-700 hover:bg-green-800 text-white"
            onClick={() => {
              onClose();
              router.push("/store/checkout");
            }}
          >
            Weiter zur Kasse
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
