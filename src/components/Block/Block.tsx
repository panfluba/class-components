import styles from './block.module.scss';

type TBlockProps = {
  id: string;
  title: string;
  image: string;
  description: string;
};

const Block: React.FC<TBlockProps> = ({ id, title, image, description }) => {
  return (
    <div className={styles.root}>
      <div className={styles.block} key={id}>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Block;
