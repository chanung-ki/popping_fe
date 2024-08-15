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
import StepBrand from "./04brand";
import StepPhone from "./06phone";
import StepPhonePasscode from "./07phonepasscode";
import StepBusinessInfo from "./05businessinfo";
import StepDone from "./08done";
import axiosInstance from "@/public/network/axios";
import { useRouter } from "next/navigation";

const SignUpUserPage: React.FC = () => {
  type bodyTypes = {
    email: string;
    password: string;
    nickname: string;
    businessInfo: BusinessInfo;
    phoneNumber: string;
    isPopper: boolean;
    authCode: string;
  };

  type BusinessInfo = {
    businessNumber: string;
    startDate: string;
    participantName: string;
  };

  const steps = [
    "Email",
    "Email Passcode",
    "Password",
    "Brand",
    "Business Info",
    "Phone",
    "Phone Passcode",
    "Done",
  ] as const;

  const [Funnel, state, setState] = useFunnel(steps, {
    initialStep: "Email",
    onStepChange: (step) => {
      setStepIndex(steps.indexOf(step));
    },
  }).withState<bodyTypes>({
    email: undefined,
    password: undefined,
    nickname: undefined,
    businessInfo: undefined,
    phoneNumber: undefined,
    isPopper: true,
    authCode: "",
  });

  const [stepIndex, setStepIndex] = useState<number>(0);

  const popperSignupApi = async () => {
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

  const router = useRouter();

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
          <MemberChevronLeft />
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
              setState((prev) => ({ ...prev, password, step: "Brand" }));
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="Brand">
          <StepBrand
            onNext={(nickname: string) => {
              setState((prev) => ({
                ...prev,
                nickname,
                step: "Business Info",
              }));
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="Business Info">
          <StepBusinessInfo
            onNext={(businessInfo: BusinessInfo) => {
              setState((prev) => ({
                ...prev,
                businessInfo: businessInfo,
                step: "Phone",
              }));
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="Phone">
          <StepPhone
            onNext={(phoneNumber: string) => {
              setState((prev) => ({
                ...prev,
                phoneNumber,
              }));
              if (state.phoneNumber !== undefined) {
                popperSignupApi();
              }
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="Phone Passcode">
          <StepPhonePasscode
            onNext={() => {
              setState((prev) => ({ ...prev, step: "Done" }));
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
