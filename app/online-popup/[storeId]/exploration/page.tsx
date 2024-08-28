'use client'
import Back from "@/app/components/back";
import { DefaultLayout } from "@/app/components/layout";
import { COLORS } from "@/public/styles/colors";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

const StoreExploration: React.FC<{ params: { storeId: string } }> = ({ params }) => {
  const router = useRouter();
  const { storeId } = params;

  useEffect(() => {

  }, [router])

  return (
    <DefaultLayout top={0} left={0} right={0} bottom={0}>
      <Container>
        <div style={{ position: 'absolute', top: 16, left: 20, }}>
          <Back url={`/online-popup/${storeId}/store-op`} />
        </div>

      </Container>
    </DefaultLayout>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100dvh;

  background-color: ${COLORS.primaryColor};
`

export default StoreExploration;