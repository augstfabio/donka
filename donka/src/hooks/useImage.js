import { useLoading } from '../context/LoadingContext';

const useImage = () => {
    const { setIsLoading } = useLoading();

    const getImageUrl = async (file) => {
        if (!file) throw new Error("Nenhum arquivo selecionado.");

        const formData = new FormData();
        formData.append("image", file);

        setIsLoading(true);

        try {
            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            if (!response.ok) {
                throw new Error("Erro ao enviar a imagem.");
            }

            const data = await response.json();
            return data.data.url;
        } catch (err) {
            console.error("Erro ao carregar a imagem:", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { getImageUrl }; 
};

export default useImage;
