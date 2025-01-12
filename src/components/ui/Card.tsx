import styles from './Card.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Card(props: Props) {
  return (
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  );
}

export default Card;
