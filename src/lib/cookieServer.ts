// precisou instalar a biblioteca cookies-next

import { cookies } from "next/headers"; 

export async function getCookieServer(){

    const cookiesStore = await cookies()
    const token = cookiesStore.get("session")?.value; // "?" porque pode ser que ele nao exista 

    return token || null;
}