import { COLORS } from "@/public/styles/colors"
import { IconChevronLeft, IconHomes } from "./icons"
import styled from "styled-components"
import { useRouter } from "next/navigation";

interface BackProps {
  url?: string;
  color?: string;
}

const Back: React.FC<BackProps> = ({ url, color }) => {
  const router = useRouter();
  const targetColor = color || COLORS.secondaryColor;

  const handleClick = () => {
    if (url) {
      router.push(url);
    } else {
      router.back();
    }
  };

  return (
    <BackContainer onClick={handleClick}>
      <IconChevronLeft
        color={targetColor}
        width={undefined}
        height={16} />
    </BackContainer>
  )
}

const BackContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  z-index: 1;
`

export default Back