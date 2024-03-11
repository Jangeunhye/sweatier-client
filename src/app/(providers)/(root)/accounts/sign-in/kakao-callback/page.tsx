"use client"

import api from "@/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const KakaoCallbackPage = ({ searchParams }: { searchParams: { code: string } }) => {
    const router = useRouter();
    const code = searchParams.code;

    useEffect(() => {
        const signInAndRedirect = async () => {
            await api.auth.signInKaKao(code);
            router.push("/");
        };

        signInAndRedirect();
    }, [code, router]);

    return null;
};

export default KakaoCallbackPage;
