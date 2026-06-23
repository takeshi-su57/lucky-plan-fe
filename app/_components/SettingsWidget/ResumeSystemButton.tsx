"use client";

import { useState } from "react";
import { Input, Button, useDisclosure } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { StandardModal } from "@/components/modals/StandardModal";

import { useIsSafeApp, useResumeSystem } from "@/app-hooks/useSystem";

export function ResumeSystemButton() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { resumeSystem, loading } = useResumeSystem();
  const { data: isSafeApp } = useIsSafeApp();

  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleResumeSystem = () => {
    resumeSystem({
      variables: {
        password,
      },
    });

    onClose();
  };

  const handleClickResumeButton = () => {
    if (isSafeApp?.isSafeApp) {
      onOpen();
    } else {
      resumeSystem({
        variables: {
          password: null,
        },
      });
    }
  };

  return (
    <>
      <Button
        onPress={handleClickResumeButton}
        color="primary"
        isLoading={loading}
      >
        Resume System
      </Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
            Password
          </h1>

          <Input
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

          <Button
            onPress={handleResumeSystem}
            color="primary"
            isDisabled={password.trim() === ""}
          >
            Confirm
          </Button>
        </div>
      </StandardModal>
    </>
  );
}
