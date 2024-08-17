"use client";

import { DefaultLayout } from "@/app/components/layout";
import {
  MemberChevronLeft,
  MemberProgressBar,
} from "@/app/components/member/components";
import useFunnel from "next-use-funnel";
import { useState } from "react";
import StepEmail from "./01email";
import StepEmailPasscode from "./02emailpasscode";
import StepPassword from "./03password";
import StepName from "./04name";
import StepPhone from "./05phone";
import StepPhonePasscode from "./06phonepasscode";
import StepProfile from "./07profile";
import StepDone from "./08done";
import axiosInstance from "@/public/network/axios";
import { useRouter } from "next/navigation";

const SignUpUserPage: React.FC = () => {
  type bodyTypes = {
    email: string;
    password: string;
    name: string;
    nickname: string;
    isMale: boolean | null;
    phoneNumber: string;
    isPopper: boolean;
    authCode: string;
  };

  type profileTypes = {
    nickname: string;
    isMale: boolean | null;
  };

  const steps = [
    "Email",
    "Email Passcode",
    "Password",
    "Name",
    "Phone",
    "Phone Passcode",
    "Profile",
    "Done",
  ] as const;

  const router = useRouter();

  const [Funnel, state, setState] = useFunnel(steps, {
    initialStep: "Email",
    onStepChange: (step) => {
      setStepIndex(steps.indexOf(step));
    },
  }).withState<bodyTypes>({
    email: undefined,
    password: undefined,
    name: undefined,
    nickname: undefined,
    isMale: undefined,
    phoneNumber: undefined,
    isPopper: false,
    authCode: "",
  });

  const poppleSignupApi = async () => {
    try {
      const response = await axiosInstance.post(`/api/user/signup`, state);
      if (response.status === 201) {
        setState((prev) => ({
          ...prev,
          step: "Done",
        }));
      }
    } catch (error) {
      alert("회원가입 도중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const [stepIndex, setStepIndex] = useState<number>(0);

  return (
    <DefaultLayout top="16px" right="20px" bottom="32px" left="20px">
      <MemberProgressBar value={stepIndex * (100 / steps.length - 1)} />
      {state.step !== "Done" && (
        <div
          onClick={() => {
            if (stepIndex > 0) {
              setStepIndex((prev) => prev - 1);
              setState((prev) => ({
                ...prev,
                step: steps[stepIndex - 1],
              }));
            } else {
              router.push("/");
            }
          }}
        >
          <MemberChevronLeft />{" "}
        </div>
      )}
      <Funnel>
        <Funnel.Step name="Email">
          <StepEmail
            onNext={(email: string, authCode: string) => {
              setState((prev) => ({
                ...prev,
                email,
                authCode,
                step: "Email Passcode",
              }));
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="Email Passcode">
          <StepEmailPasscode
            authCode={state.authCode ? state.authCode : ""}
            email={state.email ? state.email : ""}
            onNext={() => {
              setState((prev) => ({ ...prev, step: "Password" }));
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="Password">
          <StepPassword
            onNext={(password: string) => {
              setState((prev) => ({ ...prev, password, step: "Name" }));
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="Name">
          <StepName
            onNext={(name: string) => {
              setState((prev) => ({ ...prev, name, step: "Phone" }));
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="Phone">
          <StepPhone
            onNext={(phoneNumber: string) => {
              setState((prev) => ({
                ...prev,
                phoneNumber,
                step: "Profile",
              }));
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="Phone Passcode">
          <StepPhonePasscode
            onNext={() => {
              setState((prev) => ({ ...prev, step: "Profile" }));
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="Profile">
          <StepProfile
            onNext={(result: profileTypes) => {
              setState((prev) => ({
                ...prev,
                nickname: result.nickname,
                isMale: result.isMale,
              }));
              if (state.phoneNumber !== undefined) {
                poppleSignupApi();
              }
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="Done">
          <StepDone
            onNext={() => {
              router.push("/member/signin");
            }}
          />
        </Funnel.Step>
      </Funnel>
    </DefaultLayout>
  );
};

export default SignUpUserPage;
