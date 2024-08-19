import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MyPagePopper } from "./popper";
import { MyPagePopple } from "./popple";
const MyPage: React.FC = () => {
  const router = useRouter();
  const hasAlerted = useRef<boolean>(false);

  const { isLogin, isPopper } = useSelector(
    (state: any) => state.poppingUser.user
  );

  const [isPopple, setIsPopple] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLogin && !hasAlerted.current) {
      alert("로그인 후 이용가능합니다.");
      hasAlerted.current = true; // alert 호출 후 true로 설정
      router.push("/member/signin");
    }
    if (isLogin) {
      setIsPopple(!isPopper);
    }
  }, [isLogin, router]);

  return (
    <>
      {isLogin && isPopple && <MyPagePopple />}
      {isLogin && !isPopple && <MyPagePopper />}
    </>
  );
};

export default MyPage;
