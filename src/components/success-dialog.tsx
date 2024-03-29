"use client";

import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import Image from "next/image";
import { Contract, Item } from "@/types";
import { useState } from "react";
import Link from "next/link";
import { LoggedInUser } from "@lumx-protocol/embedded-wallet";
import { createLink } from "@/helpers";

export const SuccessDialog = ({
  item,
  hash,
  user,
  setHash,
}: {
  item: Item;
  hash: string;
  user: LoggedInUser;
  setHash: (hash: string) => void;
}) => {
  const [closeModal, setCloseModal] = useState(true);

  return (
    <>
      <Dialog
        open={closeModal}
        onOpenChange={() => {
          setCloseModal(false);
          setHash("");
        }}
      >
        <DialogContent className="sm:max-w-[520px] w-screen h-screen sm:h-auto">
          <div className="flex sm:flex-row flex-col gap-4 sm:items-center pt-6 sm:pt-0">
            <>
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={"image"}
                  className="sm:flex-1 rounded-md w-full sm:w-[232px]"
                  width={232}
                  height={232}
                  objectFit="cover"
                />
              ) : (
                <div className="h-[600px] flex-shrink-0 w-[600px] rounded-md bg-neutral-300" />
              )}
            </>
            <article className="sm:flex-1">
              <h4 className="text-sm leading-[14px] text-neutral-500 font-medium pb-1.5">
                Parabéns
              </h4>
              <h1 className="font-semibold text-xl tracking-[-0.75%] pb-1.5">
                {item.name || "Item Name"}
              </h1>
              <p className="break-words text-neutral-500 text-sm">
                {item.description || "item description"}
              </p>
              <p className="text-sm text-neutral-500 pt-4">
                Você pode{" "}
                <a
                  target="black"
                  href={createLink({
                    href: "polygonscan.com/tx/",
                    path: hash,
                    prodSubdomain: "",
                    testSubdomain: "mumbai.",
                  })}
                  className="underline text-black"
                >
                  verificar na blockchain!
                </a>
              </p>
            </article>
          </div>
          <DialogFooter className="flex-1 gap-2">
            <DialogClose asChild>
              <Button className="!ml-0" variant="outline" type="button">
                Fechar
              </Button>
            </DialogClose>
            <Button className="w-full" asChild>
              <Link
                target="_blank"
                href={createLink({
                  href: "rarible.com",
                  path: `user/${user.walletAddress}/owned`,
                  prodSubdomain: "",
                  testSubdomain: "testnet.",
                })}
              >
                Ver meu perfil
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
