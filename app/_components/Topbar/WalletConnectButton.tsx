"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAccount, useSignMessage, useDisconnect, useChainId } from "wagmi";
import { useSnackbar } from "notistack";
import { useApolloClient } from "@apollo/client/react";
import dynamic from "next/dynamic";

import { useUserJWT } from "@/app/_hooks/useUserJWT";
import { Button } from "@heroui/react";
import { FaArrowDown, FaExclamationTriangle, FaPowerOff } from "react-icons/fa";

const ConnectButton = dynamic(
  () =>
    import("@rainbow-me/rainbowkit").then((mod) => mod.ConnectButton.Custom),
  {
    ssr: false,
  },
);

export default function WalletConnectButton() {
  const { enqueueSnackbar } = useSnackbar();

  const { userJwtQuery, signin, signout } = useUserJWT();

  const account = useAccount();
  const chainId = useChainId();
  const client = useApolloClient();

  const { signMessage } = useSignMessage();
  const { disconnect } = useDisconnect();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (
      chainId &&
      isConnected &&
      account.address &&
      userJwtQuery.isFetched &&
      (!userJwtQuery.data ||
        (userJwtQuery.data.address.toLowerCase() !==
          account.address.toLowerCase() &&
          (!userJwtQuery.data.secondAddress ||
            userJwtQuery.data.secondAddress.toLowerCase() !==
              account.address.toLowerCase())) ||
        userJwtQuery.data.expirationTime < Date.now())
    ) {
      const timestamp = Date.now();

      const issuedAt = new Date(timestamp).toISOString();
      const expiresAt = new Date(timestamp + 1 * 3600 * 1000).toISOString();

      signMessage(
        {
          message: [
            "Welcome to Lucky Plans!",
            `Issued At: ${issuedAt}`,
            `Expires At: ${expiresAt}`,
          ].join("\n\n"),
        },
        {
          onSuccess: (data: string) => {
            if (!account.address) {
              return;
            }

            signin({
              variables: {
                singature: data,
                timestamp: `${timestamp}`,
                walletAddress: account.address,
              },
            });
          },
          onError: () => {
            enqueueSnackbar("Failed at Sign Message", {
              autoHideDuration: 5000,
              variant: "error",
            });
            disconnect();
            client.resetStore();
          },
        },
      );
    }
  }, [
    account.status,
    account.address,
    signMessage,
    userJwtQuery.data,
    userJwtQuery.isFetched,
    enqueueSnackbar,
    disconnect,
    isConnected,
    signin,
    chainId,
    client,
  ]);

  useEffect(() => {
    if (!isConnected && account.status === "connected") {
      setIsConnected(true);
    }
  }, [account.status, isConnected]);

  useEffect(() => {
    if (
      isConnected &&
      account.status === "disconnected" &&
      userJwtQuery.data &&
      userJwtQuery.isFetched
    ) {
      signout();
    }
  }, [
    account,
    userJwtQuery.data,
    userJwtQuery.isFetched,
    signout,
    isConnected,
  ]);

  return (
    <ConnectButton>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        connectModalOpen,
        mounted,
      }) => {
        const handleWalletConnect = () => {
          openConnectModal();
        };

        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (connectModalOpen) {
                return (
                  <Button
                    variant="ghost"
                    onPress={openConnectModal}
                    size="sm"
                    className="border-default-200 text-foreground flex h-8 w-fit rounded-lg px-3 text-xs font-semibold"
                    isLoading={true}
                  >
                    Connecting...
                  </Button>
                );
              }

              if (!connected) {
                return (
                  <Button
                    color="primary"
                    onPress={() => {
                      handleWalletConnect();
                    }}
                    size="sm"
                    className="h-8 w-fit rounded-lg px-3 text-xs font-semibold"
                  >
                    Connect Wallet
                    <FaPowerOff />
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    variant="ghost"
                    color="danger"
                    onPress={openChainModal}
                    size="sm"
                    className="h-8 rounded-lg border-red-500/30 text-xs text-red-400"
                  >
                    <FaExclamationTriangle size={20} className="text-red-600" />
                    Wrong Network
                  </Button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onPress={openChainModal}
                    size="sm"
                    className="border-default-200 text-foreground h-8 rounded-lg px-3 text-xs font-semibold"
                  >
                    {chain.iconUrl ? (
                      <Image
                        src={chain.iconUrl}
                        alt="Chain Icon"
                        height={20}
                        width={20}
                      />
                    ) : null}
                    <span className="hidden md:inline">
                      {chain.name ? chain.name : ""}
                    </span>
                    <FaArrowDown size={10} className="text-gray-400" />
                  </Button>

                  <Button
                    variant="ghost"
                    onPress={openAccountModal}
                    size="sm"
                    className="border-default-200 text-foreground h-8 rounded-lg px-3 text-xs font-semibold"
                  >
                    {chain.iconUrl ? (
                      <Image
                        src={chain.iconUrl}
                        alt="Chain Icon"
                        height={20}
                        width={20}
                      />
                    ) : null}
                    <span className="hidden md:inline">
                      {account.address.substring(0, 7)}
                    </span>
                    <FaArrowDown size={10} className="text-gray-400" />
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton>
  );
}
