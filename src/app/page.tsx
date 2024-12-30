import styles from './page.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/services/api'  // importando meu backend para que seja enviado os dados
import {redirect} from 'next/navigation'
import { cookies } from 'next/headers'
import { getMaxAge } from 'next/dist/server/image-optimizer'

export default function Page() {

  async function handleLogin(formData: FormData){
    "use server"

    const email = formData.get("email") 
    const password = formData.get("password")

    if (email === '' || password === ''){
      return;
    }
    try{// no try os dados que eu preencher aqui, vao ser enviados para o banco de dados
      const response = await api.post("/session",{
        email,
        password
      })
      if(!response.data.token){ // se eu nao tiver um token, eu nao direciono o user
        return
      }

      console.log(response.data)
    

      // caso esteja dando erro no "set" use dessa forma 
      const expressTime = 24 * 60 * 10 ; // equivale a 24 horas para expirar 
      const cookieSore = await cookies();
      cookieSore.set("session", response.data.token,{ // para salvar o cookies do token do usuario no banco 
        maxAge: expressTime, // para quantos dias quero que o token expira
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production" // variavel de ambiente, se a gente fizer o deploy desse projeto, essa variavel vai ser falso
      } )



    }catch(err){
      console.log(err)
      return;
    }
    redirect("/dashboard") // redirecionando usuario para outra tela após login
  }
  return (
    <>
      <div className={styles.containerCenter}>
        <Image
          src="/logo.svg"  // Caminho relativo da pasta public
          alt="Logo da Pizzaria"
          width={200} // Adicione as dimensões apropriadas
          height={80} // Adicione as dimensões apropriadas
        />
        <section className={styles.login}>
          <form action={handleLogin}>
            <input
            type='email'
            required
            name='email'
            placeholder='Digite seu email'
            className={styles.input}
            />
            <input
             type="password"
             required
             name='password'
             placeholder='************'
             className={styles.input} />

             <button type='submit'>
              Acessar
             </button>


          </form>
              <Link href='signup' className={styles.text}>
                Não possui uma conta? Cadastra-se
              </Link>
        </section>
      </div>
    </>
  )
}