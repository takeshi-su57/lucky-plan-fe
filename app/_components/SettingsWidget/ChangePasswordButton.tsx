"use client";

import { useState } from "react";
import { Input, Button, useDisclosure, Divider } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { StandardModal } from "@/components/modals/StandardModal";

import { useChangePassword } from "@/app-hooks/useSystem";

export function ChangePasswordButton() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { changePassword, loading } = useChangePassword();

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const [isVisibleOld, setIsVisibleOld] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);
  const toggleVisibilityOld = () => setIsVisibleOld(!isVisibleOld);

  const handleChangePassword = () => {
    changePassword({
      variables: {
        oldPassword: oldPassword.trim(),
        newPassword: password.trim(),
      },
    });

    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} color="warning" isLoading={loading}>
        Change Password
      </Button>

      <StandardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Change Password
          </h1>

          <Input
            className="max-w-xs"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibilityOld}
              >
                {isVisibleOld ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
            value={oldPassword}
            onValueChange={setOldPassword}
            label="Old Password"
            placeholder="Enter your current password"
            type={isVisibleOld ? "text" : "password"}
            variant="bordered"
          />

          <Divider />

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
            label="New Password"
            placeholder="Enter new password"
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
            onClick={handleChangePassword}
            color="primary"
            isDisabled={
              oldPassword.trim() === "" ||
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
