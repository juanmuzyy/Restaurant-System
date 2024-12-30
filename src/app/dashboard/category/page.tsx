import styles from './styles.module.scss'
import { Button } from '../components/button'
import { api } from '@/services/api' // importando nosso banco de dados para cadastar algo
import { getCookieServer } from '@/lib/cookieServer'
import { redirect } from 'next/navigation'


export default function Category(){

    async function handleRegisterCategory(formData: FormData){
            "use server"

            const name = formData.get("name")

            if(name === '') return;

            const data = {
                name: name,

            }
            const token =  await getCookieServer();

             await api.post("/category", data, { // dessa forma eu faço um post no meu banco de dados, na categoria CATEGORY
                    headers:{
                        Authorization: `Bearer ${token}` // preciso que seja passado o token dessa forma, para conseguir cadastar,pois so consegue cadastrar quem tiver o token,
                        // com isso eu faço igual a linha 4 e 22, para eu consultar o token
                    }

            }).catch((err) => {
                console.log(err)
                return;
            })
                redirect("/dashboard") // depois que tudo der certo de criar uma nova cateforia, direciona ele para pagina principal 
        }


    return(
       <main className={styles.container}>

        <h1>Nova Categoria</h1>

        <form action={handleRegisterCategory} className={styles.form}>

            <input type="text" name='name' placeholder='Nome da categoria, EX: Pizzas'
            required
            className={styles.input}

            />

            <Button name='Cadastar'/>

        </form>

       </main>
    )
}