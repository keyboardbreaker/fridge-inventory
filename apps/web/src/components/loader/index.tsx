import style from './loader.module.css'

const Loader = () => {
	return (
		<div role="status" aria-label="Loading" className={style.loaderContainer}>
			<div className={style.loader}></div>
		</div>
	)
}

export default Loader;