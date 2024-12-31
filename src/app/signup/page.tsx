"use client"

import Image from "next/image"
import Link from "next/link"
import styles from '../page.module.scss'
import { api } from '@/services/api'// importando meu backend para que seja enviado os dados
import { redirect } from "next/navigation" // para direcionar o usuario para outra tela
import { toast } from "sonner"; // importando a mensagem do sonner na qual eu configurei la no layout principal 


export default  function Signup(){

    async function handleRegister(formData: FormData){

        
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        if( name === '' || email === '' || password === ''){
            console.log("Prencha Corretamente todos os campos")
            return
        }
        try{ // no try os dados que eu preencher aqui, vao ser enviados para o banco de dados
            await api.post("/users",{
                name,
                email,
                password
            } )
        }catch(err){
          toast.warning("Falha ao realizar login ")
            console.log(err)
        }
       

        redirect("/") // depois que o usuario criar seu login, vou mandar ele para pagina de login 
        
    }
    
    return(
        <>
      <div className={styles.containerCenter}>
        <Image
          src="/logo.svg"  // Caminho relativo da pasta public
          alt="Logo da Pizzaria"
          width={200} // Adicione as dimensões apropriadas
          height={80} // Adicione as dimensões apropriadas
        />
        <section className={styles.login}>
            <h1>Criando sua Conta</h1>
          <form action={handleRegister}>
          <input
            type='text'
            required
            name='name'
            placeholder='Digite seu nome'
            className={styles.input}
            />
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
              Cadastrar
             </button>


          </form>
              <Link href='/' className={styles.text}>
                Já possui uma conta? Faça Login
              </Link>
            
        </section>
      </div>
        </>
    )
}