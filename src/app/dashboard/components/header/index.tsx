"use client"
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import { LogInIcon } from 'lucide-react' // biblioteca de icons react
import { deleteCookie } from 'cookies-next' // serve para que quando eu fizer o logout, os cookies sejam excluidos, no caso os token 
import { useRouter } from 'next/navigation' // so pode ser usando em component que usamos o "use client" (linha 1)

export function Header(){

    const router = useRouter();
    
    async function handleLogout(){
        deleteCookie("session", {path: "/"}) // quero entao que ao fazer o logout, seja deletado o cookie com o nome sessio, no caso o que eu dei o nome 
       
        router.replace("/") // para substituit a rota que eu estiver, no caso agora vai para a rota de login 
    }
    
    return(
        <header className={styles.headerContainer}>

            <div className={styles.headerContent}>

                <Link href="/dashboard">
                <Image
                  src="/logo.svg"  // Caminho relativo da pasta public
                  alt="Logo da Pizzaria"
                  width={200} // Adicione as dimensões apropriadas
                  height={60} // Adicione as dimensões apropriadas
                  priority={true}
                  quality={100}
                />
                </Link>
                <nav>
                    <Link href="/dashboard/category">
                        Categoria
                    </Link>
                    <Link href="/dashboard/product">
                        Produto
                    </Link>

                    <form action={handleLogout}>
                        <button type='submit'>
                            <LogInIcon size={24} color="#FFF"/>
                        </button>
                    </form>
                </nav>

            </div>
        </header>
    )
}