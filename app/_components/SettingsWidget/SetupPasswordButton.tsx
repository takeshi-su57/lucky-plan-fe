"use client";

import { useState } from "react";
import { Input, Button, useDisclosure } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { StandardModal } from "@/components/modals/StandardModal";

import { useMakeSafeApp } from "@/app-hooks/useSystem";

export function SetupPasswordButton() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { makeSafeApp, loading } = useMakeSafeApp();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const handleMakeSafeApp = () => {
    makeSafeApp({
      variables: {
        password: password.trim(),
      },
    });

    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} color="warning" isLoading={loading}>
        Setup Password
      </Button>

      <StandardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Setup Password
          </h1>

          <Input
            className="max-w-xs"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
            value={password}
            onValueChange={setPassword}
            label="Password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />

          <Input
            className="max-w-xs"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibilityConfirm}
              >
                {isVisibleConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
            value={passwordConfirm}
            onValueChange={setPasswordConfirm}
            label="Confirm Password"
            placeholder="Enter your password"
            type={isVisibleConfirm ? "text" : "password"}
            variant="bordered"
          />

          <Button
            onClick={handleMakeSafeApp}
            color="primary"
            isDisabled={
              password.trim() === "" ||
              passwordConfirm.trim() === "" ||
              password.trim() !== passwordConfirm.trim()
            }
          >
            Confirm
          </Button>
        </div>
      </StandardModal>
    </>
  );
}
