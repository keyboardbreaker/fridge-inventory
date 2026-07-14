import style from "./Container.module.css";

interface ContainerProps {
    children: React.ReactNode
}

const Container = ({
    children
}:ContainerProps) => {
    return (
        <section className={style.container}>
            {children}
        </section>
    )
}


export default Container;