import { useState } from "react";
import { useQueryClient } from "react-query";
import { useCookies } from "react-cookie";
import { useToast } from "./ui/use-toast";

import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

interface TableActionsProps {
  _id: string;
  name: string;
  isBlocked: boolean;
};

export default function TableActions({
  _id,
  name,
  isBlocked
} : TableActionsProps) {
  const [isLoadingBlock, setIsLoadingBlock] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const queryClient = useQueryClient();
  const [cookies, _] = useCookies(["token"]);

  const { toast } = useToast();

  async function blockAccount() {
    setIsLoadingBlock(true);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/subscriptions/update/${_id}`, JSON.stringify({ isBlocked: !isBlocked }), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies?.token}`,
        }
      });

      if(response.status === 200 && response.data) {
        toast({
          title: 'Success!',
          description: `${name}'s status has been updated.`,
        });
        queryClient.refetchQueries('users');
      };
    } catch (error) {
      toast({
        title: 'Oops! something went wrong.',
        description: 'If this error persists please contact the website owner.',
      });
    } finally {
      setIsLoadingBlock(false);
    };
  };

  async function deleteAccount() {
    setIsLoadingDelete(true);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/subscriptions/remove/${_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies?.token}`,
        },
      });
      if(response.status === 200 && response.data) {
        toast({
          title: 'Success!',
          description: `${name}'s subscriptions has been deleted.`,
        });
        queryClient.refetchQueries('users');
      };
    } catch (error) {
      toast({
        title: 'Oops! something went wrong.',
        description: 'If this error persists please contact the website owner.',
      });
    } finally {
      setIsLoadingDelete(false);
    };
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Icons.moreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={isLoadingBlock} onClick={blockAccount}>
          {isLoadingBlock && <Icons.loader className="w-4 h-4 animate-spin" />}
          {isLoadingBlock ? "Please wait" : isBlocked ? "Unblock Account" : "Block Account"}
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isLoadingDelete} onClick={deleteAccount}>
          {isLoadingDelete && <Icons.loader className="w-4 h-4 animate-spin" />}
          {isLoadingDelete ? "Please wait" : "Delete Account"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
