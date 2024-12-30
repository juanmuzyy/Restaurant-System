// == ARQUIVO PARA CRIAR ROTA PRIVADA ========

// Aqui esta sendo feito a config para somente conseguir acessar qualquer rota do sistema tendo o token,
//  sem o token, lava o usuario de volta para a pagina de login 



import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "./lib/cookieServer";
import { api } from "./services/api";

export async function middleware(req: NextRequest){

    const {pathname} = req.nextUrl

    if(pathname.startsWith('/_next') || pathname === '/'){

        return NextResponse.next()
    }
    const token = await getCookieServer(); // importando ele do lib 

    if(pathname.startsWith("/dashboard")){ // pathname.startwidth - qualquer URL que começa com o "/dashboard", se quiser acessar sem o token, vai travar 
        if(!token){
           return NextResponse.redirect(new URL('/', req.url ))  // aqui esta acontecendo que caso !token(nao tiver), vai ser redirect para pagina de login
        }

        const isValid = await validateToken(token)

        if(!isValid){
            return NextResponse.redirect(new URL('/', req.url ))  // aqui esta acontecendo que caso !token(nao tiver ou nao for valido ), vai ser redirect para pagina de login
        }

    }
    // Caso esteja tudo certo.... Pode deixar o usuario seguir 
    return NextResponse.next();
}

// verificando se o token é valido 
async function validateToken(token: string){
    if (!token) return false; // ja vou retorna como falso, nao esta validado 

    try{
        // ta acontecendo aqui é o seguinte, acessa a rota do "/me" la no banco de dados, consultando os detalhes do usuario 
        //com isso retornando o Authorization: Bearer ${token} do usuario para que seja validado  
        await api.get('/me',{
            headers:{
                Authorization: `Bearer ${token}` 
            }
        })
        return true;

    }catch(err){
      22
        return false;
    }
}