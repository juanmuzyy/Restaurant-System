"use client";
import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import { UploadCloud } from "lucide-react"; // ícone de +
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient"; // importando token do lado co client 
import { toast } from "sonner"; // importando a mensagem do sonner na qual eu configurei la no layout principal
import { useRouter } from "next/navigation";

// interface para categorias
interface CategoryProps {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {
    const router = useRouter(); // direcionar o user para outra tela, chamando a função apenas

  // Estado para imagem
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");

  // Função de cadastro do produto

  // PEGAMOS AQUILO QUE A GENTE DIGITA NOS CAMPOS 
  async function handleRegisterProduct(formData: FormData) {
    const categoryIndex = formData.get("category");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");

    // VERIFICAMOS SE NAO ESTA ENVIANDO NAVA VAZIO 
    if (!name || !categoryIndex || !price || !description || !image) {
      console.log("Preencha todos os campos.");
      return;
    }

    // Converte o index da categoria para número
    const index = Number(categoryIndex);

    if (isNaN(index)) { //isNaN() é usada para verificar se um valor é  (não é um número).ela determina se o valor fornecido pode ser interpretado como um número ou não.
      toast.warning("Preencha todos os campos!")
      return;
    }

        //ENVIANDO OS DADODS PREENCHIDOS  PARA O BANCO DE DADOS 
    // COMO ESTAMOS ENVIADO UM FILE, PRECISA SER ENVIADO COM FORM DATA
        const data = new FormData()

        data.append("name", name)
        data.append("price", price)
        data.append("description", description)
        data.append("category_id", categories[Number(categoryIndex)].id)
        data.append("file", image)

        // COM ISSO FAZEMOS A REQUISÇÃO DA NOSSA ROTA, SOLICITANDO UM TOKEN 
        const token = getCookieClient()

        await api.post("/product", data, {
            headers:{
                Authorization: `Bearer ${token}` 
            }
        })
        .catch((err) =>{
            console.log(err)
            toast.warning("Falha ao cadastrar esse produto ")
        })

        toast.success("Produto registrado com sucesso!")
        router.push("/dashboard")
  }

  // Função para lidar com o arquivo selecionado
  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      if (selectedImage.type !== "image/jpeg" && selectedImage.type !== "image/png") {
        toast.warning("Formato de Imagem PROIBIDO!! Use jpeg ou png")
        return;
      }

      setImage(selectedImage);
      setPreviewImage(URL.createObjectURL(selectedImage));
    }
  }

  // Função de envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      console.log("Por favor, selecione uma imagem.");
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    handleRegisterProduct(formData);
  };

  return (
    <main className={styles.container}>
      <h1>Novo Produto</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={34} color="#fff" />
          </span>

          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
            name="fileInput"
          />

          {previewImage && (
            <Image
              alt="Imagem de preview"
              src={previewImage}
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>

        <select name="category">
          {categories.map((category, index) => (
            <option key={category.id} value={index}> {/* Alterado para o índice */}
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto"
          className={styles.input}
        />
        <input
          type="text"
          name="price"
          placeholder="Preço do produto"
          className={styles.input}
        />

        <textarea
          name="description"
          className={styles.input}
          required
          placeholder="Digite a descrição"
        ></textarea>

        <Button name="Cadastrar Produto" />
      </form>
    </main>
  );
}
