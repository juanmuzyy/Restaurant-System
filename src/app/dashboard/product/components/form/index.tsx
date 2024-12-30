"use client"
import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import { UploadCloud } from 'lucide-react' // icone de + 
import Image from 'next/image'

export function Form(){

    // -------- TODA FUNÇÃO PARA QUE SEJA ADCIONADO UMA IMG LA NO INPUT --------------
    const [image, setImage] = useState <File>()
    const [previewImage, setPreviewImage] = useState("") // para que posse ser vizualizado a img antes de enviar

    function handleFile(e: ChangeEvent<HTMLInputElement>){
            if(e.target.files && e.target.files[0]){
                const image = e.target.files[0]


                if(image.type !== "image/jpeg" && image.type !== "image.png" ){
                    console.log("Formato Proibido!!!")
                    return;
                }
                setImage(image);
                setPreviewImage(URL.createObjectURL(image)) // para que posse ser vizualizado a img antes de enviar 
                console.log(image)
            }
    }
    // ----------//---------------------
    
    return(
        <main className={styles.container}>
            <h1>Novo Produto</h1>

            <form className={styles.form} action="">

            <label  className={styles.labelImage} htmlFor="">
                <span>

                    <UploadCloud size={34} color='#fff'/>

                </span>

                <input
                 type="file"
                 accept='image/png, image/jpeg' 
                 required
                 onChange={handleFile}
                 />
                 {previewImage && (
                    <Image 
                    alt ="imagem de preview"
                    src={previewImage}
                    className={styles.preview}
                    fill={true}
                    quality={100}
                    priority={true} />

                 ) }
                 </label>
                 
            </form>
        </main>

    )
}