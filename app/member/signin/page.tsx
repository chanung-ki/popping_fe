"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

type SignInInput = {
  email: string;
  password: string;
};

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInInput>();

  const onSubmit: SubmitHandler<SignInInput> = (data) => console.log(data);

  console.log(typeof watch("email"));

  return (
    <SigninPageContainer>
      <SignInFormContainer>
        <h1>POPPING</h1>
        <SignInForm onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="이메일"
            {...register("email")}
            required={true}
          />
          <input
            type="password"
            placeholder="비밀번호"
            {...register("password")}
            required={true}
          />

          <input
            type="submit"
            value="로그인"
            className={
              typeof watch("email") === "string" &&
              typeof watch("password") === "string" &&
              watch("email").length > 0 &&
              watch("password").length > 0
                ? "active-submit"
                : "submit"
            }
          />
        </SignInForm>
        <AccountSettingsContainer>
          <Link href="/member/signup">회원가입</Link>
          <p>|</p>
          <Link href="/member/find-email">이메일 찾기</Link>
          <p>|</p>
          <Link href="/member/find-password">비밀번호 찾기</Link>
        </AccountSettingsContainer>

        <SocialLoginContainer>
          {/*소셜 로그인 확정 후 해당 라이브러리로 작성 */}
          <div />
          <div />
          <div />
        </SocialLoginContainer>
      </SignInFormContainer>
    </SigninPageContainer>
  );
};

const SigninPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

const SignInFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1 {
    font-family: "GmarketSansTTFBold";
    color: ${COLORS.mainColor};
  }
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 36px;

  & > input {
    border-radius: 4px;
    border: 1px solid ${COLORS.greyColor};
    padding: 0px 13px;
    width: calc(350px - 26px);
    height: 32px;
  }

  & > input::placeholder {
    color: ${COLORS.greyColor};
  }

  .submit {
    width: 350px;
    margin-top: 23px;
    padding: 9px 0px;
    background-color: ${COLORS.greyColor};
    color: ${COLORS.primaryColor};
  }

  .active-submit {
    background-color: ${COLORS.mainColor};
    color: ${COLORS.primaryColor};
    border: none;
    margin-top: 23px;
    width: 350px;
    height: 32px;
    padding: 9px 0px;
  }
`;

const AccountSettingsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;

  color: ${COLORS.greyColor};
  font-size: 0.5em;

  & > a {
    text-decoration: none;
    color: ${COLORS.greyColor};
    cursor: pointer;
  }
`;

const SocialLoginContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 20px;

  & > div {
    background-color: ${COLORS.lightGreyColor};
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
`;

export default SignInPage;
