import React from 'react'
import styles from './Terms.module.css'

export default function Terms() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Termos de Serviço</h1>
            <div className={styles.content}>
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>1. Sobre a Aplicação</h2>
                    <p>
                        Esta aplicação foi desenvolvida para fins educacionais e permite que os usuários gerenciem informações de seus pets, 
                        como dados pessoais, histórico de vacinação, consultas e fotos.
                    </p>
                </section>
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>2. Uso do Firebase</h2>
                    <p>
                        Utilizamos o Firebase para autenticação, armazenamento de dados e hospedagem. Todos os dados inseridos pelos usuários 
                        são armazenados no Firebase e seguem os termos de uso e política de privacidade do serviço. É de responsabilidade do 
                        usuário garantir que os dados inseridos sejam verdadeiros e estejam em conformidade com as leis locais.
                    </p>
                </section>
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>3. Uso do ImgBB</h2>
                    <p>
                        As fotos dos pets são hospedadas utilizando o serviço ImgBB. Certifique-se de que as imagens enviadas respeitam direitos 
                        autorais e não contêm conteúdo inadequado. O ImgBB pode ter políticas adicionais que devem ser seguidas.
                    </p>
                </section>
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>4. Responsabilidade do Usuário</h2>
                    <p>
                        O usuário é responsável por manter a segurança de sua conta, não compartilhar sua senha e garantir que os dados inseridos 
                        na plataforma estejam corretos. A equipe de desenvolvimento não se responsabiliza por dados incorretos ou uso indevido 
                        da plataforma.
                    </p>
                </section>
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>5. Finalidade Educacional</h2>
                    <p>
                        Este site foi criado para estudo e aprendizado em desenvolvimento web. Embora tenha funcionalidades reais, ele não é 
                        uma plataforma comercial ou oficial. Qualquer uso da aplicação é feito sob responsabilidade do usuário.
                    </p>
                </section>
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>6. Atualizações e Modificações</h2>
                    <p>
                        Os termos de serviço podem ser atualizados a qualquer momento sem aviso prévio. É recomendável que os usuários revisem 
                        os termos periodicamente para se manterem informados sobre possíveis alterações.
                    </p>
                </section>
                
            </div>
        </div>
    );
}