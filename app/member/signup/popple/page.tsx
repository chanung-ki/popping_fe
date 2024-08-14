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

const SignUpUserPage: React.FC = () => {
  type bodyTypes = {
    email: string;
    password: string;
    name: string;
    nickname: string;
    isMale: boolean | null;
    phoneNumber: string;
    isPopper: boolean;
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

  const [Funnel, state, setState] = useFunnel(steps, {
    initialStep: "Email",
    onStepChange: (step) => {
      setStepIndex(steps.indexOf(step) + 1);
    },
  }).withState<bodyTypes>({
    email: undefined,
    password: undefined,
    name: undefined,
    nickname: undefined,
    isMale: undefined,
    phoneNumber: undefined,
    isPopper: false,
  });

  const [stepIndex, setStepIndex] = useState<number>(0);

  return (
    <DefaultLayout top="16px" right="20px" bottom="32px" left="20px">
      <MemberProgressBar value={stepIndex * (100 / steps.length)} />
      {state.step != "Done" && <MemberChevronLeft />}
      <Funnel>
        <Funnel.Step name="Email">
          <StepEmail
            onNext={(email: string) => {
              setState((prev) => ({ ...prev, email, step: "Email Passcode" }));
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="Email Passcode">
          <StepEmailPasscode
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
                step: "Phone Passcode",
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
                step: "Done",
              }));
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="Done">
          <StepDone
            onNext={() => {
              if (
                Object.values(state).filter((value) => value === undefined)
                  .length > 1
              ) {
                console.log(
                  `undefined 개수: ${
                    Object.values(state).filter((value) => value === undefined)
                      .length
                  }`
                );
                console.log("오류 발생");
              }
              console.log(state);
            }}
          />
        </Funnel.Step>
      </Funnel>
    </DefaultLayout>
  );
};

export default SignUpUserPage;
